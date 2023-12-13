import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Cell } from "./../types/cell";

export const fetchCells = createAsyncThunk("cells/fetch", async (args, { rejectWithValue }) => {
  try {
    const { data }: { data: Cell[] } = await axios.get("/cells");
    return { data, err: "" };
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message as string);
    } else {
      throw err;
    }
  }
});
