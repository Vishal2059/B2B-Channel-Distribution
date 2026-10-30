import "./globals.css";

export const metadata = {
  title: "LeadMarket | B2B Wholesale Marketplace",
  description:
    "Connect trusted brands with distributors. Discover products, request bulk orders and grow your wholesale business with LeadMarket.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}