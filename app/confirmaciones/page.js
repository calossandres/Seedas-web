import dynamic from "next/dynamic";

// Evita problemas con SSR y Clerk
const TransporterConfirmRequests = dynamic(
  () => import("../../components/TransporterConfirmRequests"),
  { ssr: false }
);

export default function ConfirmacionesPage() {
  return <TransporterConfirmRequests />;
}
