import { NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import {
  Bars2Icon,
  CodeBracketIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { setAppLanguage, SUPPORTED_LANGUAGES } from "../../i18n";

const shortName = (name) => {
  const [first, ...rest] = name.split(" ");
  return rest.length ? `${first[0]}. ${rest.join(" ")}` : name;
};

const LANGUAGE_LABELS = { fr: "FR", en: "EN", ja: "日本" };

const LanguageSwitch = () => {
  const { t: translate, i18n } = useTranslation();
  const current = (i18n.language || "en").split("-")[0];

  return (
    <div
      className="lang"
      role="group"
      aria-label={translate("light.nav.language")}
    >
      {["fr", "en", "ja"]
        .filter((lng) => SUPPORTED_LANGUAGES.includes(lng))
        .map((lng) => (
          <button
            key={lng}
            type="button"
            lang={lng}
            aria-pressed={current === lng}
            onClick={() => setAppLanguage(lng)}
            className="lang-btn"
          >
            {LANGUAGE_LABELS[lng]}
          </button>
        ))}
    </div>
  );
};

const LightNav = () => {
  const { t: translate } = useTranslation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    { to: "", label: translate("light.nav.home"), end: true },
    { to: "projects", label: translate("light.nav.projects") },
    { to: "experiences", label: translate("light.nav.experiences") },
    { to: "skills", label: translate("light.nav.skills") },
    { to: "contact", label: translate("light.nav.contact") },
  ];

  const linkClass = ({ isActive }) =>
    "wayfind-link" + (isActive ? " is-active" : "");

  return (
    <header className="wayfind">
      <nav className="wayfind-inner" aria-label={translate("light.nav.label")}>
        <NavLink
          to=""
          end
          onClick={() => setOpen(false)}
          className="wayfind-mark"
          aria-label={`${translate("home.name")}, ${translate("light.nav.home")}`}
        >
          <span className="wayfind-name">
            <span className="wayfind-name-full">{translate("home.name")}</span>
            <span className="wayfind-name-short" aria-hidden="true">
              {shortName(translate("home.name"))}
            </span>
          </span>
          <span className="wayfind-show">
            {translate("light.nav.exhibition")}
          </span>
        </NavLink>

        <div className="wayfind-links">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={linkClass}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="wayfind-tools">
          <LanguageSwitch />
          <Link to="/" className="wayfind-dev">
            <CodeBracketIcon className="btn-icon" aria-hidden="true" />
            <span>{translate("light.nav.devMode")}</span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="wayfind-toggle"
            aria-expanded={open}
            aria-controls="wayfind-drawer"
            aria-label={translate("light.nav.menu")}
          >
            {open ? (
              <XMarkIcon className="btn-icon" aria-hidden="true" />
            ) : (
              <Bars2Icon className="btn-icon" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {open && (
        <div id="wayfind-drawer" className="wayfind-drawer">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setOpen(false)}
              className={linkClass}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/" className="wayfind-link">
            {translate("light.nav.devMode")}
          </Link>
        </div>
      )}
    </header>
  );
};

export default LightNav;
