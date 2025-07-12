// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import adminSettingsReducer from "./slices/setting";
import adminProductsReducer from "./slices/admin/adminMenu";
import adminIngredientReducer from "./slices/admin/adminIngredients";
import adminOrdersReducer from "./slices/admin/adminOrders";
import adminBlogsReducer from "./slices/admin/adminBlogs";
import adminUsersReducer from "./slices/admin/adminUsers";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: adminSettingsReducer,
    adminProducts: adminProductsReducer,
    adminIngredients: adminIngredientReducer,
    adminOrders: adminOrdersReducer,
    adminBlogs: adminBlogsReducer,
    adminUsers: adminUsersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
