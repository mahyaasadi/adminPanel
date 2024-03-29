import React from "react";
import Head from "next/head";
import "public/assets/css/bootstrap.min.css";
import "public/assets/css/feathericon.min.css";
import "public/assets/plugins/fontawesome/css/fontawesome.min.css";
import "public/assets/plugins/fontawesome/css/all.min.css";
import "public/assets/css/font-awesome.min.css";
import "public/assets/css/style.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import { PrimeReactProvider } from "primereact/api";
import DashboardLayout from "pages/dashboardLayout";
// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
//   QueryClient,
//   QueryClientProvider,
// } from "react-query";

// const queryClient = new QueryClient();

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

      <PrimeReactProvider>
        <DashboardLayout UserData={pageProps.UserData}>
          <Component {...pageProps} />
        </DashboardLayout>
      </PrimeReactProvider>

      {/* <QueryClientProvider client={queryClient}> */}
      {/* </QueryClientProvider> */}
    </>
  );
}
