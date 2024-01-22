import type { FC, PropsWithChildren } from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { TrpcProvider } from "@/utils/trpc-provider";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

const monserat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Evaluasi Dosen",
  description: "Webiste Evaluasi Dosen Universitas Islam Nusantara",
};

const RootLayout: FC<Readonly<PropsWithChildren>> = ({ children }) => (
  <html lang="en">
    <body className={monserat.className}>
      <SessionProvider>
        <TrpcProvider>
          <div className="bg-grey-50 overflow-x-hidden h-full">{children}</div>
          <ToastContainer />
        </TrpcProvider>
      </SessionProvider>
    </body>
  </html>
);

export default RootLayout;
