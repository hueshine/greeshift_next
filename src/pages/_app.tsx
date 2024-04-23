import "@/styles/globals.css";
import type { AppProps } from "next/app";

import Header from "../layout/Header/Header";
import Footer from "../layout/Footer/Footer";

import useSnoothScroll from "@/hook/use-smooth-scroll";

export default function App({ Component, pageProps }: AppProps) {
  useSnoothScroll();

  return (
    <>
      <Header />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Component {...pageProps} />
          <Footer />
        </div>
      </div>
    </>
  );
}
