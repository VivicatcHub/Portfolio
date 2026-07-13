import { XMarkIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

const MainArea = ({
  tabs,
  selectedTab,
  setSelectedTab,
  closeTab,
  closedTabs,
}) => {
  const { t: translate } = useTranslation();

  const Tab = ({ tab }) => (
    <div
      className={"flex text-gray-500 group border-t-2 border-transparent px-3 py-2 ".concat(
        selectedTab === tab.value
          ? "bg-main text-white"
          : "hover:border-ayu-purple",
      )}
    >
      <button
        onClick={() => setSelectedTab(tab.value)}
        className="flex items-center text-md min-w-max"
      >
        <img
          className="h-5 aspect-square pr-2"
          src={`/icons/${tab.name.split(".").pop()}.svg`}
          alt=""
        />
        <span className="min-w-fit">{tab.name}</span>
      </button>
      <button
        title={translate("fileFinder.tabs.close")}
        onClick={() => closeTab(tab.value)}
        className="ml-3 group-hover:text-white hidden sm:inline"
      >
        <XMarkIcon className="h-3.5 aspect-square" />
      </button>
    </div>
  );

  return (
    <div className="bg-main h-full flex-grow overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="flex bg-fileFinder border-b-1 border-gray-900 overflow-x-auto min-h-fit">
          {tabs
            .filter((tab) => !closedTabs.includes(tab.value))
            .map((tab) => (
              <Tab key={tab.value} tab={tab} />
            ))}
        </div>
        <div className="flex-grow h-1">
          {tabs.find((tab) => tab.value === selectedTab)?.component ||
            tabs[0].component}
        </div>
      </div>
    </div>
  );
};

export default MainArea;
