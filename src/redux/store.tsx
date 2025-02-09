import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import roleReducer from "./roleSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    role: roleReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;