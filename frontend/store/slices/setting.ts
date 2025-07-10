// store/slices/settings.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";
import { IGeneralSettings, ISetting } from "../../types/Admin";

interface SettingsState {
  settings: IGeneralSettings | null;
  loading: boolean;
}

const initialState: SettingsState = {
  settings: null,
  loading: true,
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
  reducers: {},
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

export default settingsSlice.reducer;
