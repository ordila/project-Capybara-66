import { configureStore } from "@reduxjs/toolkit"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage"

import { authReducer } from "./auth/slice"
import { userReducer } from "./user/slice"
import { categoriesReducer } from "./categories/slice"
import { transactionsReducer } from "./transactions/slice"
import { transactionsFiltersReducer } from "./transactionsFilters/slice"

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["sid", "refreshToken"],
}

const persistedAuth = persistReducer(persistConfig, authReducer)

export const store = configureStore({
  reducer: {
    auth: persistedAuth,
    user: userReducer,
    categories: categoriesReducer,
    transactions: transactionsReducer,
    transactionsFilters: transactionsFiltersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
