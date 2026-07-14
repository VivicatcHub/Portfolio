import { useTranslation } from "react-i18next";
import Title from "../Title";
import { SkillIcon } from "../SkillReactIcons";
import { buildSkills } from "../buildSkills";
import useData from "../useData";
import useSkillLabels from "../skillI18n";

const Skills = () => {
  const { t: translate } = useTranslation();
  const data = useData();
  const labels = useSkillLabels();
  const SKILLS = data ? buildSkills(data) : {};

  return (
    <section className="text-white max-h-full overflow-y-auto lg:mr-4 lg:pt-4 ">
      <div className="max-w-6xl px-4 py-12 mx-auto">
        <div className="flex flex-col lg:flex-row sm:mx-4">
          <Title text={translate("skills.title")} />
          <div className="space-y-6 lg:mx-6">
            {Object.keys(SKILLS).map((category, idx) => (
              <div key={idx} className="md:ml-8">
                <div className="text-center lg:text-left mb-3">
                  <h2 className="text-3xl font-semibold">
                    {labels.category(category)}
                  </h2>
                </div>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 lg:w-[90%]">
                  {SKILLS[category].map((skill) => (
                    <div
                      key={skill.name}
                      className="flex flex-col h-28 aspect-square justify-center items-center rounded-md shadow-md hover:scale-110 transition duration-200 bg-gray-700"
                    >
                      <SkillIcon name={skill.name} size={44} />
                      <h3 className="text-center mt-2 italic text-sm">
                        {labels.name(skill.name)}
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
