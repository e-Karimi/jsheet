import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cellsReducer from './slices/cellSlice';
import bundlesReducer from './slices/bundleSlice';
import { saveCellsListenerMiddleware } from './middleware/saveCellsListenerMiddleware';


const rootReducer = combineReducers({ cells: cellsReducer, bundles: bundlesReducer });

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(saveCellsListenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
