import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./reducers/currencyReducer.jsx";
import productsReducer from "./reducers/productsReducer.jsx";
import categoryReducer from "./reducers/categoryReducer.jsx";
import vendorReducer from "./reducers/vendorReducer.jsx";
import popupReducer from "./reducers/popupReducer.jsx";
import userReducer from "./reducers/userReducer.js";
import cartReducer from "./reducers/cartReducer.jsx";
import searchReducer from "./reducers/searchReducer.jsx";
import FilterReducer from './reducers/FilterReducer.jsx'


import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore,FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from "redux-persist";



// Persist configuration for the user slice
const userPersistConfig = {
    key: "user", // key to use in localStorage
    storage, // default storage engine (localStorage)
};

// Create persisted reducer
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

const currencyPersistConfig = {
    key: "currency", // Key to store in localStorage
    storage,
};
// Create persisted reducer
const persistedCurrencyReducer = persistReducer(currencyPersistConfig, currencyReducer);

export const store = configureStore({
    reducer: {
        currency: persistedCurrencyReducer,
        productsData: productsReducer,
        categoryData: categoryReducer,
        vendorData: vendorReducer,
        popup: popupReducer,
        user: persistedUserReducer,
        cart: cartReducer,
        search : searchReducer,
        filter: FilterReducer,

    },
    //to use non serializable value in our action or state
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
 
});

export const persistor = persistStore(store);
