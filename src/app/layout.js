import { Inter } from "next/font/google";
import "./globals.css";
import "@/styles/auth.css";
import "@/styles/utilities.css";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Izeexo | Visualizing the Extraordinary",
  description: "The premium operating system for high-performance design engineering teams and future-ready brands.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (document.cookie.includes('intro_shown=true')) {
                  window.__INTRO_SHOWN__ = true;
                }
              } catch (e) {}
            `,
          }}
        />
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
