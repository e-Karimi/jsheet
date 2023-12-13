import React, { useRef } from "react";
import Editor, { OnChange, OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import prettier from "prettier";
import babelPlugin from "prettier/plugins/babel";
import estreePlugin from "prettier/plugins/estree";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import "./CodeEditor.css";

interface CodeEditorProps {
  initialValue: string;
  onCurrentValue(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onCurrentValue }) => {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const handleEditorChange: OnChange = (value, event) => {
    if (typeof value === "string") {
      onCurrentValue(value);
    }
  };

  const options: monaco.editor.IStandaloneEditorConstructionOptions = {
    minimap: { enabled: false },
    scrollbar: { horizontal: "hidden" },
    wordWrap: "on",
    showUnused: false,
    folding: false,
    fontSize: 16,
    lineNumbersMinChars: 3,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 2,
  };

  const formatHandler = async () => {
    //1- get current value from editor
    const unFormatted = editorRef.current.getModel().getValue();

    //2- format that value
    const formatted = (
      await prettier.format(unFormatted, {
        parser: "babel",
        plugins: [babelPlugin, estreePlugin],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
    ).replace(/\n$/, "");

    //3- set the formatted value back in the editor
    editorRef.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button className="button button-format is-small is-primary" onClick={formatHandler}>
        Format
      </button>
      <Editor
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        defaultValue={initialValue}
        theme="vs-dark"
        language="javascript"
        options={options}
      />
    </div>
  );
};

export default CodeEditor;
