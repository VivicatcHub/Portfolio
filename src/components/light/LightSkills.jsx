import { useTranslation } from "react-i18next";
import useData from "./useData";
import RoomHeader from "./RoomHeader";
import { SkillIcon } from "../SkillReactIcons";
import { buildSkills } from "../buildSkills";
import useSkillLabels from "../skillI18n";
import { usageCounts } from "./museum";

const LightSkills = () => {
  const { t: translate } = useTranslation();
  const data = useData();
  const labels = useSkillLabels();
  const skills = data ? buildSkills(data) : {};
  const counts = data ? usageCounts(data.projects) : {};
  const total = Object.values(skills).reduce((n, list) => n + list.length, 0);

  return (
    <div className="room room--white room--page">
      <div className="room-inner">
        <RoomHeader
          title={translate("light.nav.skills")}
          meta={data && translate("light.techniques.count", { count: total })}
          intro={translate("light.techniques.intro")}
        >
          <p className="index-legend">
            <span className="key-mark" aria-hidden="true" />
            {translate("light.techniques.key")}
          </p>
        </RoomHeader>

        <div className="index">
          {Object.entries(skills).map(([category, items]) => (
            <section key={category} className="index-group">
              <h2 className="index-title">{labels.category(category)}</h2>
              <ul>
                {[...items]
                  .sort(
                    (a, b) =>
                      Number(b.important) - Number(a.important) ||
                      (counts[b.name] || 0) - (counts[a.name] || 0),
                  )
                  .map((skill) => (
                    <li
                      key={skill.name}
                      className={`index-row ${skill.important ? "is-key" : ""}`}
                    >
                      <SkillIcon name={skill.name} size={16} />
                      <span className="index-name">
                        {labels.name(skill.name)}
                        {skill.important && (
                          <span className="sr-only">
                            {" "}
                            ({translate("light.techniques.key")})
                          </span>
                        )}
                      </span>
                      <span className="index-leader" aria-hidden="true" />
                      <span
                        className="index-count"
                        title={translate("light.works.count", {
                          count: counts[skill.name] || 0,
                        })}
                      >
                        {counts[skill.name] || "—"}
                      </span>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LightSkills;
