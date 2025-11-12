// lib/data.ts

import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { prisma } from './prisma';
import { redirect } from 'next/navigation';

export type InitialDashboardData = {
    // We will pass simplified structures to the client
    device: { id: string, name: string, location_lat: number, technology: string, system_size_kw: number };
    latestReading: {
        active_power_p: number,
        voltage: number,
        current: number,
        power_factor: number,
        timestamp: Date,
    } | null;
    historicalData: { time: string, power: number }[];
    monthlyData: { month: string, energy: number }[];
};

// --- CORE SERVER DATA FUNCTION ---
export async function fetchDashboardData(): Promise<InitialDashboardData> {
  // 1. Authentication Check
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    redirect('/login');
  }

  // 2. Fetch User's Devices (assuming a user has devices)
  const devices = await prisma.device.findMany({
    where: { user_id: userId },
    select: { id: true, name: true, location_lat: true, technology: true, system_size_kw: true },
    take: 1, // Focus on the first device for the dashboard simplicity
  });

  if (devices.length === 0) {
    // Handle case where user has no devices linked
    return {
        device: { id: 'N/A', name: 'No Device', location_lat: 0, technology: 'N/A', system_size_kw: 0 },
        latestReading: null,
        historicalData: [],
        monthlyData: [],
    };
  }

  const device = devices[0];
  const deviceId = device.id;

  // 3. Fetch Latest Reading (for the main tiles)
  const latestReading = await prisma.energyReading.findFirst({
    where: { device_id: deviceId },
    orderBy: { timestamp: 'desc' },
    select: { active_power_p: true, voltage: true, current: true, power_factor: true, timestamp: true },
  });

  // 4. Fetch Historical Data (replace static demo data with actual data)
  // For production, use DB aggregation functions. For this example, we mock the format.
  const historicalData = [
    { time: '06:00', power: 1.2 },
    { time: '08:00', power: 2.8 },
    // ... actual data fetched from DB ...
  ];
  
  const monthlyData = [
    { month: 'Jan', energy: 320 },
    { month: 'Feb', energy: 380 },
    // ... actual data fetched from DB ...
  ];


  return {
    device,
    latestReading,
    historicalData,
    monthlyData
  };
}

export async function fetchProfileData() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    redirect('/login');
  }

  // Fetch the user details and their associated devices
  const userWithDevices = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      email: true,
      devices: {
        select: {
          id: true,
          name: true,
          technology: true, // e.g., Solar, wind etc
          system_size_kw: true, // System size
          location_lat: true,
          location_lon: true,
        },
      },
    },
  });

  if (!userWithDevices) {
    // This should ideally not happen if a session exists
    redirect('/login');
  }

  return userWithDevices;
}