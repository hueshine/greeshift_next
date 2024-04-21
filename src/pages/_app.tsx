import "@/styles/globals.css";
import type { AppProps } from "next/app";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import useSnoothScroll from "@/hook/use-smooth-scroll";

export default function App({ Component, pageProps }: AppProps) {
  useSnoothScroll();

  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
