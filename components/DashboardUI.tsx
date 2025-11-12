// components/DashboardUI.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Battery, Sun, Zap, Cloud, CloudRain, TrendingUp, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { InitialDashboardData } from '@/lib/data';

// Brand Colors from Guidelines
const BRAND_COLORS = {
  DARK_BLUE: '#000B3C',
  UMEME_BLUE: '#1523DB',
  ULTRAMARINE_BLUE: '#3D56FF',
  CELESTIAL_BLUE: '#3C9AE9',
  GREEN: '#8ACE47',
  YELLOW: '#F8D200',
  WHITE: '#FFFFFF',
};

type EnergyReading = InitialDashboardData['latestReading'];

const Card = ({ 
  children, 
  className = '',
  highlight = false 
}: { 
  children: React.ReactNode; 
  className?: string;
  highlight?: boolean;
}) => (
  <div 
    className={`p-6 rounded-xl transition-all duration-300 hover:shadow-lg ${className}`}
    style={{
      backgroundColor: BRAND_COLORS.WHITE,
      border: highlight 
        ? `2px solid ${BRAND_COLORS.YELLOW}` 
        : `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}20`,
      boxShadow: highlight 
        ? `0 4px 20px ${BRAND_COLORS.YELLOW}30`
        : '0 1px 3px rgba(0, 0, 0, 0.1)',
      fontFamily: 'DM Sans, sans-serif'
    }}
  >
    {children}
  </div>
);

const MetricCard = ({ 
  icon: Icon, 
  label, 
  value, 
  unit, 
  sublabel, 
  subvalue,
  iconColor = BRAND_COLORS.CELESTIAL_BLUE
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  unit?: string;
  sublabel?: string;
  subvalue?: string;
  iconColor?: string;
}) => (
  <Card>
    <div className="flex items-start justify-between mb-3">
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-2">
          <Icon size={20} style={{ color: iconColor }} />
          <p className="text-sm font-medium" style={{ color: `${BRAND_COLORS.DARK_BLUE}80` }}>
            {label}
          </p>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-4xl font-bold" style={{ color: BRAND_COLORS.DARK_BLUE }}>
            {value}
          </span>
          {unit && (
            <span className="text-xl font-medium" style={{ color: `${BRAND_COLORS.DARK_BLUE}60` }}>
              {unit}
            </span>
          )}
        </div>
      </div>
    </div>
    {sublabel && (
      <div className="flex justify-between items-center mt-3 pt-3" style={{ borderTop: `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}20` }}>
        <span className="text-xs font-medium" style={{ color: `${BRAND_COLORS.DARK_BLUE}60` }}>
          {sublabel}
        </span>
        <span className="text-sm font-semibold" style={{ color: BRAND_COLORS.GREEN }}>
          {subvalue}
        </span>
      </div>
    )}
  </Card>
);

