import { useEffect } from "react";
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CodeBracketIcon } from "@heroicons/react/24/outline";
import LightNav from "./LightNav";
import LightHome from "./LightHome";
import LightExperiences from "./LightExperiences";
import LightProjects from "./LightProjects";
import LightProjectBundle from "./LightProjectBundle";
import LightProjectDetail from "./LightProjectDetail";
import LightSkills from "./LightSkills";
import LightContact from "./LightContact";
import "@fontsource-variable/archivo/wdth";
import "./museum.css";

const LightPortfolio = () => {
  const { t: translate, i18n } = useTranslation();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="museum" lang={i18n.language}>
      <a href="#salle" className="skip-link">
        {translate("light.skip")}
      </a>
      <LightNav />
      <main id="salle" className="museum-main">
        <Routes>
          <Route index element={<LightHome />} />
          <Route path="experiences" element={<LightExperiences />} />
          <Route path="projects" element={<LightProjects />} />
          <Route path="projects/:bundleId" element={<LightProjectBundle />} />
          <Route path="project/:projectId" element={<LightProjectDetail />} />
          <Route path="skills" element={<LightSkills />} />
          <Route path="contact" element={<LightContact />} />
          <Route path="*" element={<Navigate to="" replace />} />
        </Routes>
      </main>
      <footer className="colophon">
        <div className="colophon-inner">
          <p>
            © {new Date().getFullYear()} {translate("home.name")} ·{" "}
            {translate("light.footer.made")}
          </p>
          <Link to="/" className="colophon-link">
            <CodeBracketIcon className="btn-icon" aria-hidden="true" />
            {translate("light.nav.devMode")}
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default LightPortfolio;
