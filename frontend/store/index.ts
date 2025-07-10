// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import settingsReducer from "./slices/setting";
import productsReducer from "./slices/admin/menu";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: settingsReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
