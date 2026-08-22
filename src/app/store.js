import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services/api";
import favoritesReducer from "./favoritesSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});
