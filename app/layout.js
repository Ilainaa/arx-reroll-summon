import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Anime Ranger X | Test Reroll", // เปลี่ยนชื่อเว็บตรงนี้
  description: "Test Reroll feature for Anime Ranger X", // สามารถเปลี่ยนคำอธิบายเว็บได้ด้วย (optional)
  icons: {
    icon: '/picture/logo_arx.png', // ระบุ path ไปยัง icon ของคุณ (ต้องอยู่ใน public folder)
    // apple: '/apple-icon.png', // ตัวอย่างเพิ่มเติมสำหรับ apple touch icon (optional)
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
