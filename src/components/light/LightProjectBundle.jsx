import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useData from "./useData";
import LightSection from "./LightSection";
import useSkillLabels from "../skillI18n";
import { byDateEndDesc } from "../dateUtils";
import { ProjectCard } from "./LightProjects";

const findBundle = (groups, id) => {
  for (const group of groups) {
    for (const item of group.items || []) {
      if (item.id === id && item.subProjects) return item;
    }
  }
  return null;
};

const LightProjectBundle = () => {
  const { bundleId } = useParams();
  const navigate = useNavigate();
  const { t: translate } = useTranslation();
  const data = useData();
  const labels = useSkillLabels();

  if (!data) return <LightSection title="" />;

  const bundle = findBundle(data.projects || [], bundleId);
  if (!bundle) return <Navigate to="/pro/projects" replace />;

  const subs = byDateEndDesc(bundle.subProjects || []);

  return (
    <LightSection title={bundle.name}>
      <button
        type="button"
        onClick={() => navigate("/pro/projects")}
        className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:border-ayu-purple/40 hover:text-ayu-purple transition-colors"
      >
        <span aria-hidden="true">←</span>
        {translate("projectCard.backToProjects")}
      </button>
      <div className="grid gap-6 md:grid-cols-2">
        {subs.map((project, pi) => (
          <ProjectCard
            key={project.id || pi}
            project={project}
            labels={labels}
            translate={translate}
          />
        ))}
      </div>
    </LightSection>
  );
};

export default LightProjectBundle;
