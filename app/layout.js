
import RootLayout from "./layout.server";
import ClientLayout from "./layout.client";

export default function LayoutWrapper({ children }) {
  return (
    <RootLayout>
      <ClientLayout>{children}</ClientLayout>
    </RootLayout>
  );
}