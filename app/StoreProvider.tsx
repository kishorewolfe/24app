"use client";
import type { AppStore } from "@/lib/store";
import { makeStore } from "@/lib/store";
import { setupListeners } from "@reduxjs/toolkit/query";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

interface Props {
  readonly children: ReactNode;
}

export const StoreProvider = ({ children }: Props) => {
  const storeRef = useRef<{ store: AppStore; persistor: any } | null>(null);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore(); // Return both store and persistor
  }

  useEffect(() => {
    if (storeRef.current != null) {
      // Configure listeners using the provided defaults
      const unsubscribe = setupListeners(storeRef.current.store.dispatch);
      return unsubscribe;
    }
  }, []);

  return (
    <Provider store={storeRef.current.store}>
      {/* Wrap with PersistGate to persist state */}
      <PersistGate loading={null} persistor={storeRef.current.persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
