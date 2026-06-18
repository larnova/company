import type { Metadata } from "next";
import { Fustat } from "next/font/google";
import "./globals.css";

const fustat = Fustat({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Larnova: A Driver of Innovation",
  description:
    "Larnova challenges the status quo to build what doesn't yet exist by turning audacious zero to one ideas into technology that moves the world forward, from Africa to everyone.",
  icons: "/logo-metadata.png",
  openGraph: {
    title: "Larnova: A Driver of Innovation",
    description:
      "Larnova challenges the status quo to build what doesn't yet exist by turning audacious zero to one ideas into technology that moves the world forward, from Africa to everyone.",
    images:
      "https://larnova.co/_next/image?url=%2Fimages%2Fhome-bg-wb.png&w=640&q=75",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fustat.className} antialiased`} suppressHydrationWarning>
        <div id="modal"></div>
        {children}
      </body>
    </html>
  );
}
