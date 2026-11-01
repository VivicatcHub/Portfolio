import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import useData from "./useData";
import HungWork, { Frame } from "./HungWork";
import Cartel from "./Cartel";
import WelcomePanel from "./WelcomePanel";
import ChronologyAxis from "./ChronologyAxis";
import { buildSkills } from "../buildSkills";
import useSkillLabels from "../skillI18n";
import {
  allWorks,
  byBeginDesc,
  catalogue,
  countWorks,
  usageCounts,
  featuredWork,
  workPath,
  yearSpan,
} from "./museum";

const HANG = ["l", "s", "s", "l", "t", "t", "t"];

const useFirstVisit = () =>
  useState(() => {
    try {
      if (sessionStorage.getItem("museum-entered")) return false;
      sessionStorage.setItem("museum-entered", "1");
      return true;
    } catch {
      return false;
    }
  })[0];

const LightHome = () => {
  const { t: translate } = useTranslation();
  const data = useData();
  const entering = useFirstVisit();
  const labels = useSkillLabels();

  const groups = data?.projects || [];
  const numbers = catalogue(groups);
  const span = yearSpan(groups);
  const featured = featuredWork(groups);
  const email = (data?.socials || []).find((s) =>
    s.link?.startsWith("mailto:"),
  );
  const hang = byBeginDesc(
    allWorks(groups).filter(
      (work) => work.cover && !work.subProjects && work.id !== featured?.id,
    ),
  ).slice(0, HANG.length);

  const counts = data ? usageCounts(data.projects) : {};
  const keys = data
    ? Object.values(buildSkills(data))
        .flat()
        .filter((skill) => skill.important)
        .sort((a, b) => (counts[b.name] || 0) - (counts[a.name] || 0))
    : [];

  const [first, ...rest] = translate("home.name").split(" ");

  return (
    <>
      <section
        className={`room room--violet entrance ${entering ? "is-entering" : ""}`}
      >
        <div className="entrance-grid">
          <div className="entrance-title">
            <h1 className="show-title">
              <span className="show-line">{first}</span>
              <span className="show-line">{rest.join(" ")}</span>
            </h1>
            <p className="show-sub">
              {translate("home.xp")}
              {span && (
                <>
                  <span className="show-sep" aria-hidden="true" />
                  {translate("light.home.works", span)}
                </>
              )}
            </p>
            <p className="show-statement">
              {translate("light.home.statement")}
            </p>
          </div>

          {featured && (
            <Link to={workPath(featured)} className="entrance-work hung">
              <span className="hung-light" aria-hidden="true" />
              <Frame src={featured.cover} eager />
              <Cartel work={featured} number={numbers[featured.id]} as="h2" />
            </Link>
          )}

          <WelcomePanel email={email} className="entrance-welcome" />
        </div>
      </section>

      {hang.length > 0 && (
        <section className="room room--white">
          <div className="room-inner">
            <header className="room-head room-head--split">
              <h2 className="room-title">{translate("light.home.selected")}</h2>
              <Link to="projects" className="text-link">
                {translate("light.home.allWorks", {
                  count: countWorks(groups),
                })}
                <ArrowRightIcon className="btn-icon" aria-hidden="true" />
              </Link>
            </header>
            <div className="hang">
              {hang.map((work, i) => (
                <HungWork
                  key={work.id}
                  work={work}
                  number={numbers[work.id]}
                  size={HANG[i]}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {data?.experiences?.length > 0 && (
        <section className="room room--dark">
          <div className="room-inner">
            <header className="room-head room-head--split">
              <h2 className="room-title">
                {translate("light.chronology.title")}
              </h2>
              <Link to="experiences" className="text-link">
                {translate("light.home.fullChronology")}
                <ArrowRightIcon className="btn-icon" aria-hidden="true" />
              </Link>
            </header>
            <ChronologyAxis experiences={data.experiences} compact />
          </div>
        </section>
      )}

      {keys.length > 0 && (
        <section className="room room--white">
          <div className="room-inner">
            <header className="room-head room-head--split">
              <h2 className="room-title">
                {translate("light.home.keyTechniques")}
              </h2>
              <Link to="skills" className="text-link">
                {translate("light.home.allTechniques")}
                <ArrowRightIcon className="btn-icon" aria-hidden="true" />
              </Link>
            </header>
            <ul className="keys">
              {keys.map((skill) => (
                <li key={skill.name} className="keys-item">
                  {labels.name(skill.name)}
                  {counts[skill.name] > 0 && (
                    <span className="keys-count">{counts[skill.name]}</span>
                  )}
                </li>
              ))}
            </ul>
            <p className="keys-note">{translate("light.home.keysNote")}</p>
          </div>
        </section>
      )}

      <section className="room room--violet desk-close">
        <div className="room-inner">
          <h2 className="desk-title">{translate("light.desk.title")}</h2>
          {email && (
            <a href={email.link} className="desk-mail">
              {email.value}
            </a>
          )}
          <Link to="contact" className="btn btn--ink">
            {translate("light.desk.all")}
            <ArrowRightIcon className="btn-icon" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default LightHome;
