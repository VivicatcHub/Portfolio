import { useTranslation } from "react-i18next";
import useSkillLabels from "../skillI18n";
import { formatDateRange } from "../dateUtils";
import {
  AI_TAGS,
  aiTagOf,
  durationKey,
  durationOf,
  stackOf,
} from "../projectData";

const ident = (text) =>
  String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const Str = ({ children }) => <span className="tk-str">"{children}"</span>;
const Num = ({ children }) => <span className="tk-num">{children}</span>;
const Kw = ({ children }) => <span className="tk-kw">{children}</span>;
const Val = ({ children }) => <span className="tk-val">{children}</span>;
const Comment = ({ children }) => (
  <span className="tk-comment">
    {`/* `}
    {children}
    {` */`}
  </span>
);

const Decl = ({ prop, children, comment }) => (
  <li className="css-line css-decl">
    <span className="tk-prop">{prop}</span>
    <span className="tk-punct">: </span>
    {children}
    <span className="tk-punct">;</span>
    {comment && <> {comment}</>}
  </li>
);

const CssRule = ({ project, full = false, excerpt }) => {
  const { t: translate } = useTranslation();
  const labels = useSkillLabels();

  const duration = durationOf(project);
  const dates = formatDateRange(project.dateBegin, project.dateEnd);
  const ongoing = !project.dateEnd && project.status === "in_progress";
  const ai = aiTagOf(project);
  const skills = stackOf(project).filter((s) => !AI_TAGS.includes(s.name));

  const byCategory = {};
  skills.forEach((skill) => {
    (byCategory[skill.category] = byCategory[skill.category] || []).push(skill);
  });
  const compact = [
    ...skills.filter((s) => s.important),
    ...skills.filter((s) => !s.important),
  ]
    .map((s) => s.name)
    .filter((name, i, all) => all.indexOf(name) === i);

  const skillList = (list) =>
    list.map((skill, i) => (
      <span key={skill.name}>
        {i > 0 && <span className="tk-punct">, </span>}
        <span className={skill.important ? "tk-key" : "tk-val"}>
          {labels.name(skill.name)}
        </span>
      </span>
    ));

  return (
    <ol
      className="css-rule"
      aria-label={`${project.name}, ${translate("devProjects.meta")}`}
    >
      {excerpt && (
        <li className="css-line">
          <Comment>{excerpt}</Comment>
        </li>
      )}
      <li className="css-line">
        <span className="tk-sel">.{ident(project.id || project.name)}</span>
        <span className="tk-punct"> {"{"}</span>
      </li>
      <Decl prop="name">
        <Str>{project.name}</Str>
      </Decl>
      {project.company && (
        <Decl prop="context">
          <Str>{project.company}</Str>
        </Decl>
      )}
      {(dates || ongoing) && (
        <Decl prop="date">
          <Num>{dates}</Num>
          {ongoing && (
            <>
              <span className="tk-punct"> → </span>
              <Kw>{translate("devProjects.ongoing")}</Kw>
            </>
          )}
        </Decl>
      )}
      {duration && (
        <Decl prop="duration">
          <Num>
            {translate(`projectCard.${durationKey(duration)}`, {
              count: duration.value,
            })}
          </Num>
        </Decl>
      )}
      {project.personCount > 0 && (
        <Decl
          prop="team"
          comment={
            project.collaborators?.length > 0 ? (
              <Comment>
                {translate("projectCard.with")}{" "}
                {project.collaborators.join(", ")}
              </Comment>
            ) : (
              project.personCount === 1 && (
                <Comment>{translate("projectCard.solo")}</Comment>
              )
            )
          }
        >
          <Num>{project.personCount}</Num>
        </Decl>
      )}
      {project.subProjects && (
        <Decl prop="contains">
          <Num>
            {translate("projectCard.bundleCount", {
              count: project.subProjects.length,
            })}
          </Num>
        </Decl>
      )}
      {project.status && (
        <Decl prop="status">
          <Kw>{translate(`projectCard.status.${project.status}`)}</Kw>
        </Decl>
      )}
      {full
        ? Object.entries(byCategory).map(([category, list]) => (
            <Decl
              key={category}
              prop={ident(labels.category(category)) || ident(category)}
            >
              {skillList(list)}
            </Decl>
          ))
        : compact.length > 0 && (
            <Decl prop="stack">
              <Val>
                {compact
                  .slice(0, 5)
                  .map((name) => labels.name(name))
                  .join(", ")}
              </Val>
              {compact.length > 5 && (
                <span className="tk-comment">{` /* +${compact.length - 5} */`}</span>
              )}
            </Decl>
          )}
      {!project.subProjects && (
        <Decl prop="ai">
          {ai ? (
            <span className={ai === "Without AI" ? "tk-ai" : "tk-str"}>
              "{labels.name(ai)}"
            </span>
          ) : (
            <Comment>{translate("devProjects.aiUnknown")}</Comment>
          )}
        </Decl>
      )}
      <li className="css-line">
        <span className="tk-punct">{"}"}</span>
      </li>
    </ol>
  );
};

export default CssRule;
