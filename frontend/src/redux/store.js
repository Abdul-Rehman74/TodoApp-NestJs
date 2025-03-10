import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";
import userSlice from "./user/user";

const reducers = combineReducers({
    user: userSlice,
});

const persistState = {
    transform: [
        encryptTransform({
            secretKey: import.meta.env.VITE_ENCRYPTION_KEY,
            onError: function (error) {
                console.error(error);
            },
        }),
    ],
    key: "root",
    storage,
    whitelist: ["user"],
};

const persistedReducer = persistReducer(persistState, reducers);

const store = configureStore({
    reducer: persistedReducer,
    devTools: import.meta.env.VITE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
