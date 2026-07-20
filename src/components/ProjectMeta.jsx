import { useTranslation } from "react-i18next";
import { durationInfo, formatDateRange } from "./dateUtils";

const STATUS_STYLES = {
  dark: {
    done: "bg-green-500/15 text-green-300 border-green-500/30",
    in_progress: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  },
  light: {
    done: "bg-green-50 text-green-700 border-green-200",
    in_progress: "bg-amber-50 text-amber-700 border-amber-200",
  },
};

const BADGE = {
  dark: "bg-gray-800/70 text-gray-200 border-gray-600",
  light: "bg-gray-50 text-gray-600 border-gray-200",
};

const DURATION_BADGE = {
  dark: "bg-ayu-blue/15 text-ayu-blue border-ayu-blue/30",
  light: "bg-teal-50 text-teal-700 border-teal-200",
};

const durationLabelKey = ({ value, unit }) => {
  if (unit === "week") return value > 1 ? "durationWeeks" : "durationWeek";
  return value > 1 ? "durationDays" : "durationDay";
};

const ProjectMeta = ({ project, variant = "dark" }) => {
  const { t: translate } = useTranslation();
  const { dateBegin, dateEnd, status, personCount, collaborators } = project;
  const statusStyles = STATUS_STYLES[variant] || STATUS_STYLES.dark;
  const badge = BADGE[variant] || BADGE.dark;
  const durationBadge = DURATION_BADGE[variant] || DURATION_BADGE.dark;

  const dateRange = formatDateRange(dateBegin, dateEnd);
  const duration = durationInfo(dateBegin, dateEnd);
  const durationLabel = duration
    ? translate(`projectCard.${durationLabelKey(duration)}`, {
        count: duration.value,
      })
    : null;

  const teamLabel =
    personCount > 1
      ? translate("projectCard.people", { count: personCount })
      : personCount === 1
        ? translate("projectCard.solo")
        : null;

  return (
    <div className="mt-1">
      <div className="flex flex-wrap items-center gap-2">
        {dateRange && (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[11px] font-medium ${badge}`}
          >
            {dateRange}
          </span>
        )}
        {durationLabel && (
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[11px] font-medium ${durationBadge}`}
          >
            <span aria-hidden="true">⏱</span>
            {durationLabel}
          </span>
        )}
        {status && translate(`projectCard.status.${status}`) && (
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[11px] font-medium ${
              statusStyles[status] || badge
            }`}
          >
            <span aria-hidden="true">●</span>
            {translate(`projectCard.status.${status}`)}
          </span>
        )}
        {teamLabel && (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[11px] font-medium ${badge}`}
          >
            {teamLabel}
          </span>
        )}
      </div>
      {collaborators?.length > 0 && (
        <p
          className={`mt-1.5 text-[11px] ${
            variant === "light" ? "text-gray-400" : "text-gray-400"
          }`}
        >
          {translate("projectCard.with")} {collaborators.join(", ")}
        </p>
      )}
    </div>
  );
};

export default ProjectMeta;
