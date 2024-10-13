"use client";
import Image from "next/image";
import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import { Nav } from "./components/Nav";

import "./styles/globals.css";
import styles from "./styles/layout.module.css";
import Header from "./components/Header/Header";
import NavHeader from "./components/NavBar/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import { makeStore } from "@/lib/store";

export const { store, persistor } = makeStore();
interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <PersistGate loading={null} persistor={persistor}></PersistGate>
          <section className={styles.container}>
            <NavHeader></NavHeader>
            <ToastContainer />
            <main>{children}</main>
          </section>
        </StoreProvider>
      </body>
    </html>
  );
}
