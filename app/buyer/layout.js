import ProtectedLayout from "@/components/dashboard/ProtectedLayout";

export const metadata = {
  title: "Buyer Portal | DairyConnect",
};

export default function BuyerLayout({ children }) {
  return <ProtectedLayout role="buyer">{children}</ProtectedLayout>;
}
