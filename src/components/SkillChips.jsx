import { SkillIcon, hasSkillIcon } from "./SkillReactIcons";
import useSkillLabels from "./skillI18n";
import { parseSkill } from "./skillMarkup";

const VARIANTS = {
  dark: {
    title: "text-gray-400",
    category: "text-ayu-purple",
    chip: "bg-gray-800/60 border-gray-700 text-gray-100",
  },
  light: {
    title: "text-gray-500",
    category: "text-ayu-purple",
    chip: "bg-gray-50 border-gray-200 text-gray-700",
  },
};

const IMPORTANT_CHIP =
  "bg-gradient-to-r from-ayu-purple to-fuchsia-500 text-white border-transparent shadow-[0_0_10px_-1px_rgba(198,80,230,0.7)]";

const Chip = ({ raw, labels, style }) => {
  const { name, important } = parseSkill(raw);
  const label = labels.name(name);

  return (
    <span
      title={important ? `★ ${label}` : label}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm shadow-sm ${
        important ? IMPORTANT_CHIP : style.chip
      }`}
    >
      {hasSkillIcon(name) && <SkillIcon name={name} size={18} />}
      {important && (
        <span aria-hidden="true" className="text-ayu-yellow leading-none">
          ★
        </span>
      )}
      {label}
    </span>
  );
};

const SkillChips = ({ skills = {}, title, variant = "dark" }) => {
  const labels = useSkillLabels();
  const style = VARIANTS[variant] || VARIANTS.dark;
  const categories = Object.keys(skills).filter(
    (category) => (skills[category] || []).length > 0,
  );

  if (categories.length === 0) return null;

  return (
    <div>
      {title && (
        <h2
          className={`mb-4 text-xs font-semibold uppercase tracking-wider ${style.title}`}
        >
          {title}
        </h2>
      )}
      <div className="flex flex-col gap-4">
        {categories.map((category) => (
          <div key={category}>
            <span
              className={`block mb-2 text-sm font-semibold ${style.category}`}
            >
              {labels.category(category)}
            </span>
            <div className="flex flex-wrap gap-2.5">
              {skills[category].map((raw, index) => (
                <Chip
                  key={`${parseSkill(raw).name}-${index}`}
                  raw={raw}
                  labels={labels}
                  style={style}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillChips;
