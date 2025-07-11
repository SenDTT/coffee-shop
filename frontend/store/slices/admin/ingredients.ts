import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ingredient } from "../../../types/Ingredient";

interface IngredientState {
  ingredients: Ingredient[];
  error: boolean | null;
  selectedIngredient: Ingredient | null;
  loading: boolean; // is loading list data
  inProccessing: boolean; // is processing of action
  success: boolean | null;
  message: string | null;
  params: {
    limit: number;
    skip: number;
    search?: string;
  };
  currentPage: number;
  total: number;
  errors: Record<string, string>; // list errors of form data
}

const LIMIT = 10;

const initialState: IngredientState = {
  ingredients: [],
  error: null,
  selectedIngredient: null,
  loading: true,
  success: null,
  message: null,
  params: {
    limit: LIMIT,
    skip: 0,
  },
  currentPage: 1,
  total: 0,
  inProccessing: false,
  errors: {},
};

export const ingredientSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    fetchAllIngredients: (
      state,
      action: PayloadAction<{
        data: { data: Ingredient[]; total: number };
        success: boolean;
        message?: string;
      }>
    ) => {
      const { data, success, message } = action.payload;

      if (success) {
        state.ingredients = data.data;
        state.total = data.total;
      } else {
        state.error = true;
        state.message = message || "Failed to fetch data. Please try again.";
      }

      state.loading = false;
    },
    fetchAnIngredient: (
      state,
      action: PayloadAction<{
        data: Ingredient | null;
        success: boolean;
        message?: string;
      }>
    ) => {
      const { data, success, message } = action.payload;

      if (success) {
        state.selectedIngredient = data;
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
      state.inProccessing = false;
      state.loading = false;
    },
    beginLoading: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
      state.message = null;
    },
    beginProcess: (state) => {
      state.inProccessing = true;
      state.error = null;
      state.success = null;
      state.message = null;
    },
    clearMessage: (state) => {
      state.error = null;
      state.success = null;
      state.message = null;
    },
    clearCurrentIngredient: (state) => {
      state.selectedIngredient = null;
    },
    onHanldeSearchData: (state, action: PayloadAction<{ search: string }>) => {
      const { search } = action.payload;
      state.currentPage = 1;
      if (search !== "") {
        state.params = {
          ...state.params,
          search,
        };
      } else {
        state.params = {
          skip: 0,
          limit: LIMIT,
        };
      }
    },
    onReduxPageChange: (state, action: PayloadAction<{ page: number }>) => {
      const { page } = action.payload;
      state.currentPage = page;
      state.params = {
        skip: (page - 1) * LIMIT,
        limit: LIMIT,
      };
    },
    updateCurrentIngredientData: (
      state,
      action: PayloadAction<{ id: string; data: Ingredient }>
    ) => {
      const { id, data } = action.payload;
      const index = state.ingredients.findIndex((item) => item._id === id);

      if (index !== -1) {
        state.ingredients[index] = data;
      }
    },
    unSelectIngredient: (state) => {
      state.selectedIngredient = null;
    },
    handleSetErrors: (
      state,
      action: PayloadAction<{ errors: Record<string, string> }>
    ) => {
      const { errors } = action.payload;

      state.errors = errors;
    },
  },
});

export const {
  fetchAnIngredient,
  fetchAllIngredients,
  beginProcess,
  beginLoading,
  handleMessage,
  clearMessage,
  clearCurrentIngredient,
  onReduxPageChange,
  updateCurrentIngredientData,
  onHanldeSearchData,
  unSelectIngredient,
  handleSetErrors,
} = ingredientSlice.actions;
export default ingredientSlice.reducer;
