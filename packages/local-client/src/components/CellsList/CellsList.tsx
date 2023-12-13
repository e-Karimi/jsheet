import React, { useEffect } from "react";
import CellItem from "./../CellItem/CellItem";
import AddCell from "./../AddCell/AddCell";
import { Fragment } from "react";
import { useAppSelector } from "../../hooks/hook";
import "./CellsList.css";
import { fetchCells } from "./../../store";
import { useAppDispatch } from "../../hooks/hook";

const CellsList: React.FC = () => {
  const cells = useAppSelector((state) => state.cells);
  const dispatch = useAppDispatch();
  const { data, order } = cells;
  const cellsData = order.map((id) => {
    return data[id];
  });

  useEffect(() => {
    dispatch(fetchCells());
  }, [dispatch]);

  return (
    <div className="cells-list">
      <AddCell forceVisible={cellsData.length === 0} prevCellId={null} />
      {cellsData.map((cell) => (
        <Fragment key={cell.id}>
          <CellItem cell={cell} />
          <AddCell prevCellId={cell.id} />
        </Fragment>
      ))}
    </div>
  );
};

export default CellsList;
