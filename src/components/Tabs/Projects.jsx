import { useTranslation } from "react-i18next";
import { useMatch } from "react-router-dom";
import useData from "../useData";
import { findBundle, findProject } from "../projectLookup";
import ProjectsExplorer from "../projects/ProjectsExplorer";
import ProjectEditor from "../projects/ProjectEditor";

const Projects = () => {
  const { t: translate } = useTranslation();
  const data = useData();
  const projects = data?.projects || [];
  const projectRoute = useMatch("/project/:projectId");
  const bundleRoute = useMatch("/projects/:bundleId");

  if (!data) return <div className="h-full" />;

  if (projectRoute) {
    const found = findProject(projects, projectRoute.params.projectId);
    if (found) {
      const { project, bundle } = found;
      return (
        <ProjectEditor
          project={project}
          back={{
            to: bundle ? `/projects/${bundle.id}` : "/",
            label: bundle ? bundle.name : translate("fileFinder.tabs.project"),
          }}
        />
      );
    }
  }

  const bundleId = bundleRoute?.params.bundleId;
  const openBundle =
    bundleId && findBundle(projects, bundleId) ? bundleId : null;

  return (
    <ProjectsExplorer
      key={openBundle || "all"}
      groups={projects}
      openBundle={openBundle}
    />
  );
};

export default Projects;
