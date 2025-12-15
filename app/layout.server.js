//layout.server.js
import "./globals.css";
import "mapbox-gl/dist/mapbox-gl.css";



export const metadata = {
  title: "seedas.com",
  description: "seedas page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children} 
      </body>
    </html>
  );
}
