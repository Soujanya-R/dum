import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css"; // Ensure global styles are imported

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Flight Booking",
  description: "Book flights easily with the best deals",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          background: "linear-gradient(135deg, #bbe1f2, #d4e6f1)", // Gradient background
          backgroundAttachment: "fixed", // Fixed background for scrolling effect
          color: "black",
          minHeight: "100vh", // Full height for body
        }}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
