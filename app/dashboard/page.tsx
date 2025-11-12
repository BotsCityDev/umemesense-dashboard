// app/dashboard/page.tsx
import { fetchDashboardData } from '@/lib/data';
import DashboardUI from '@/components/DashboardUI';

export default async function DashboardPage() {
  // This call is protected and redirects to /login if unauthenticated
  const dashboardData = await fetchDashboardData();

  // The server component fetches the static/initial data, and passes it to the client component
  return (
    <DashboardUI initialData={dashboardData} />
  );
}