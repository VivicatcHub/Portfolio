import { useTranslation } from "react-i18next";
import { Link, useMatch } from "react-router-dom";
import Title from "../Title";
import ProjectTile from "../ProjectTile";
import ProjectDetailContent from "../ProjectDetailContent";
import useData from "../useData";
import { byDateEndDesc } from "../dateUtils";
import { findBundle, findProject } from "../projectLookup";

const Page = ({ children }) => (
  <div className="text-white flex flex-col h-full overflow-y-auto pt-8 md:pt-12 pb-12 px-4 md:px-8 lg:px-12">
    {children}
  </div>
);

const BackLink = ({ to, label }) => (
  <Link
    to={to}
    className="inline-flex w-fit items-center gap-2 px-3 py-1.5 rounded-full bg-gray-700 hover:bg-gray-600 text-sm font-medium transition-colors"
  >
    <span aria-hidden="true">←</span>
    {label}
  </Link>
);

const Projects = () => {
  const { t: translate } = useTranslation();
  const data = useData();
  const projects = data?.projects || [];
  const projectRoute = useMatch("/project/:projectId");
  const bundleRoute = useMatch("/projects/:bundleId");

  if (projectRoute || bundleRoute) {
    if (!data) return <Page />;

    if (projectRoute) {
      const found = findProject(projects, projectRoute.params.projectId);
      if (!found) {
        return (
          <Page>
            <BackLink to="/" label={translate("projectCard.backToProjects")} />
            <p className="mt-8 text-gray-300">
              {translate("projectCard.notFound")}
            </p>
          </Page>
        );
      }
      const { project, bundle } = found;
      return (
        <Page>
          <BackLink
            to={bundle ? `/projects/${bundle.id}` : "/"}
            label={
              bundle
                ? translate("projectCard.backTo", { name: bundle.name })
                : translate("projectCard.backToProjects")
            }
          />
          <div className="mt-8">
            <ProjectDetailContent project={project} variant="dark" />
          </div>
        </Page>
      );
    }

    const found = findBundle(projects, bundleRoute.params.bundleId);
    if (!found) {
      return (
        <Page>
          <BackLink to="/" label={translate("projectCard.backToProjects")} />
          <p className="mt-8 text-gray-300">
            {translate("projectCard.notFound")}
          </p>
        </Page>
      );
    }
    const { bundle } = found;
    return (
      <Page>
        <BackLink to="/" label={translate("projectCard.backToProjects")} />
        <div className="mt-8">
          <Title text={bundle.name} />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {byDateEndDesc(bundle.subProjects || []).map((project, idx) => (
            <ProjectTile
              key={project.id || idx}
              project={project}
              to={`/project/${project.id}`}
              variant="dark"
            />
          ))}
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <Title text={translate("home.projects")} />
      <div className="flex flex-col gap-10">
        {projects.map((group, groupIdx) => (
          <section key={groupIdx}>
            <h2 className="text-xl md:text-2xl font-semibold mb-4 flex items-center gap-2">
              {group.category}
              <span className="inline-flex items-center justify-center min-w-[1.5rem] px-1.5 rounded-full bg-gray-700 text-gray-300 text-xs font-medium">
                {(group.items || []).length}
              </span>
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {byDateEndDesc(group.items).map((project, idx) => (
                <ProjectTile
                  key={project.id || idx}
                  project={project}
                  to={
                    project.subProjects
                      ? `/projects/${project.id}`
                      : `/project/${project.id}`
                  }
                  variant="dark"
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </Page>
  );
};

export default Projects;
