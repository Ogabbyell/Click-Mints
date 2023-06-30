// import { Html, Head, Main, NextScript } from 'next/document'
import Navbar from "../components/navbar";

export default function RootLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
