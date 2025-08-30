// app/layout.tsx
import "./globals.css";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
});

// Metadata for SEO and tab title / favicon
export const metadata = {
  title: "Image Resizer",
  description: "Resize your images with Naturals Image Resizer",
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} font-sans bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}
