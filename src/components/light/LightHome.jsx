import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Announcement from "../Announcement";

const LightHome = () => {
  const { t: translate } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-32">
      <Announcement variant="light" className="mb-8" />
      <p className="text-ayu-purple font-semibold mb-4">
        {translate("light.home.hello")}
      </p>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
        {translate("home.name")}
      </h1>
      <h2 className="mt-3 text-xl sm:text-2xl md:text-3xl font-light text-gray-500">
        {translate("home.xp")}
      </h2>
      <p className="mt-6 max-w-xl text-gray-600 leading-relaxed">
        {translate("light.home.intro")}
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <button
          onClick={() => navigate("projects")}
          className="px-6 py-3 rounded-lg bg-ayu-purple text-white font-semibold hover:bg-ayu-purple/90 transition-colors"
        >
          {translate("home.projects")}
        </button>
        <button
          onClick={() => navigate("contact")}
          className="px-6 py-3 rounded-lg border border-gray-300 text-gray-800 font-semibold hover:border-gray-400 hover:bg-gray-50 transition-colors"
        >
          {translate("home.contact")}
        </button>
      </div>
    </section>
  );
};

export default LightHome;
