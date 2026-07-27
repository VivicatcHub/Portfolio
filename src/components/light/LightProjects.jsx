import { useState } from "react";
import { useTranslation } from "react-i18next";
import useData from "./useData";
import LightSection from "./LightSection";
import ProjectTile from "../ProjectTile";
import { byDateEndDesc } from "../dateUtils";

export const projectPath = (project) =>
  project.subProjects
    ? `/pro/projects/${project.id}`
    : `/pro/project/${project.id}`;

export const ProjectGrid = ({ items }) => (
  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
    {items.map((project, pi) => (
      <ProjectTile
        key={project.id || pi}
        project={project}
        to={projectPath(project)}
        variant="light"
      />
    ))}
  </div>
);

const CategorySection = ({ group }) => {
  const [open, setOpen] = useState(true);
  const items = byDateEndDesc(group.items);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="group flex w-full items-center gap-2 mb-5 text-left"
      >
        <span
          aria-hidden="true"
          className={`text-gray-400 group-hover:text-ayu-purple transition-transform duration-200 ${open ? "rotate-90" : ""}`}
        >
          ▶
        </span>
        <h2 className="text-lg font-semibold text-gray-500 group-hover:text-ayu-purple transition-colors">
          {group.category}
        </h2>
        <span className="inline-flex items-center justify-center min-w-[1.5rem] px-1.5 rounded-full bg-gray-100 text-gray-500 text-xs font-medium">
          {items.length}
        </span>
      </button>
      {open && (
        <div className="animate-fade-in">
          <ProjectGrid items={items} />
        </div>
      )}
    </div>
  );
};

const LightProjects = () => {
  const { t: translate } = useTranslation();
  const data = useData();
  const groups = data?.projects || [];

  return (
    <LightSection title={translate("home.projects")}>
      <div className="space-y-8">
        {groups.map((group, gi) => (
          <CategorySection key={gi} group={group} />
        ))}
      </div>
    </LightSection>
  );
};

export default LightProjects;
