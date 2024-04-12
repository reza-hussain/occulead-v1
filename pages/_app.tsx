import Layout from "@/components/layouts";
import StateProvider from "@/context/StateProvider";
import "@/styles/globals.scss";
import "styles/utils.scss";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StateProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StateProvider>
  );
}
