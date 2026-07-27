import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useData from "./useData";
import LightSection from "./LightSection";
import ProjectDetailContent from "../ProjectDetailContent";
import { findProject } from "../projectLookup";

const BackLink = ({ to, label }) => (
  <Link
    to={to}
    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:border-ayu-purple/40 hover:text-ayu-purple transition-colors"
  >
    <span aria-hidden="true">←</span>
    {label}
  </Link>
);

const LightProjectDetail = () => {
  const { projectId } = useParams();
  const { t: translate } = useTranslation();
  const data = useData();

  if (!data) return <LightSection title="" />;

  const found = findProject(data.projects || [], projectId);

  if (!found) {
    return (
      <LightSection title={translate("projectCard.notFound")}>
        <BackLink
          to="/pro/projects"
          label={translate("projectCard.backToProjects")}
        />
      </LightSection>
    );
  }

  const { project, bundle } = found;

  return (
    <LightSection>
      <div className="mb-8">
        <BackLink
          to={bundle ? `/pro/projects/${bundle.id}` : "/pro/projects"}
          label={
            bundle
              ? translate("projectCard.backTo", { name: bundle.name })
              : translate("projectCard.backToProjects")
          }
        />
      </div>
      <ProjectDetailContent project={project} variant="light" />
    </LightSection>
  );
};

export default LightProjectDetail;
