// app/devices/page.tsx

import { fetchProfileData } from '@/lib/data';
import DeviceManagement from '@/components/DeviceManagement';

export default async function DevicesPage() {
  const data = await fetchProfileData();
  
  return <DeviceManagement devices={data.devices} />;
}