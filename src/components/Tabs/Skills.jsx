import { useTranslation } from "react-i18next";
import Title from "../Title";
import { useEffect, useState } from "react";
import { SkillIcon } from "../SkillReactIcons";
import { buildSkills } from "../buildSkills";

const Skills = () => {
  const { t: translate, i18n } = useTranslation();
  const [SKILLS, setSKILLS] = useState({});

  useEffect(() => {
    const lang = (i18n?.language || "en").split("-")[0];
    fetch(`/locales/${lang}/data.json`)
      .then((res) => res.json())
      .then((json) => setSKILLS(buildSkills(json.data)))
      .catch(() => setSKILLS({}));
  }, [i18n?.language]);

  return (
    <section className="text-white max-h-full overflow-y-auto lg:mr-4 lg:pt-4 ">
      <div className="max-w-6xl px-4 py-12 mx-auto">
        <div className="flex flex-col lg:flex-row sm:mx-4">
          <Title text={translate("skills.title")} />
          <div className="space-y-6 lg:mx-6">
            {Object.keys(SKILLS).map((category, idx) => (
              <div key={idx} className="md:ml-8">
                <div className="text-center lg:text-left mb-3">
                  <h2 className="text-3xl font-semibold">{category}</h2>
                </div>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 lg:w-[90%]">
                  {SKILLS[category].map((skill) => (
                    <div
                      key={skill.name}
                      className="flex flex-col h-28 aspect-square justify-center items-center rounded-md shadow-md hover:scale-110 transition duration-200 bg-gray-700"
                    >
                      <SkillIcon name={skill.name} size={44} />
                      <h3 className="text-center mt-2 italic text-sm">
                        {skill.name}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
