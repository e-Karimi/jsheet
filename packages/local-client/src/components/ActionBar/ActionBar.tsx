import React from "react";
import { useAppDispatch } from "../../hooks/hook";
import { moveCell, deleteCell } from "./../../store";
import "./ActionBar.css";
interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="action-bar">
      <button
        onClick={() => dispatch(moveCell({ id, direction: "up" }))}
        className="button is-primary is-small"
      >
        <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span>
      </button>
      <button
        onClick={() => dispatch(moveCell({ id, direction: "down" }))}
        className="button is-primary is-small"
      >
        <span className="icon">
          <i className="fas fa-arrow-down"></i>
        </span>
      </button>
      <button onClick={() => dispatch(deleteCell({ id }))} className="button is-primary is-small">
        <span className="icon">
          <i className="fas fa-times"></i>
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
