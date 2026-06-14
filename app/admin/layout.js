import ProtectedLayout from "@/components/dashboard/ProtectedLayout";

export const metadata = {
  title: "Admin Panel | DairyConnect",
};

export default function AdminLayout({ children }) {
  return <ProtectedLayout role="admin">{children}</ProtectedLayout>;
}
