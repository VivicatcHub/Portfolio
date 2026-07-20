import { Routes, Route, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LightNav from "./LightNav";
import LightHome from "./LightHome";
import LightExperiences from "./LightExperiences";
import LightProjects from "./LightProjects";
import LightProjectBundle from "./LightProjectBundle";
import LightSkills from "./LightSkills";
import LightContact from "./LightContact";

const LightPortfolio = () => {
  const { t: translate } = useTranslation();

  return (
    <div className="relative isolate min-h-screen flex flex-col bg-white text-gray-900">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 animate-purple-pulse"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(198,80,230,0.28), rgba(198,80,230,0.10) 40%, transparent 70%)",
        }}
      />
      <LightNav />
      <main className="flex-grow">
        <Routes>
          <Route index element={<LightHome />} />
          <Route path="experiences" element={<LightExperiences />} />
          <Route path="projects" element={<LightProjects />} />
          <Route path="projects/:bundleId" element={<LightProjectBundle />} />
          <Route path="skills" element={<LightSkills />} />
          <Route path="contact" element={<LightContact />} />
          <Route path="*" element={<Navigate to="" replace />} />
        </Routes>
      </main>
      <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} {translate("home.name")}
      </footer>
    </div>
  );
};

export default LightPortfolio;
