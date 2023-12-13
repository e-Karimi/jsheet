import React, { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Cell } from "./../../store";
// import { useActionCreators } from "../../hooks/useActionCreators";
import "./TextEditor.css";
//*
import { updateCell } from "./../../store";
import { useAppDispatch } from "../../hooks/hook";

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  // const { updateCell } = useActionCreators();
  const dispatch = useAppDispatch();
  const [showEditor, setShowEditor] = useState(false);
  const editorRef = useRef<HTMLDivElement | null>(null);

  const listener = (event: MouseEvent) => {
    if (event.target && editorRef.current && editorRef.current.contains(event.target as Node)) {
      return;
    }
    setShowEditor(false);
  };

  useEffect(() => {
    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (showEditor) {
    return (
      <div ref={editorRef} className="text-editor">
        <MDEditor
          value={cell.content}
          onChange={(val) => dispatch(updateCell({ id: cell.id, content: val || "" }))}
        />
      </div>
    );
  }
  return (
    <div className="text-editor markdown" onClick={() => setShowEditor(true)}>
      <MDEditor.Markdown
        source={cell.content || "## Click To Edit"}
        style={{ whiteSpace: "pre-wrap" }}
      />
    </div>
  );
};

export default TextEditor;
