import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist"; // For persisting Redux state in localStorage
import storage from "redux-persist/lib/storage"; // Default localStorage for web
import authSlice from "./authSlice"; // Importing the authentication slice

// Configuration for redux-persist
const persistConfig = {
    key: "root", // Key used in localStorage
    version: 1,
    storage, // Defines where to store the persisted state (localStorage here)
};

// Combine all reducers (useful if you have more slices later)
const reducers = combineReducers({
    auth: authSlice, // Manages authentication state like user info or tokens
});

// Create a persisted reducer using the persistConfig
const persistedReducer = persistReducer(persistConfig, reducers);

// Configure the Redux store
export const store = configureStore({
    reducer: persistedReducer, // Using the persisted reducer
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // Ignore redux-persist actions during serializability checks
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// Create the persistor to manage persisting the store
export let persistor = persistStore(store);
