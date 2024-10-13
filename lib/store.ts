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

const isBrowser = typeof window !== "undefined" && typeof window.localStorage !== "undefined";
const selectedStorage = isBrowser ? storageSession : storage; // Default to localStorage if sessionStorage is unavailable.


const encryptor = encryptTransform({
  secretKey: "ASdasdasd",
  onError: (error: any) => console.log(error),
});

const persistConfig = {
  key: 'root',
  storage: selectedStorage || storage,
  transforms: [encryptor],
};

const rootReducer = combineSlices(
  counterSlice,
  quotesApiSlice,
  propertySlice,
  listingSlice,
  usersDataSlice,
  ApprovalSlice
);

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }).concat(quotesApiSlice.middleware),
  });

   const persistor = persistStore(store);

  return { store, persistor };
};

export type AppStore = ReturnType<typeof makeStore>['store'];
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
