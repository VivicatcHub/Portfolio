import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useData from "./useData";
import LightSection from "./LightSection";
import { byDateEndDesc } from "../dateUtils";
import { findBundle } from "../projectLookup";
import { ProjectGrid } from "./LightProjects";

const LightProjectBundle = () => {
  const { bundleId } = useParams();
  const { t: translate } = useTranslation();
  const data = useData();

  if (!data) return <LightSection title="" />;

  const found = findBundle(data.projects || [], bundleId);

  if (!found) {
    return (
      <LightSection title={translate("projectCard.notFound")}>
        <Link
          to="/pro/projects"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:border-ayu-purple/40 hover:text-ayu-purple transition-colors"
        >
          <span aria-hidden="true">←</span>
          {translate("projectCard.backToProjects")}
        </Link>
      </LightSection>
    );
  }

  const { bundle } = found;

  return (
    <LightSection title={bundle.name}>
      <Link
        to="/pro/projects"
        className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:border-ayu-purple/40 hover:text-ayu-purple transition-colors"
      >
        <span aria-hidden="true">←</span>
        {translate("projectCard.backToProjects")}
      </Link>
      <ProjectGrid items={byDateEndDesc(bundle.subProjects || [])} />
    </LightSection>
  );
};

export default LightProjectBundle;
