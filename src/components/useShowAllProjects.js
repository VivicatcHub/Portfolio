import { useCallback, useState } from "react";

const KEY = "portfolio.showAllProjects";

const read = () => {
  try {
    return window.localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
};

// Featured projects only by default; the choice is remembered per browser
// and shared by both versions of the portfolio.
const useShowAllProjects = () => {
  const [showAll, setShowAll] = useState(read);
  const update = useCallback((value) => {
    setShowAll(value);
    try {
      window.localStorage.setItem(KEY, value ? "1" : "0");
    } catch {
      /* storage unavailable: keep the in-memory choice */
    }
  }, []);
  return [showAll, update];
};

export default useShowAllProjects;
