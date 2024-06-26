import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ThemeProvider } from "@/components/theme/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
// import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { SessionProvider } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <body className={inter.className}>
              <Navbar />
              <ToastContainer />

              <div className="min-h-screen">{children}</div>
              <Footer />
            </body>
            {/* <ThemeSwitcher /> */}
          </ThemeProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
