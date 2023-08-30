import React from "react";
import Head from "next/head";
import "public/assets/css/bootstrap.min.css";
import "public/assets/css/feathericon.min.css";
import "public/assets/plugins/fontawesome/css/fontawesome.min.css";
import "public/assets/plugins/fontawesome/css/all.min.css";
import "public/assets/css/font-awesome.min.css";
import "public/assets/css/style.css";
import { favicon } from "components/imagePath";
import DashboardLayout from "src/app/dashboard/layout";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="assets/img/icon/mngIcon.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="assets/img/icon/mngIcon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="assets/img/icon/mngIcon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="assets/img/icon/mngIcon.png"
        />
      </Head>

      {/* Provide the client to your App */}
      <QueryClientProvider client={queryClient}>
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      </QueryClientProvider>
    </>
  );
}