export default function DashboardUI({ initialData }: { initialData: InitialDashboardData }) {
  const [currentReading, setCurrentReading] = useState<EnergyReading>(initialData.latestReading);
  
  const activePowerP = currentReading?.active_power_p || 0;
  const batteryLevel = 78;
  const efficiency = currentReading?.power_factor ? currentReading.power_factor * 100 * 1.05 : 94.3;
  const weatherCondition = activePowerP > 4.5 ? 'sunny' : activePowerP > 2.5 ? 'partly-cloudy' : 'cloudy';

  useEffect(() => {
    const fetchRealtimeData = async () => {
      setCurrentReading(prev => ({
        active_power_p: Math.max(0, Math.min(6, (prev?.active_power_p || 4.8) + (Math.random() - 0.5) * 0.3)),
        voltage: 240 + (Math.random() - 0.5) * 5,
        current: (prev?.active_power_p || 4.8) / 240 * 1000,
        power_factor: 0.9 + (Math.random() - 0.5) * 0.05,
        timestamp: new Date(),
      }));
    };

    const interval = setInterval(fetchRealtimeData, 3000);
    return () => clearInterval(interval);
  }, []);

  const { historicalData, monthlyData, device } = initialData;

  return (
    <div 
      className="min-h-screen p-6"
      style={{ 
        backgroundColor: `${BRAND_COLORS.CELESTIAL_BLUE}05`,
        fontFamily: 'DM Sans, sans-serif'
      }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 
                className="text-4xl font-bold mb-2"
                style={{ color: BRAND_COLORS.DARK_BLUE }}
              >
                Energy Dashboard
              </h1>
              <div className="flex items-center space-x-2">
                <div 
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: BRAND_COLORS.GREEN }}
                />
                <span 
                  className="text-sm font-semibold"
                  style={{ color: BRAND_COLORS.GREEN }}
                >
                  System Online: {device.name}
                </span>
              </div>
            </div>
            
            {/* Weather Widget */}
            <div 
              className="flex items-center space-x-3 px-4 py-3 rounded-xl"
              style={{ 
                backgroundColor: BRAND_COLORS.WHITE,
                border: `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}20`
              }}
            >
              {weatherCondition === 'sunny' && <Sun style={{ color: BRAND_COLORS.YELLOW }} size={28} />}
              {weatherCondition === 'partly-cloudy' && <Cloud style={{ color: BRAND_COLORS.CELESTIAL_BLUE }} size={28} />}
              {weatherCondition === 'cloudy' && <CloudRain style={{ color: BRAND_COLORS.CELESTIAL_BLUE }} size={28} />}
              <div>
                <p className="text-xs font-medium" style={{ color: `${BRAND_COLORS.DARK_BLUE}60` }}>
                  Weather
                </p>
                <p className="text-sm font-semibold capitalize" style={{ color: BRAND_COLORS.DARK_BLUE }}>
                  {weatherCondition.replace('-', ' ')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Left Column - Key Metrics */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            
            {/* Current Power - Highlighted */}
            <Card highlight>
              <div className="flex items-center space-x-2 mb-3">
                <Zap style={{ color: BRAND_COLORS.YELLOW }} size={24} />
                <p className="text-sm font-semibold" style={{ color: BRAND_COLORS.DARK_BLUE }}>
                  Active Power (P)
                </p>
              </div>
              <div className="flex items-baseline space-x-2 mb-4">
                <span className="text-5xl font-bold" style={{ color: BRAND_COLORS.DARK_BLUE }}>
                  {activePowerP.toFixed(1)}
                </span>
                <span className="text-2xl font-medium" style={{ color: `${BRAND_COLORS.DARK_BLUE}60` }}>
                  kW
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: `${BRAND_COLORS.DARK_BLUE}80` }}>Voltage</span>
                  <span className="text-sm font-semibold" style={{ color: BRAND_COLORS.GREEN }}>
                    {currentReading?.voltage.toFixed(1) || 'N/A'}V
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: `${BRAND_COLORS.DARK_BLUE}80` }}>Current</span>
                  <span className="text-sm font-semibold" style={{ color: BRAND_COLORS.CELESTIAL_BLUE }}>
                    {currentReading?.current.toFixed(2) || 'N/A'}A
                  </span>
                </div>
              </div>
            </Card>

            {/* Power Factor */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <p className="text-sm font-medium mb-2" style={{ color: `${BRAND_COLORS.DARK_BLUE}80` }}>
                    Power Factor (PF)
                  </p>
                  <p className="text-3xl font-bold" style={{ color: BRAND_COLORS.DARK_BLUE }}>
                    {currentReading?.power_factor.toFixed(2) || 'N/A'}
                  </p>
                </div>
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(135deg, ${BRAND_COLORS.GREEN}, ${BRAND_COLORS.CELESTIAL_BLUE})`
                  }}
                >
                  <Activity className="text-white" size={28} />
                </div>
              </div>
              <div 
                className="pt-3"
                style={{ borderTop: `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}20` }}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium" style={{ color: `${BRAND_COLORS.DARK_BLUE}60` }}>
                    System Efficiency
                  </span>
                  <span className="text-sm font-bold" style={{ color: BRAND_COLORS.GREEN }}>
                    {efficiency.toFixed(1)}%
                  </span>
                </div>
              </div>
            </Card>

            {/* Device Info */}
            <Card>
              <h3 
                className="text-lg font-bold mb-4"
                style={{ color: BRAND_COLORS.DARK_BLUE }}
              >
                Device Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: `${BRAND_COLORS.DARK_BLUE}80` }}>
                    Technology
                  </span>
                  <span className="text-sm font-semibold" style={{ color: BRAND_COLORS.DARK_BLUE }}>
                    {device.technology}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: `${BRAND_COLORS.DARK_BLUE}80` }}>
                    System Size
                  </span>
                  <span className="text-sm font-semibold" style={{ color: BRAND_COLORS.DARK_BLUE }}>
                    {device.system_size_kw.toFixed(1)} kW
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: `${BRAND_COLORS.DARK_BLUE}80` }}>
                    Location
                  </span>
                  <span className="text-sm font-semibold" style={{ color: BRAND_COLORS.DARK_BLUE }}>
                    {device.location_lat.toFixed(4)}°
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: `${BRAND_COLORS.DARK_BLUE}80` }}>
                    Last Update
                  </span>
                  <span className="text-sm font-semibold" style={{ color: BRAND_COLORS.GREEN }}>
                    {currentReading?.timestamp.toLocaleTimeString() || 'N/A'}
                  </span>
                </div>
              </div>
            </Card>

          </div>

          {/* Middle Column - Charts */}
          <div className="col-span-12 lg:col-span-6 space-y-6">
            
            {/* Today's Power Generation */}
            <Card className="h-[400px]">
              <h3 
                className="text-lg font-bold mb-4"
                style={{ color: BRAND_COLORS.DARK_BLUE }}
              >
                Today's Power Generation
              </h3>
              <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={historicalData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={BRAND_COLORS.CELESTIAL_BLUE} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={BRAND_COLORS.CELESTIAL_BLUE} stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={`${BRAND_COLORS.CELESTIAL_BLUE}20`} />
                  <XAxis 
                    dataKey="time" 
                    stroke={`${BRAND_COLORS.DARK_BLUE}80`}
                    style={{ fontSize: '12px', fontFamily: 'DM Sans, sans-serif' }}
                  />
                  <YAxis 
                    stroke={`${BRAND_COLORS.DARK_BLUE}80`}
                    style={{ fontSize: '12px', fontFamily: 'DM Sans, sans-serif' }}
                    label={{ 
                      value: 'kW', 
                      angle: -90, 
                      position: 'insideLeft', 
                      style: { fill: `${BRAND_COLORS.DARK_BLUE}80`, fontFamily: 'DM Sans, sans-serif' }
                    }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: BRAND_COLORS.WHITE,
                      border: `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}30`,
                      borderRadius: '8px',
                      fontFamily: 'DM Sans, sans-serif'
                    }}
                    labelStyle={{ color: BRAND_COLORS.DARK_BLUE, fontWeight: 'bold' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="power" 
                    stroke={BRAND_COLORS.CELESTIAL_BLUE}
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorPower)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Monthly Energy Production */}
            <Card className="h-[400px]">
              <h3 
                className="text-lg font-bold mb-4"
                style={{ color: BRAND_COLORS.DARK_BLUE }}
              >
                Monthly Energy Production
              </h3>
              <ResponsiveContainer width="100%" height="85%">
                <BarChart data={monthlyData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={`${BRAND_COLORS.CELESTIAL_BLUE}20`} />
                  <XAxis 
                    dataKey="month" 
                    stroke={`${BRAND_COLORS.DARK_BLUE}80`}
                    style={{ fontSize: '12px', fontFamily: 'DM Sans, sans-serif' }}
                  />
                  <YAxis 
                    stroke={`${BRAND_COLORS.DARK_BLUE}80`}
                    style={{ fontSize: '12px', fontFamily: 'DM Sans, sans-serif' }}
                    label={{ 
                      value: 'kWh', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { fill: `${BRAND_COLORS.DARK_BLUE}80`, fontFamily: 'DM Sans, sans-serif' }
                    }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: BRAND_COLORS.WHITE,
                      border: `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}30`,
                      borderRadius: '8px',
                      fontFamily: 'DM Sans, sans-serif'
                    }}
                    labelStyle={{ color: BRAND_COLORS.DARK_BLUE, fontWeight: 'bold' }}
                  />
                  <Bar 
                    dataKey="energy" 
                    fill={BRAND_COLORS.GREEN}
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>

          </div>

          {/* Right Column - Battery & Impact */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            
            {/* Battery Status */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 
                  className="text-lg font-bold"
                  style={{ color: BRAND_COLORS.DARK_BLUE }}
                >
                  Battery Storage
                </h3>
                <Battery style={{ color: BRAND_COLORS.GREEN }} size={24} />
              </div>
              
              <div 
                className="relative h-48 rounded-xl overflow-hidden mb-4"
                style={{ 
                  backgroundColor: `${BRAND_COLORS.CELESTIAL_BLUE}10`,
                  border: `2px solid ${BRAND_COLORS.CELESTIAL_BLUE}30`
                }}
              >
                <div 
                  className="absolute bottom-0 left-0 right-0 transition-all duration-1000"
                  style={{ 
                    background: `linear-gradient(to top, ${BRAND_COLORS.GREEN}, ${BRAND_COLORS.CELESTIAL_BLUE})`,
                    height: `${batteryLevel}%`
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span 
                    className="text-5xl font-bold"
                    style={{ 
                      color: BRAND_COLORS.DARK_BLUE,
                      textShadow: '0 2px 10px rgba(255, 255, 255, 0.8)'
                    }}
                  >
                    {batteryLevel}%
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: `${BRAND_COLORS.DARK_BLUE}80` }}>
                    Capacity
                  </span>
                  <span className="text-sm font-semibold" style={{ color: BRAND_COLORS.DARK_BLUE }}>
                    50 kWh
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: `${BRAND_COLORS.DARK_BLUE}80` }}>
                    Stored
                  </span>
                  <span className="text-sm font-semibold" style={{ color: BRAND_COLORS.GREEN }}>
                    {(50 * batteryLevel / 100).toFixed(1)} kWh
                  </span>
                </div>
              </div>
            </Card>

            {/* Today's Impact */}
            <Card>
              <h3 
                className="text-lg font-bold mb-4"
                style={{ color: BRAND_COLORS.DARK_BLUE }}
              >
                Today's Impact
              </h3>
              <div className="space-y-3">
                <div 
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: `${BRAND_COLORS.YELLOW}15` }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xl">☀️</span>
                    <p className="text-xs font-medium" style={{ color: `${BRAND_COLORS.DARK_BLUE}80` }}>
                      Energy Generated
                    </p>
                  </div>
                  <p className="text-2xl font-bold" style={{ color: BRAND_COLORS.DARK_BLUE }}>
                    87.4 kWh
                  </p>
                </div>

                <div 
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: `${BRAND_COLORS.GREEN}15` }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xl">⚡</span>
                    <p className="text-xs font-medium" style={{ color: `${BRAND_COLORS.DARK_BLUE}80` }}>
                      RECs Earned
                    </p>
                  </div>
                  <p className="text-2xl font-bold" style={{ color: BRAND_COLORS.DARK_BLUE }}>
                    34.4 RECs
                  </p>
                </div>
                
                <div 
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: `${BRAND_COLORS.CELESTIAL_BLUE}15` }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xl">🌱</span>
                    <p className="text-xs font-medium" style={{ color: `${BRAND_COLORS.DARK_BLUE}80` }}>
                      CO₂ Avoided
                    </p>
                  </div>
                  <p className="text-2xl font-bold" style={{ color: BRAND_COLORS.DARK_BLUE }}>
                    54.6 kg
                  </p>
                </div>
              </div>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}