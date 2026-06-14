import ProtectedLayout from "@/components/dashboard/ProtectedLayout";

export const metadata = {
  title: "Seller Portal | DairyConnect",
};

export default function SellerLayout({ children }) {
  return <ProtectedLayout role="seller">{children}</ProtectedLayout>;
}
