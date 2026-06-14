import ProtectedLayout from "@/components/dashboard/ProtectedLayout";

export const metadata = {
  title: "Seller Portal | DairyShop",
};

export default function SellerLayout({ children }) {
  return <ProtectedLayout role="seller">{children}</ProtectedLayout>;
}
