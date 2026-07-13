import { useTranslation } from "react-i18next";

const Home = ({ navigate }) => {
  const { t: translate } = useTranslation();

  return (
    <div className="h-full bg-hero bg-cover flex flex-col justify-center md:items-start text-white relative">
      <div className="absolute h-full w-full bg-black opacity-60"></div>
      <div className="z-10 p-8">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold ">
          {translate("home.name")}
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-thin tracking-tighter">
          {translate("home.xp")}
        </h2>
        <div className="mt-4 gap-4 flex flex-wrap">
          <button
            onClick={() => navigate("projects")}
            className="hover:scale-105 text-lg transition duration-200 px-2 py-1 md:px-4 md:py-2 rounded-md bg-ayu-purple text-black font-extrabold"
          >
            {translate("home.projects")}
          </button>
          <button
            onClick={() => navigate("contact")}
            className="hover:scale-105 text-lg transition duration-200 px-2 py-1 md:px-4 md:py-2 rounded-md border-2 border-ayu-purple md:ml-4"
          >
            {translate("home.contact")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
