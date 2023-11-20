import "./globals.css";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import Provider from "@/redux/provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as HotToaster } from "react-hot-toast";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Ecommerce ",
  description:
    "Ecommerce Web App which which will give NextLevel of Ecommerce Experience. it will be a great experience for the user.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <body className={lato.className}>
        <Provider>
          <HotToaster position="top-center" reverseOrder={true} />
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
