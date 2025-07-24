import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Season = "spring" | "summer" | "autumn" | "winter";

interface SeasonState {
  currentSeason: Season;
}

const initialState: SeasonState = {
  currentSeason: "spring",
};

const seasonSlice = createSlice({
  name: "season",
  initialState,
  reducers: {
    setSeason: (state, action: PayloadAction<Season>) => {
      state.currentSeason = action.payload;
    },
  },
});

export const { setSeason } = seasonSlice.actions;
export default seasonSlice.reducer;
