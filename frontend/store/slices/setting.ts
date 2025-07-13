// store/slices/settings.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api";
import { IGeneralSettings, ISetting } from "../../types/Admin";

interface SettingsState {
  settings: IGeneralSettings | null;
  loading: boolean;
  success: boolean | null;
  error: boolean | null;
  message: string | null;
  errors: Record<string, string>;
  currentSettingData: Record<string, string>;
}

const initialState: SettingsState = {
  settings: null,
  loading: true,
  success: null,
  error: null,
  message: null,
  errors: {},
  currentSettingData: {},
};

// Async thunk to fetch settings from API
export const fetchSettings = createAsyncThunk("settings/fetch", async () => {
  const res = await api.get("/admin/settings", {
    params: { group: "general" },
  });
  const settingsArray: ISetting[] = res.data.data || [];

  const record = settingsArray.reduce((acc, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {} as Record<string, string>);

  return {
    shopName: record.shopName || "",
    shopDescription: record.shopDescription || "",
    shopEmail: record.shopEmail || "",
    shopPhone: record.shopPhone || "",
    shopAddress: record.shopAddress || "",
  };
});

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    fetchGeneralSetting: (
      state,
      action: PayloadAction<{
        data: IGeneralSettings | null;
        success: boolean;
        message?: string;
      }>
    ) => {
      const { data, success, message } = action.payload;

      if (success) {
        state.settings = data;
      } else {
        state.error = true;
        state.message = message || "Failed to get data. Please try again.";
      }

      state.loading = false;
    },
    fetchCurrentSetting: (
      state,
      action: PayloadAction<{
        data: Record<string, string> | null;
        success: boolean;
        message?: string;
      }>
    ) => {
      const { data, success, message } = action.payload;

      if (success) {
        state.currentSettingData = data || {};
      } else {
        state.error = true;
        state.message = message || "Failed to get data. Please try again.";
      }

      state.loading = false;
    },
    handleMessage: (
      state,
      action: PayloadAction<{ success: boolean; message: string }>
    ) => {
      const { success, message } = action.payload;

      if (success) {
        state.success = true;
      } else {
        state.error = true;
      }

      state.message = message;
      state.loading = false;
    },
    clearMessage: (state) => {
      state.error = null;
      state.success = null;
      state.message = null;
    },
    handleSetErrors: (
      state,
      action: PayloadAction<{ errors: Record<string, string> }>
    ) => {
      const { errors } = action.payload;

      state.errors = errors;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.settings = action.payload;
        state.loading = false;
      })
      .addCase(fetchSettings.rejected, (state) => {
        state.settings = null;
        state.loading = false;
      });
  },
});

export const {
  fetchGeneralSetting,
  handleMessage,
  clearMessage,
  handleSetErrors,
  fetchCurrentSetting,
} = settingsSlice.actions;
export default settingsSlice.reducer;
