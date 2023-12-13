import React from "react";
import { Cell } from "./../../store";
import CodeCell from "./../CodeCell/CodeCell";
import TextEditor from "./../TextEditor/TextEditor";
import ActionBar from "./../ActionBar/ActionBar";
import "./CellItem.css";

interface CellItemProps {
  cell: Cell;
}

const CellItem: React.FC<CellItemProps> = ({ cell }) => {
  let content: JSX.Element;

  if (cell.type === "code") {
    content = <CodeCell cell={cell} />;
  } else {
    content = <TextEditor cell={cell} />;
  }

  return (
    <div className="cellItem-wrapper">
      <div className="action-bar-wrapper">
        <ActionBar id={cell.id} />
      </div>
      {content}
    </div>
  );
};

export default CellItem;
