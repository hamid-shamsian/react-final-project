import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./features/userSlice";
import themeReducer from "./features/themeSlice";

const persistConfig = { key: "root", storage, blacklist: ["user"] };

const rootReducer = combineReducers({ user: userReducer, theme: themeReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({ reducer: persistedReducer });

export const persistor = persistStore(store);

export default store;
