import { createAsyncThunk } from "@reduxjs/toolkit";
import bundle from "./../../bundler/bundler";


interface CellData {
  cellId: string;
  rawCode: string;
}

export const createBundle = createAsyncThunk("bundles/create", async (cellData: CellData) => {
  const output = await bundle(cellData.rawCode);
  return { cellId: cellData.cellId, bundle: output };
});
