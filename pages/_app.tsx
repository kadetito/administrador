import "../scss/index.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import { SWRConfig } from "swr";

import { AuthProvider } from "../context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  );
}

export default MyApp;
