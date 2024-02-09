import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { AuthReducer } from "./auth";
import { CategoriesReducer } from "./categories";
import { TransactionsReducer } from "./transactions";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["accessToken", "refreshToken", "sid"],
};
const persistedReducer = persistReducer(persistConfig, AuthReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    categories: CategoriesReducer,
    transactions: TransactionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
