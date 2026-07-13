import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  Cog8ToothIcon,
  EnvelopeIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";
import { setAppLanguage } from "../i18n";

const NavBar = ({ toggleExplorer, explorerOpen }) => {
  const { t: translate, i18n } = useTranslation();
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const WithTooltip = ({ children, className, text }) => (
    <Icon className={"group relative ".concat(className)}>
      {children}
      <span className="hidden md:group-hover:block absolute left-12 w-max bg-navBar px-3 py-1 text-sm text-gray-500 shadow-xl rounded border-r-1 md:border-r-0 border-gray-900">
        {text}
      </span>
    </Icon>
  );

  const Icon = ({ children, className = "" }) => (
    <div
      className={"sm:w-full sm:aspect-square hover:text-gray-500 flex justify-center items-center ".concat(
        className,
      )}
    >
      {children}
    </div>
  );

  const SettingOption = ({ disabled, onClick, text }) => (
    <button
      disabled={disabled}
      onClick={onClick}
      className="
        py-1 px-3
        text-sm text-left
        enabled:hover:bg-blue-500 hover:text-white w-full
        disabled:text-gray-700 disabled:cursor-not-allowed
      "
    >
      {text}
    </button>
  );

  const toggleLanguage = () => {
    const order = ["fr", "en", "ja"];
    const currentIndex = order.indexOf(i18n.language);
    const next = order[(currentIndex + 1) % order.length];
    setAppLanguage(next);
  };

  const settingsItems = (
    <>
      <SettingOption
        disabled={false}
        onClick={() => {
          toggleLanguage();
          setSettingsOpen(false);
        }}
        text={translate("navBar.switchLanguage")}
      />
      <SettingOption
        disabled={false}
        onClick={() => {
          navigate("/pro");
          setSettingsOpen(false);
        }}
        text={translate("navBar.switchTheme")}
      />
    </>
  );

  return (
    <div className="relative z-50 bg-navBar min-w-12 h-12 sm:h-full sm:w-12 flex sm:flex-col items-center justify-between text-gray-600 border-r-1 border-gray-900">
      <div className="w-full flex sm:block justify-evenly sm:justify-start">
        <button
          onClick={toggleExplorer}
          className="sm:w-full sm:aspect-square items-center justify-center hidden sm:flex"
        >
          <WithTooltip
            text={translate("navBar.link.profile")}
            className={explorerOpen ? "md:border-l-2 border-ayu-purple" : ""}
          >
            <FolderIcon className="w-6 h-6" strokeWidth="2" />
          </WithTooltip>
        </button>
        <WithTooltip text={translate("navBar.link.github")}>
          <a
            href="https://github.com/VivicatcHub"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 496 512"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
              />
            </svg>
          </a>
        </WithTooltip>
        <WithTooltip text={translate("navBar.link.linkedin")}>
          <a
            href="https://www.linkedin.com/in/valentin-guinet-ab683833b"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
              />
            </svg>
          </a>
        </WithTooltip>
        <WithTooltip
          text={translate("navBar.link.mail")}
          className="block sm:hidden"
        >
          <a
            href="mailto:guinetvalentin0@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <EnvelopeIcon
              className="w-6 h-6"
              strokeWidth="2"
              aria-hidden="true"
            />
          </a>
        </WithTooltip>
        <div className="relative flex sm:hidden items-center justify-center">
          <button
            onClick={() => setSettingsOpen((old) => !old)}
            className="hover:text-gray-500 flex items-center justify-center"
            aria-label={translate("navBar.link.setting")}
          >
            <Cog8ToothIcon
              className="w-6 h-6"
              strokeWidth="2"
              aria-hidden="true"
            />
          </button>
          {settingsOpen && (
            <div
              className="
                z-50
                flex flex-col items-start
                absolute bottom-12 right-0
                min-w-fit w-64
                bg-white text-black
                divide-y shadow-xl
              "
            >
              {settingsItems}
            </div>
          )}
        </div>
      </div>
      <div className="w-full hidden sm:block">
        <WithTooltip text={translate("navBar.link.mail")}>
          <a
            href="mailto:guinetvalentin0@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <EnvelopeIcon
              className="w-6 h-6"
              strokeWidth="2"
              aria-hidden="true"
            />
          </a>
        </WithTooltip>
        <Icon className="group">
          <Cog8ToothIcon
            className="w-6 h-6"
            strokeWidth="2"
            aria-hidden="true"
          />
          <div
            className="
            hidden
            group-hover:flex flex-col
            items-start
            absolute bottom-2 left-12
            min-w-ffocusableit w-64
            bg-white text-black
            divide-y
          "
          >
            {settingsItems}
          </div>
        </Icon>
      </div>
    </div>
  );
};

export default NavBar;
