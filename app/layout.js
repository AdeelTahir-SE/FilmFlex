import localFont from "next/font/local";
import "./globals.css";
import Footer from "./component/Footer";
import Head from "next/head";
import Navbar from "./component/navbar";
import Sessionwrapper from "./component/Sessionwrapper";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <Sessionwrapper>
    <html lang="en">
      <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Creepster&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
              <Navbar/>

        {children}
        <Footer/>
      </body>
    </html>
    </Sessionwrapper>
  );
}
