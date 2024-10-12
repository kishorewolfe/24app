import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./features/counter/counterSlice";
import { quotesApiSlice } from "./features/quotes/quotesApiSlice";
import { propertySlice } from "./features/property/propertySlice";
import { listingSlice } from "./features/listing/ListingSlice";
import { usersDataSlice } from "./features/user/userDataSlice";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { ApprovalSlice } from "./features/approvals/ApprovalSlice";

const isBrowser = typeof window !== "undefined";

// Choose storage engine based on environment
const selectedStorage = isBrowser ? storageSession : storage; // use localStorage as fallback in non-browser env

const encryptor = encryptTransform({
  secretKey: "ASdasdasd",
  onError: function (error: any) {
    // Handle encryption errors
    console.log(error);
  },
});

// Configure persist settings
const persistConfig = {
  key: 'root',
  storage:selectedStorage,
  transforms: [encryptor],

};

// Combine all the slices using your utility
const rootReducer = combineSlices(
  counterSlice,
  quotesApiSlice,
  propertySlice,
  listingSlice,
  usersDataSlice,
  ApprovalSlice
);

// Wrap root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

// `makeStore` encapsulates the store configuration to create unique store instances.
export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(quotesApiSlice.middleware),
  });

  const persistor = persistStore(store); // persistStore depends on the store instance

  return { store, persistor }; // Return both store and persistor
};

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>['store'];
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;