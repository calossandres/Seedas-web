//layout.server.js
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import "mapbox-gl/dist/mapbox-gl.css";

const interFont = Inter({ subsets: ["latin"] });
const montserratFont = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "seedas.com",
  description: "seedas page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={interFont.className}>
        {children} 
      </body>
    </html>
  );
}
