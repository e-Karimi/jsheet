import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { deleteCell, moveCell, updateCell, insertCellAfter } from '../slices';
import { RootState } from '../store';
import axios from 'axios';

export const saveCellsListenerMiddleware = createListenerMiddleware();

saveCellsListenerMiddleware.startListening({
  matcher: isAnyOf(deleteCell, moveCell, updateCell, insertCellAfter),
  effect: async (action, listenerApi) => {
    const {
      cells: { data, order },
    } = listenerApi.getState() as RootState;

    const cells = order.map((id) => data[id]);

    try {
      await axios.post('/cells', { cells });
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
        throw err;
      }
    }
  },
});
