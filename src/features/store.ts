import { configureStore } from "@reduxjs/toolkit";
import DungeonsAndDragonsStateSlice from "./dungeon-dragons/DungeonsAndDragonsSlice";

const store = configureStore({
  reducer: DungeonsAndDragonsStateSlice,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
