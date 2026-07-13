import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { CodeBracketIcon, LanguageIcon } from "@heroicons/react/24/outline";
import { setAppLanguage } from "../../i18n";

const LightNav = () => {
  const { t: translate, i18n } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleLanguage = () => {
    const order = ["fr", "en", "ja"];
    const currentIndex = order.indexOf(i18n.language);
    const next = order[(currentIndex + 1) % order.length];
    setAppLanguage(next);
  };

  const links = [
    { to: "", label: translate("light.nav.home"), end: true },
    { to: "experiences", label: translate("light.nav.experiences") },
    { to: "projects", label: translate("light.nav.projects") },
    { to: "skills", label: translate("light.nav.skills") },
    { to: "contact", label: translate("light.nav.contact") },
  ];

  const linkClass = ({ isActive }) =>
    "px-3 py-2 rounded-md text-sm font-medium transition-colors " +
    (isActive
      ? "text-ayu-purple bg-ayu-purple/10"
      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100");

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-200">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <NavLink
          to=""
          end
          onClick={() => setOpen(false)}
          className="font-bold text-lg tracking-tight text-gray-900"
        >
          Valentin<span className="text-ayu-purple">.</span>
        </NavLink>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
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

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            title={translate("navBar.switchLanguage")}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <LanguageIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate("/")}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <CodeBracketIcon className="w-5 h-5" />
            {translate("light.nav.devMode")}
          </button>
          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            aria-label="Menu"
          >
            <div className="w-5 space-y-1">
              <span className="block h-0.5 bg-current" />
              <span className="block h-0.5 bg-current" />
              <span className="block h-0.5 bg-current" />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile links */}
      {open && (
        <div className="md:hidden border-t border-gray-200 px-4 py-3 flex flex-col gap-1">
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
          <button
            onClick={() => navigate("/")}
            className="mt-1 inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 self-start"
          >
            <CodeBracketIcon className="w-5 h-5" />
            {translate("light.nav.devMode")}
          </button>
        </div>
      )}
    </header>
  );
};

export default LightNav;
