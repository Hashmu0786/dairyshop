import ProtectedLayout from "@/components/dashboard/ProtectedLayout";

export const metadata = {
  title: "Admin Panel | DairyShop",
};

export default function AdminLayout({ children }) {
  return <ProtectedLayout role="admin">{children}</ProtectedLayout>;
}
