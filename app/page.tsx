import type { Metadata } from "next";
import Home from "./home/page";
import HomePageHero from "./components/HomePageHero/HomePageHero";
import Footer from "./components/Footer/Footer";

export default function IndexPage() {
  return (
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]">
      <HomePageHero />
      <Home />
      <Footer/>
    </div>
  );
}

export const metadata: Metadata = {
  title: "24 Hectors",
};
