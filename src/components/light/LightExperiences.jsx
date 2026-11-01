import { useTranslation } from "react-i18next";
import useData from "./useData";
import useSkillLabels from "../skillI18n";
import { parseDateParts, sortValue } from "../dateUtils";
import RoomHeader from "./RoomHeader";
import ChronologyAxis from "./ChronologyAxis";

const flattenSkills = (skills = {}) => [
  ...new Set(
    Object.values(skills).flatMap((group) => Object.values(group).flat()),
  ),
];

const yearOf = (str) => parseDateParts(str)?.y ?? null;

const LightExperiences = () => {
  const { t: translate } = useTranslation();
  const data = useData();
  const labels = useSkillLabels();
  const xps = data?.experiences || [];
  const thisYear = new Date().getFullYear();

  const starts = xps.map((xp) => yearOf(xp.startDate)).filter(Boolean);
  const ends = xps.map((xp) => yearOf(xp.endDate)).filter(Boolean);
  const from = starts.length ? Math.min(...starts) : thisYear;
  const to = Math.max(thisYear, ...ends);

  const years = Array.from({ length: to - from + 1 }, (_, i) => from + i)
    .map((year) => ({
      year,
      begun: xps
        .filter((xp) => yearOf(xp.startDate) === year)
        .sort((a, b) => sortValue(a.startDate) - sortValue(b.startDate)),
      ended: xps.filter((xp) => yearOf(xp.endDate) === year),
    }))
    .filter((row) => row.begun.length > 0 || row.ended.length > 0);

  return (
    <div className="room room--dark room--page">
      <div className="room-inner">
        <RoomHeader
          title={translate("light.nav.experiences")}
          meta={xps.length > 0 && `${from}–${to}`}
        />
        <ChronologyAxis experiences={xps} />

        <ol className="years">
          {years.map(({ year, begun, ended }) => (
            <li
              key={year}
              className={`year ${year > thisYear ? "is-future" : ""}`}
            >
              <p className="year-num">{year}</p>
              <div className="year-body">
                {begun.map((xp) => {
                  const skills = flattenSkills(xp.skills);
                  return (
                    <article key={xp.id || xp.company} className="xp">
                      <h2 className="xp-org">{xp.company}</h2>
                      {xp.roles?.length ? (
                        <ol className="xp-roles">
                          {xp.roles.map((role, i) => (
                            <li key={i}>
                              <span className="xp-role">{role.title}</span>
                              <span className="xp-role-dates">
                                {role.startDate} – {role.endDate}
                              </span>
                            </li>
                          ))}
                        </ol>
                      ) : (
                        <p className="xp-role">{xp.xp}</p>
                      )}
                      <p className="xp-period">
                        <span
                          className={`xp-type xp-type--${xp.type || "professional"}`}
                        >
                          {translate(
                            `experiences.categories.${xp.type || "professional"}`,
                          )}
                        </span>
                        {" · "}
                        {xp.startDate} – {xp.endDate}
                      </p>
                      {xp.description && (
                        <p className="xp-desc">{xp.description}</p>
                      )}
                      {skills.length > 0 && (
                        <div className="xp-skills">
                          <h3 className="xp-skills-title">
                            {translate("experiences.skillsLabel")}
                          </h3>
                          <ul>
                            {skills.map((name) => (
                              <li key={name}>{labels.name(name)}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </article>
                  );
                })}
                {ended.length > 0 && (
                  <ul className="year-ends">
                    {ended.map((xp) => (
                      <li key={xp.id || xp.company}>
                        {translate(
                          year > thisYear
                            ? "light.chronology.endsPlanned"
                            : "light.chronology.ends",
                          { name: xp.company, date: xp.endDate },
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default LightExperiences;
