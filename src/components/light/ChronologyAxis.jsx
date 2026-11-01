import { useTranslation } from "react-i18next";
import { parseDateParts } from "../dateUtils";

const toYear = (str, edge) => {
  const p = parseDateParts(str);
  if (!p) return null;
  if (p.precision === "year") return p.y + (edge === "end" ? 0.5 : 0);
  return p.y + (p.m - (edge === "end" ? 0 : 1)) / 12;
};

const now = () => {
  const d = new Date();
  return d.getFullYear() + d.getMonth() / 12 + d.getDate() / 365;
};

const ChronologyAxis = ({ experiences = [], compact = false }) => {
  const { t: translate } = useTranslation();

  const rows = experiences
    .map((xp) => ({
      xp,
      start: toYear(xp.startDate, "start"),
      end: toYear(xp.endDate, "end"),
      segments: (xp.roles?.length ? xp.roles : [xp])
        .map((role) => ({
          title: role.title ?? xp.xp,
          startDate: role.startDate,
          endDate: role.endDate,
          start: toYear(role.startDate, "start"),
          end: toYear(role.endDate, "end"),
        }))
        .filter((seg) => seg.start && seg.end),
    }))
    .filter((row) => row.start && row.end)
    .sort((a, b) => a.start - b.start);

  if (rows.length === 0) return null;

  const today = now();
  const from = Math.floor(Math.min(...rows.map((r) => r.start)));
  const to = Math.ceil(Math.max(today, ...rows.map((r) => r.end)));
  const span = to - from;
  const pct = (value) => `${((value - from) / span) * 100}%`;
  const years = Array.from({ length: span }, (_, i) => from + i);

  return (
    <figure
      className={`axis ${compact ? "axis--compact" : ""}`}
      style={{ "--span": span }}
    >
      <div className="axis-years" aria-hidden="true">
        {years.map((year) => (
          <span
            key={year}
            className={`axis-year ${year + 1 > today && year > today ? "is-future" : ""}`}
            style={{ left: pct(year), width: pct(from + 1) }}
          >
            {year}
          </span>
        ))}
      </div>
      <ol className="axis-rows">
        {rows.map(({ xp, start, segments }) => (
          <li key={xp.id || xp.company} className="axis-row">
            <span className="axis-track" aria-hidden="true">
              {segments.map((seg, i) => {
                const pastEnd = Math.min(seg.end, today);
                const futureStart = Math.max(seg.start, today);
                return (
                  <span
                    key={i}
                    className="axis-segment"
                    title={`${seg.title} · ${seg.startDate} – ${seg.endDate}`}
                    style={{
                      left: pct(seg.start),
                      width: `calc(${pct(seg.end)} - ${pct(seg.start)})`,
                    }}
                  >
                    {pastEnd > seg.start && (
                      <span
                        className={`axis-bar axis-bar--${xp.type || "professional"}`}
                        style={{
                          left: 0,
                          width: `${((pastEnd - seg.start) / (seg.end - seg.start)) * 100}%`,
                        }}
                      />
                    )}
                    {seg.end > today && (
                      <span
                        className="axis-bar axis-bar--future"
                        style={{
                          left: `${((futureStart - seg.start) / (seg.end - seg.start)) * 100}%`,
                          right: 0,
                        }}
                      />
                    )}
                  </span>
                );
              })}
            </span>
            <span className="axis-label" style={{ "--start": pct(start) }}>
              <strong>{xp.company}</strong>
              {xp.roles?.length ? (
                <span className="axis-meta axis-roles">
                  {segments.map((seg, i) => (
                    <span key={i} className="axis-role">
                      {seg.title} · {seg.startDate} – {seg.endDate}
                    </span>
                  ))}
                </span>
              ) : (
                <span className="axis-meta">
                  {xp.xp} · {xp.startDate} – {xp.endDate}
                </span>
              )}
            </span>
          </li>
        ))}
      </ol>
      <span className="axis-today" style={{ left: pct(today) }}>
        <span className="axis-today-label">
          {translate("light.chronology.today")}
        </span>
      </span>
      <figcaption className="axis-legend">
        {["academic", "professional", "associative"]
          .filter((type) =>
            rows.some((r) => (r.xp.type || "professional") === type),
          )
          .map((type) => (
            <span key={type} className="axis-key">
              <span
                className={`axis-swatch axis-bar--${type}`}
                aria-hidden="true"
              />
              {translate(`experiences.categories.${type}`)}
            </span>
          ))}
        <span className="axis-key">
          <span className="axis-swatch axis-bar--future" aria-hidden="true" />
          {translate("light.chronology.future")}
        </span>
      </figcaption>
    </figure>
  );
};

export default ChronologyAxis;
