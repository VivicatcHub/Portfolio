import { useEffect, useState } from "react";
import { SkillIcon, hasSkillIcon } from "./SkillReactIcons";
import useSkillLabels from "./skillI18n";

const MODES = ["both", "text", "icon"];
const MODE_LABELS = {
  both: "Text + Icon",
  text: "Text",
  icon: "Icon",
};
const MODE_ICONS = {
  both: "🖼️🔤",
  text: "🔤",
  icon: "🖼️",
};

const STORAGE_KEY = "skillDisplayMode";

const SYNC_EVENT = "skill-display-mode-change";

const readMode = () => {
  const stored =
    typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY);
  return MODES.includes(stored) ? stored : "both";
};

const useDisplayMode = () => {
  const [mode, setMode] = useState(readMode);

  useEffect(() => {
    const sync = () => setMode(readMode());
    window.addEventListener(SYNC_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(SYNC_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const cycle = () => {
    const next = MODES[(MODES.indexOf(readMode()) + 1) % MODES.length];
    window.localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new Event(SYNC_EVENT));
  };

  return [mode, cycle];
};

const SIZES = {
  lg: {
    chipText: "text-[11px]",
    chipPad: "px-2.5 py-1",
    iconSize: 15,
    iconOnlySize: 26,
    cardMinW: "min-w-[10rem]",
    cardPad: "p-3",
    cardGap: "gap-4",
    innerGap: "gap-2",
    catText: "text-sm",
    toggleText: "text-xs",
    togglePad: "px-3 py-1",
  },
  sm: {
    chipText: "text-[10px]",
    chipPad: "px-2 py-0.5",
    iconSize: 12,
    iconOnlySize: 20,
    cardMinW: "min-w-[7rem]",
    cardPad: "p-2",
    cardGap: "gap-2",
    innerGap: "gap-1.5",
    catText: "text-xs",
    toggleText: "text-[10px]",
    togglePad: "px-2 py-0.5",
  },
};

const VARIANTS = {
  dark: {
    card: "bg-gray-800/60 border-gray-700",
    cat: "text-ayu-purple",
    chip: "bg-gray-600/80 text-white border-gray-500/40 hover:bg-gray-500",
  },
  light: {
    card: "bg-gray-50 border-gray-200",
    cat: "text-ayu-purple",
    chip: "bg-white text-gray-700 border-gray-200 hover:bg-gray-100",
  },
};

const SkillChip = ({ name, label, mode, size, variant }) => {
  const hasIcon = hasSkillIcon(name);
  const showIcon = hasIcon && (mode === "icon" || mode === "both");

  const showText = mode === "text" || mode === "both" || !hasIcon;

  const iconOnly = showIcon && !showText;

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full ${size.chipText} transition-colors duration-150 max-w-[10rem] ${
        iconOnly ? "p-0.5" : `${size.chipPad} shadow-sm border ${variant.chip}`
      }`}
      title={label}
    >
      {showIcon && (
        <SkillIcon
          name={name}
          size={iconOnly ? size.iconOnlySize : size.iconSize}
        />
      )}
      {showText && <span className="truncate">{label}</span>}
    </div>
  );
};

const SkillGrid = ({
  skills = {},
  category,
  size = "lg",
  variant = "dark",
}) => {
  const sz = SIZES[size] || SIZES.lg;
  const vr = VARIANTS[variant] || VARIANTS.dark;
  const labels = useSkillLabels();
  const [mode, cycleMode] = useDisplayMode();
  const [open, setOpen] = useState(false);
  const categories = Object.keys(skills);

  if (categories.length === 0) return null;

  const total = categories.reduce((n, c) => n + (skills[c]?.length || 0), 0);

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between gap-2 mb-3">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className={`inline-flex items-center gap-2 ${sz.togglePad} rounded-full bg-ayu-purple/80 hover:bg-ayu-purple text-white ${sz.toggleText} font-medium shadow-sm transition-colors duration-150`}
          title={open ? "Collapse" : "Expand"}
          aria-expanded={open}
        >
          <span
            aria-hidden="true"
            className={`transition-transform duration-200 ${open ? "rotate-90" : ""}`}
          >
            ▶
          </span>
          <span>{category}</span>
          <span className="inline-flex items-center justify-center min-w-[1.25rem] px-1 rounded-full bg-white/25 text-[0.9em] leading-tight">
            {total}
          </span>
        </button>
        {open && (
          <div className="flex justify-end align-end">
            <button
              type="button"
              onClick={cycleMode}
              className={`inline-flex items-center gap-2 ${sz.togglePad} rounded-full bg-ayu-purple/80 hover:bg-ayu-purple text-white ${sz.toggleText} font-medium shadow-sm transition-colors duration-150`}
              title="Change how skills are displayed"
            >
              <span aria-hidden="true">{MODE_ICONS[mode]}</span>
              <span>{MODE_LABELS[mode]}</span>
            </button>
          </div>
        )}
      </div>

      {open && (
        <div className={`flex flex-wrap ${sz.cardGap} animate-fade-in`}>
          {categories.map((cat) => (
            <div
              key={cat}
              className={`flex flex-col gap-2 ${sz.cardPad} rounded-xl border shadow-md ${vr.card} ${sz.cardMinW}`}
            >
              <span
                className={`${sz.catText} font-semibold ${vr.cat} tracking-wide`}
              >
                {labels.category(cat)}
              </span>
              <div className={`flex flex-wrap ${sz.innerGap}`}>
                {skills[cat].map((name) => (
                  <SkillChip
                    key={name}
                    name={name}
                    label={labels.name(name)}
                    mode={mode}
                    size={sz}
                    variant={vr}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillGrid;
