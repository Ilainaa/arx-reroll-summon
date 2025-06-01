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
    icon: [
      { url: '/picture/favicon.ico', type: 'image/x-icon', sizes: 'any' }, // แนะนำให้มีไฟล์ favicon.ico ใน public/
      { url: '/picture/icon_logo_arx.png', type: 'image/png', sizes: 'any' }, // ใช้ path เดิมของคุณ
    ],
    apple: '/apple-touch-icon.png', // หากคุณมี apple-touch-icon.png ใน public/
  },
  openGraph: {
    title: 'Anime Ranger X | Test Reroll', // ชื่อที่จะแสดงพร้อมลิงก์ (ควรตรงกับ title หลัก)
    description: 'Test Reroll feature for Anime Ranger X', // คำอธิบายสั้นๆ
    images: [
      {
        // แนะนำให้ใช้ URL เต็มสำหรับ Open Graph images
        url: '/picture/logo_arx.png',
        width: 800, // (Optional) ความกว้างของรูปภาพ
        height: 600, // (Optional) ความสูงของรูปภาพ
        alt: 'Anime Ranger X | Test Reroll', // (Optional) คำอธิบายรูปภาพ
      },
      // คุณสามารถเพิ่มรูปภาพอื่นๆ ได้อีกถ้าต้องการให้มีหลายขนาดหรือหลายตัวเลือก
      // {
      //   url: '/path/to/another-image.jpg',
      //   width: 900,
      //   height: 800,
      //   alt: 'Another Image Alt',
      // },
    ],
    // type: 'website', // (Optional) ประเภทของเนื้อหา
    // url: 'https://yourwebsite.com', // (Optional) URL หลักของเว็บคุณ
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
