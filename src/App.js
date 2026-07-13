import { useState } from "react";
import { useTranslation } from "react-i18next";
import FileFinder from "./components/FileFinder";
import MainArea from "./components/MainArea";
import NavBar from "./components/NavBar";
import Contact from "./components/Tabs/Contact";
import Experiences from "./components/Tabs/Experiences";
import Home from "./components/Tabs/Home";
import NotePad from "./components/Tabs/NotePad";
import Projects from "./components/Tabs/Projects";
import Skills from "./components/Tabs/Skills";

import "./Reset.css";

function App() {
  const { t: translate } = useTranslation();

  const [explorerOpen, setExplorerOpen] = useState(true);

  const openTab = (tabValue) => {
    setClosedTabs((old) => old.filter((tab) => tab !== tabValue));
    setSelectedTab(tabValue);
  };

  const navigate = (tab) => {
    setSelectedTab(tab);
  };

  const closeTab = (tabValue) => {
    const _closedTabs = [...closedTabs, tabValue];
    setClosedTabs(_closedTabs);

    if (selectedTab === tabValue) {
      const toOpenTab = TABS.find((tab) => !_closedTabs.includes(tab.value));
      setSelectedTab(toOpenTab?.value);
    }
  };

  const TABS = [
    {
      name: translate("fileFinder.tabs.home"),
      component: <Home navigate={navigate} />,
      value: "profile",
    },
    {
      name: translate("fileFinder.tabs.experiences"),
      component: <Experiences />,
      value: "experiences",
    },
    {
      name: translate("fileFinder.tabs.project"),
      component: <Projects />,
      value: "projects",
    },
    {
      name: translate("fileFinder.tabs.skills"),
      component: <Skills />,
      value: "skills",
    },
    {
      name: translate("fileFinder.tabs.contact"),
      component: <Contact />,
      value: "contact",
    },
    {
      name: translate("fileFinder.tabs.notepad"),
      component: <NotePad />,
      value: "notepad",
    },
  ];

  const [selectedTab, setSelectedTab] = useState(TABS[0].value);
  const [closedTabs, setClosedTabs] = useState([]);

  return (
    <div className="h-screen w-screen flex flex-col-reverse sm:flex-row">
      <NavBar
        toggleExplorer={() => setExplorerOpen((old) => !old)}
        explorerOpen={explorerOpen}
      />
      {explorerOpen && (
        <FileFinder
          tabs={TABS}
          selectedTab={selectedTab}
          setSelectedTab={openTab}
        />
      )}
      <MainArea
        tabs={TABS}
        selectedTab={selectedTab}
        setSelectedTab={openTab}
        closeTab={closeTab}
        closedTabs={closedTabs}
      />
    </div>
  );
}

export default App;
