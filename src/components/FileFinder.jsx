import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const FileFinder = ({ tabs, selectedTab, setSelectedTab }) => {
  const [sourceActive, setSourceActive] = useState(true);
  const { t: translate } = useTranslation();

  return (
    <div className="bg-fileFinder h-full w-62 min-w-fit border-r-1 border-gray-900 hidden md:block text-gray-500 py-1 shrink-0">
      <div className="mx-5 mt-2 mb-3 text-xs">EXPLORER</div>
      <button
        onClick={() => setSourceActive((old) => !old)}
        className="flex items-center font-bold uppercase text-xs"
      >
        <ChevronDownIcon
          className={"h-4 w-4 mx-1 transition duration-100 ".concat(
            sourceActive ? "" : "-rotate-90",
          )}
        />{" "}
        {translate("fileFinder.global")}
      </button>
      {sourceActive && (
        <div className="flex flex-col items-start mt-1">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              className={"flex items-center text-md px-6 py-[2px] hover:bg-superLightGray w-full ".concat(
                selectedTab === tab.value ? "bg-superLightGray text-white" : "",
              )}
              onClick={() => setSelectedTab(tab.value)}
            >
              <img
                className="h-4 w-4 mr-1"
                src={`/icons/${tab.name.split(".").pop()}.svg`}
                alt=""
              />
              {tab.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileFinder;
