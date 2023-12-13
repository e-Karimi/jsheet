import React from "react";
// import { useActionCreators } from "../../hooks/useActionCreators";
import { useAppDispatch } from "../../hooks/hook";
import { insertCellAfter } from "./../../store";
import "./AddCell.css";

interface AddCellProps {
  prevCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ prevCellId, forceVisible }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={`add-cell-wrapper ${forceVisible && "force-visible"}`}>
      <div className="add-btn-wrapper">
        <button
          onClick={() => dispatch(insertCellAfter({ id: prevCellId, type: "code" }))}
          className="button is-info   is-small"
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span className="text">Code </span>
        </button>
        <button
          onClick={() => dispatch(insertCellAfter({ id: prevCellId, type: "text" }))}
          className="button is-warning is-small"
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span className="text">Text </span>
        </button>
      </div>
    </div>
  );
};

export default AddCell;
