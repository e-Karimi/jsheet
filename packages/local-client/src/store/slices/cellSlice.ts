import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Cell } from '../types/cell';
import {
  MoveCellPayload,
  DeleteCellPayload,
  InsertCellAfterPayload,
  UpdateCellPayload,
  fetchCellsPayload,
} from '../types/payloadTypes';
import { fetchCells } from './../thunks/fetchCells';


interface CellsState {
  loading: boolean;
  error: null | string;
  order: string[];
  data: {
    [cellId: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const slice = createSlice({
  name: 'cells',
  initialState,
  reducers: {
    deleteCell: (state, action: PayloadAction<DeleteCellPayload>) => {
      delete state.data[action.payload.id];
      state.order = state.order.filter((id) => id !== action.payload.id);
    },
    moveCell: (state, action: PayloadAction<MoveCellPayload>) => {
      const index = state.order.findIndex((id) => id === action.payload.id);
      const { direction } = action.payload;
      let targetIndex = direction === 'up' ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state;
      }
      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;
    },
    updateCell: (state, action: PayloadAction<UpdateCellPayload>) => {
      const { id, content } = action.payload;
      state.data[id].content = content;
      return state;
    },
    insertCellAfter: (state, action: PayloadAction<InsertCellAfterPayload>) => {
      const newNextCell: Cell = {
        id: crypto.randomUUID().substring(0, 6),
        type: action.payload.type,
        content: '',
      };
      state.data[newNextCell.id] = newNextCell;

      const currentIndex = state.order.findIndex((id) => id === action.payload.id);

      if (currentIndex === -1) {
        state.order.unshift(newNextCell.id);
      } else {
        state.order.splice(currentIndex + 1, 0, newNextCell.id);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCells.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCells.fulfilled, (state, action: PayloadAction<fetchCellsPayload>) => {
      state.order = action.payload?.data.map((cell) => cell.id);

      state.data = action.payload.data.reduce(
        (obj, cell) => {
          return { ...obj, [cell.id]: cell };
        },
        {} as CellsState['data']
      );
    });
    builder.addCase(fetchCells.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default slice.reducer;
export const { deleteCell, moveCell, updateCell, insertCellAfter } = slice.actions;
