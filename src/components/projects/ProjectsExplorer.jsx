import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ChevronRightIcon,
  MagnifyingGlassIcon,
  MinusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import useSkillLabels from "../skillI18n";
import { SkillIcon, hasSkillIcon } from "../SkillReactIcons";
import { byBeginDesc, keySkillOf, stackOf, yearLabel } from "../projectData";
import ProjectPreview from "./ProjectPreview";
import "./devProjects.css";

export const projectRoute = (project) =>
  project.subProjects ? `/projects/${project.id}` : `/project/${project.id}`;

const fold = (text) =>
  String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

const useWide = () => {
  const query = "(min-width: 1024px)";
  const [wide, setWide] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setWide(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);
  return wide;
};

const FileIcon = ({ project }) => {
  const skill = keySkillOf(project, hasSkillIcon);
  if (skill) return <SkillIcon name={skill} size={15} />;
  if (project.icon)
    return <img src={project.icon} alt="" className="dp-row-img" />;
  return <span className="dp-row-blank" />;
};

const ProjectsExplorer = ({ groups = [], openBundle }) => {
  const { t: translate } = useTranslation();
  const labels = useSkillLabels();
  const wide = useWide();
  const treeRef = useRef(null);
  const hoverTimer = useRef(null);

  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState({});
  const [expandedBundles, setExpandedBundles] = useState(() =>
    openBundle ? { [openBundle]: true } : {},
  );
  const [activeId, setActiveId] = useState(() => {
    if (!openBundle) return null;
    for (const group of groups)
      for (const item of group.items || [])
        if (item.id === openBundle)
          return byBeginDesc(item.subProjects || [])[0]?.id || null;
    return null;
  });
  const [peekId, setPeekId] = useState(null);

  const q = fold(query.trim());
  const matches = (project) =>
    !q ||
    [
      project.name,
      project.company,
      ...stackOf(project).flatMap((s) => [s.name, labels.name(s.name)]),
    ].some((text) => fold(text).includes(q));

  const tree = useMemo(
    () =>
      groups
        .map((group, gi) => {
          const items = byBeginDesc(group.items || [])
            .map((item) => {
              if (!item.subProjects) return matches(item) ? item : null;
              const subs = byBeginDesc(item.subProjects).filter(matches);
              return subs.length || matches(item)
                ? {
                    ...item,
                    visibleSubs: subs.length
                      ? subs
                      : byBeginDesc(item.subProjects),
                  }
                : null;
            })
            .filter(Boolean);
          return { key: `g${gi}`, category: group.category, items };
        })
        .filter((group) => group.items.length > 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [groups, q, labels],
  );

  const all = useMemo(
    () =>
      tree.flatMap((g) =>
        g.items.flatMap((i) => [i, ...(i.visibleSubs || [])]),
      ),
    [tree],
  );
  const total = useMemo(
    () =>
      tree.reduce(
        (n, g) =>
          n +
          g.items.reduce(
            (m, i) => m + (i.visibleSubs ? i.visibleSubs.length : 1),
            0,
          ),
        0,
      ),
    [tree],
  );

  const firstFeatured =
    all.find((p) => p.important && !p.subProjects && (p.cover || p.images)) ||
    all.find((p) => !p.subProjects);
  const active = all.find((p) => p.id === activeId) || firstFeatured;

  const isOpen = (key) => (q ? true : !collapsed[key]);
  const bundleOpen = (id) => (q ? true : Boolean(expandedBundles[id]));

  const preview = (id, immediate = false) => {
    clearTimeout(hoverTimer.current);
    if (immediate) setActiveId(id);
    else hoverTimer.current = setTimeout(() => setActiveId(id), 140);
  };
  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  const rows = () => [
    ...(treeRef.current?.querySelectorAll("[data-row]") || []),
  ];

  const onKeyDown = (event) => {
    const list = rows();
    const index = list.indexOf(document.activeElement);
    if (index < 0) return;
    const row = list[index];
    const move = (to) => {
      event.preventDefault();
      list[Math.max(0, Math.min(list.length - 1, to))]?.focus();
    };
    if (event.key === "ArrowDown") move(index + 1);
    else if (event.key === "ArrowUp") move(index - 1);
    else if (event.key === "Home") move(0);
    else if (event.key === "End") move(list.length - 1);
    else if (event.key === "ArrowRight" && row.dataset.toggle === "closed") {
      event.preventDefault();
      row.click();
    } else if (event.key === "ArrowLeft") {
      if (row.dataset.toggle === "open") {
        event.preventDefault();
        row.click();
      } else if (row.dataset.parent) {
        event.preventDefault();
        treeRef.current
          .querySelector(`[data-key="${row.dataset.parent}"]`)
          ?.focus();
      }
    }
  };

  const projectRow = ({ project, depth, parent }) => {
    const isActive = wide && active?.id === project.id;
    const isPeek = !wide && peekId === project.id;
    const content = (
      <>
        <span className="dp-chevron-slot" />
        <FileIcon project={project} />
        <span className="dp-row-name">{project.name}</span>
        {project.important && (
          <StarIcon
            className="dp-row-star"
            aria-label={translate("projectCard.featured")}
          />
        )}
        {project.status === "in_progress" && (
          <span
            className="dp-row-dot"
            title={translate("projectCard.status.in_progress")}
          >
            <span className="sr-only">
              {translate("projectCard.status.in_progress")}
            </span>
          </span>
        )}
        <span className="dp-row-meta">
          {yearLabel(project, translate("devProjects.ongoing"))}
        </span>
      </>
    );
    const common = {
      "data-row": true,
      "data-key": project.id,
      "data-parent": parent,
      style: { "--depth": depth },
      className: `dp-row ${isActive ? "is-active" : ""} ${isPeek ? "is-peek" : ""}`,
      tabIndex: active?.id === project.id ? 0 : -1,
      onFocus: () => preview(project.id, true),
    };
    return (
      <li role="none" key={project.id}>
        {wide ? (
          <Link
            to={projectRoute(project)}
            role="treeitem"
            aria-selected={isActive}
            onMouseEnter={() => preview(project.id)}
            {...common}
          >
            {content}
          </Link>
        ) : (
          <button
            type="button"
            role="treeitem"
            aria-selected={isPeek}
            aria-expanded={isPeek}
            onClick={() => setPeekId(isPeek ? null : project.id)}
            {...common}
          >
            {content}
          </button>
        )}
        {isPeek && (
          <div className="dp-peek">
            <ProjectPreview
              project={project}
              detailTo={projectRoute(project)}
              inline
            />
          </div>
        )}
      </li>
    );
  };

  const bundleRow = ({ bundle, depth, parent }) => {
    const open = bundleOpen(bundle.id);
    return (
      <li role="none" key={bundle.id}>
        <button
          type="button"
          role="treeitem"
          aria-selected={false}
          aria-expanded={open}
          tabIndex={-1}
          data-row
          data-key={bundle.id}
          data-parent={parent}
          data-toggle={open ? "open" : "closed"}
          style={{ "--depth": depth }}
          className="dp-row dp-row--folder"
          onClick={() =>
            setExpandedBundles((s) => ({ ...s, [bundle.id]: !open }))
          }
        >
          <ChevronRightIcon
            className={`dp-chevron ${open ? "is-open" : ""}`}
            aria-hidden="true"
          />
          <FileIcon project={bundle.visibleSubs?.[0] || bundle} />
          <span className="dp-row-name">{bundle.name}</span>
          {bundle.important && (
            <StarIcon
              className="dp-row-star"
              aria-label={translate("projectCard.featured")}
            />
          )}
          <span className="dp-badge">{bundle.visibleSubs?.length}</span>
        </button>
        {open && (
          <ul role="group" className="dp-group">
            {bundle.visibleSubs.map((sub) =>
              projectRow({ project: sub, depth: depth + 1, parent: bundle.id }),
            )}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className="dp">
      <section className="dp-side" aria-label={translate("devProjects.title")}>
        <header className="dp-side-head">
          <h1 className="dp-side-title">
            {translate("devProjects.title")}
            <span className="dp-badge">{total}</span>
          </h1>
          <button
            type="button"
            className="dp-tool"
            title={translate("devProjects.collapseAll")}
            aria-label={translate("devProjects.collapseAll")}
            onClick={() => {
              setCollapsed(Object.fromEntries(tree.map((g) => [g.key, true])));
              setExpandedBundles({});
            }}
          >
            <MinusIcon className="dp-icon" aria-hidden="true" />
          </button>
        </header>
        <label className="dp-filter">
          <MagnifyingGlassIcon className="dp-icon" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={translate("devProjects.filter")}
            aria-label={translate("devProjects.filter")}
          />
          {query && (
            <button
              type="button"
              className="dp-tool"
              onClick={() => setQuery("")}
              aria-label={translate("devProjects.clear")}
            >
              <XMarkIcon className="dp-icon" aria-hidden="true" />
            </button>
          )}
        </label>

        <div className="dp-tree-scroll">
          {tree.length === 0 ? (
            <p className="dp-empty">
              {translate("devProjects.noResults", { query })}
            </p>
          ) : (
            <ul
              ref={treeRef}
              role="tree"
              aria-label={translate("devProjects.title")}
              className="dp-tree"
              onKeyDown={onKeyDown}
            >
              {tree.map((group) => {
                const open = isOpen(group.key);
                return (
                  <li role="none" key={group.key}>
                    <button
                      type="button"
                      role="treeitem"
                      aria-selected={false}
                      aria-expanded={open}
                      tabIndex={group === tree[0] ? 0 : -1}
                      data-row
                      data-key={group.key}
                      data-toggle={open ? "open" : "closed"}
                      style={{ "--depth": 0 }}
                      className="dp-row dp-row--category"
                      onClick={() =>
                        setCollapsed((s) => ({ ...s, [group.key]: open }))
                      }
                    >
                      <ChevronRightIcon
                        className={`dp-chevron ${open ? "is-open" : ""}`}
                        aria-hidden="true"
                      />
                      <span className="dp-row-name">{group.category}</span>
                      <span className="dp-badge">{group.items.length}</span>
                    </button>
                    {open && (
                      <ul role="group" className="dp-group">
                        {group.items.map((item) =>
                          item.subProjects
                            ? bundleRow({
                                bundle: item,
                                depth: 1,
                                parent: group.key,
                              })
                            : projectRow({
                                project: item,
                                depth: 1,
                                parent: group.key,
                              }),
                        )}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        {wide && <p className="dp-hint">{translate("devProjects.hint")}</p>}
      </section>

      {wide && (
        <section className="dp-editor">
          {active ? (
            <ProjectPreview project={active} detailTo={projectRoute(active)} />
          ) : (
            <p className="dp-empty">
              {translate("devProjects.noResults", { query })}
            </p>
          )}
        </section>
      )}
    </div>
  );
};

export default ProjectsExplorer;
