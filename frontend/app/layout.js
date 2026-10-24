import { DM_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const dm = DM_Sans({ subsets: ["latin"], variable: "--font-dm" });

export const metadata = {
  title: "Ricoz Innovation | B2B Channel Distribution",
  description: "Connect brands with regional distributors",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={dm.variable}>
      <body className="font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}