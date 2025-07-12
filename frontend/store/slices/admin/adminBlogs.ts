import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlogPost } from "../../../types/Admin";

interface ProductState {
  blogs: BlogPost[];
  error: boolean | null;
  selectedBlog: BlogPost | null;
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

const initialState: ProductState = {
  blogs: [],
  error: null,
  selectedBlog: null,
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

export const blogSlice = createSlice({
  name: "adminBlogs",
  initialState,
  reducers: {
    fetchAllAdminBlogs: (
      state,
      action: PayloadAction<{
        data: { data: BlogPost[]; total: number };
        success: boolean;
        message?: string;
      }>
    ) => {
      const { data, success, message } = action.payload;

      if (success) {
        state.blogs = data.data;
        state.total = data.total;
      } else {
        state.error = true;
        state.message = message || "Failed to fetch data. Please try again.";
      }

      state.loading = false;
    },
    fetchAdminBlog: (
      state,
      action: PayloadAction<{
        data: BlogPost | null;
        success: boolean;
        message?: string;
      }>
    ) => {
      const { data, success, message } = action.payload;

      if (success) {
        state.selectedBlog = data;
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
    clearCurrentAdminBlog: (state) => {
      state.selectedBlog = null;
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
    updateCurrentAdminBlogData: (
      state,
      action: PayloadAction<{ id: string; data: BlogPost }>
    ) => {
      const { id, data } = action.payload;
      const index = state.blogs.findIndex((item) => item._id === id);

      if (index !== -1) {
        state.blogs[index] = data;
      }
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
  fetchAdminBlog,
  fetchAllAdminBlogs,
  beginProcess,
  beginLoading,
  handleMessage,
  clearMessage,
  clearCurrentAdminBlog,
  onReduxPageChange,
  updateCurrentAdminBlogData,
  onHanldeSearchData,
  handleSetErrors,
} = blogSlice.actions;
export default blogSlice.reducer;
