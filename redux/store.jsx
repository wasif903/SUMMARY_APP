import { configureStore } from "@reduxjs/toolkit";
import auth from "./Auth/auth";

const store = configureStore({
  reducer: {
    [auth.reducerPath]: auth.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(auth.middleware),
});

export default store;
