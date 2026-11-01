import { useTranslation } from "react-i18next";
import useSkillLabels from "../skillI18n";
import {
  aiTagOf,
  durationKey,
  durationOf,
  mediumOf,
  yearLabel,
} from "./museum";

export const AiStamp = ({ tag }) => {
  const labels = useSkillLabels();
  if (!tag) return null;
  return (
    <span className={`ai-stamp ${tag === "With AI" ? "is-with" : ""}`}>
      {labels.name(tag)}
    </span>
  );
};

const Cartel = ({ work, number, as: Title = "h3", className = "" }) => {
  const { t: translate } = useTranslation();
  const labels = useSkillLabels();

  const year = yearLabel(work, translate("light.cartel.inProgress"));
  const medium = mediumOf(work);
  const duration = durationOf(work);
  const series = work.subProjects?.length;

  const dimensions = [
    duration &&
      translate(`projectCard.${durationKey(duration)}`, {
        count: duration.value,
      }),
    work.personCount > 1 &&
      translate("projectCard.people", { count: work.personCount }),
    work.personCount === 1 && translate("projectCard.solo"),
  ].filter(Boolean);

  const credit = [
    work.company,
    work.collaborators?.length > 0 &&
      `${translate("projectCard.with")} ${work.collaborators.join(", ")}`,
  ].filter(Boolean);

  return (
    <div className={`cartel ${className}`}>
      <div className="cartel-head">
        <Title className="cartel-title">{work.name}</Title>
        {number && (
          <span className="cartel-num">
            {translate("light.cartel.cat", { n: number })}
          </span>
        )}
      </div>
      <p className="cartel-year">
        {year}
        {work.status === "in_progress" && work.dateEnd && (
          <> · {translate("light.cartel.inProgress")}</>
        )}
      </p>
      {series ? (
        <p className="cartel-medium">
          {translate("light.cartel.series", { count: series })}
        </p>
      ) : (
        medium.names.length > 0 && (
          <p className="cartel-medium">
            {medium.names.map((name) => labels.name(name)).join(", ")}
            {medium.rest > 0 && (
              <span className="cartel-more">
                {" "}
                {translate("light.cartel.more", { count: medium.rest })}
              </span>
            )}
          </p>
        )
      )}
      {dimensions.length > 0 && (
        <p className="cartel-dim">{dimensions.join(" · ")}</p>
      )}
      {credit.length > 0 && (
        <p className="cartel-credit">{credit.join(" · ")}</p>
      )}
      <AiStamp tag={aiTagOf(work)} />
    </div>
  );
};

export default Cartel;
