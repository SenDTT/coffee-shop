import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReduxProvider from "../store/ReduxProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="mdl-js">
      <body className="antialiased" cz-shortcut-listen="false">
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
