import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

const STORAGE_KEY = "THM_NOTEPAD";

const NotePad = () => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(localStorage.getItem(STORAGE_KEY) || "");
  }, []);

  const update = (newValue) => {
    const next = newValue ?? "";
    localStorage.setItem(STORAGE_KEY, next);
    setValue(next);
  };

  return (
    <Editor
      height="100%"
      defaultLanguage="markdown"
      theme="vs-dark"
      value={value}
      onChange={update}
      options={{
        minimap: { enabled: false },
        wordWrap: "on",
        fontSize: 14,
        scrollBeyondLastLine: false,
      }}
    />
  );
};

export default NotePad;
