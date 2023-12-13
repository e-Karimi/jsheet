import { createSlice } from "@reduxjs/toolkit";
import { createBundle } from "./../thunks/createBundle";
import type { PayloadAction } from "@reduxjs/toolkit";
import {BundleCompletePayload} from './../index'

interface BundleState {
  [cellId: string]:
    | {
        loading: boolean;
        err: string;
        code: string;
      }
    | undefined;
}

const initialState: BundleState = {};

const slice = createSlice({
  name: "bundles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createBundle.pending, (state, action) => {
      state[action.meta.arg.cellId] = {
        loading: true,
        err: "",
        code: "",
      };
    });
    builder.addCase(createBundle.fulfilled, (state, action:PayloadAction<BundleCompletePayload>) => {
      state[action.payload.cellId] = {
        loading: false,
        err: action.payload.bundle.err,
        code: action.payload.bundle.code,
      };
    });
  },
});

export default slice.reducer;
