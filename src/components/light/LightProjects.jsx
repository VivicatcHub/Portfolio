import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import useData from "./useData";
import useSkillLabels from "../skillI18n";
import RoomHeader from "./RoomHeader";
import HungWork from "./HungWork";
import { AiStamp } from "./Cartel";
import {
  aiTagOf,
  byBeginDesc,
  catalogue,
  countWorks,
  mediumOf,
  workPath,
  yearLabel,
  yearSpan,
} from "./museum";

const HANG = ["l", "s", "s", "l", "t", "t", "t"];

export const Checklist = ({ works, numbers }) => {
  const { t: translate } = useTranslation();
  const labels = useSkillLabels();

  return (
    <ol className="checklist">
      <li className="checklist-head" aria-hidden="true">
        <span>{translate("light.checklist.no")}</span>
        <span>{translate("light.checklist.title")}</span>
        <span>{translate("light.checklist.year")}</span>
        <span>{translate("light.checklist.medium")}</span>
        <span />
      </li>
      {works.map((work) => {
        const medium = mediumOf(work, 3);
        return (
          <li key={work.id}>
            <Link to={workPath(work)} className="checklist-row">
              <span className="checklist-num">{numbers[work.id]}</span>
              <span className="checklist-title">
                {work.name}
                {work.company && (
                  <span className="checklist-company">{work.company}</span>
                )}
              </span>
              <span className="checklist-year">
                {yearLabel(work, translate("light.cartel.inProgress"))}
              </span>
              <span className="checklist-medium">
                {work.subProjects
                  ? translate("light.cartel.series", {
                      count: work.subProjects.length,
                    })
                  : medium.names.map((name) => labels.name(name)).join(", ")}
              </span>
              <span className="checklist-end">
                <AiStamp tag={aiTagOf(work)} />
                <ArrowRightIcon className="btn-icon" aria-hidden="true" />
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
};

export const WorksRoom = ({ items, numbers }) => {
  const sorted = byBeginDesc(items);
  const hung = sorted.filter((work) => work.cover);
  const listed = sorted.filter((work) => !work.cover);

  return (
    <>
      {hung.length > 0 && (
        <div className="hang">
          {hung.map((work, i) => (
            <HungWork
              key={work.id}
              work={work}
              number={numbers[work.id]}
              size={HANG[i % HANG.length]}
            />
          ))}
        </div>
      )}
      {listed.length > 0 && <Checklist works={listed} numbers={numbers} />}
    </>
  );
};

const LightProjects = () => {
  const { t: translate } = useTranslation();
  const data = useData();
  const groups = data?.projects || [];
  const numbers = catalogue(groups);
  const span = yearSpan(groups);

  return (
    <div className="room room--white room--page">
      <div className="room-inner">
        <RoomHeader
          title={translate("light.nav.projects")}
          meta={
            data &&
            [
              translate("light.works.count", { count: countWorks(groups) }),
              span && `${span.from}–${span.to}`,
            ]
              .filter(Boolean)
              .join(" · ")
          }
          intro={translate("light.works.intro")}
        />
        <nav className="room-index" aria-label={translate("light.works.rooms")}>
          {groups.map((group, gi) => (
            <a key={gi} href={`#salle-${gi}`} className="room-index-link">
              {group.category}
              <span className="room-index-count">{group.items.length}</span>
            </a>
          ))}
        </nav>
        {groups.map((group, gi) => (
          <section key={gi} id={`salle-${gi}`} className="works-room">
            <h2 className="works-room-title">
              {group.category}
              <span className="works-room-count">{group.items.length}</span>
            </h2>
            <WorksRoom items={group.items || []} numbers={numbers} />
          </section>
        ))}
      </div>
    </div>
  );
};

export default LightProjects;
