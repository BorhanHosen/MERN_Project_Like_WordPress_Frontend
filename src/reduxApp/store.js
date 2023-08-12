import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { UserApi } from "../services/UserApi";
import { PostApi } from "../services/PostApi";

export const store = configureStore({
  reducer: {
    [UserApi.reducerPath]: UserApi.reducer,
    [PostApi.reducerPath]: PostApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserApi.middleware, PostApi.middleware),
});

setupListeners(store.dispatch);
