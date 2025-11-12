// components/DeviceManagement.tsx
'use client';

import { useState } from 'react';
import { 
  Zap, 
  Plus, 
  MapPin, 
  Power, 
  Edit2, 
  Trash2, 
  Search,
  Filter,
  Sun,
  Wind,
  Battery,
  Activity,
  Calendar,
  TrendingUp
} from 'lucide-react';

const BRAND_COLORS = {
  DARK_BLUE: '#000B3C',
  UMEME_BLUE: '#1523DB',
  ULTRAMARINE_BLUE: '#3D56FF',
  CELESTIAL_BLUE: '#3C9AE9',
  GREEN: '#8ACE47',
  YELLOW: '#F8D200',
  WHITE: '#FFFFFF',
};

interface Device {
  id: number;
  name: string;
  technology: string;
  system_size_kw: number;
  location_lat: number;
  location_lng: number;
  installation_date?: string;
  last_reading?: string;
  status?: 'active' | 'inactive' | 'maintenance';
}

const getTechnologyIcon = (technology: string) => {
  const tech = technology.toLowerCase();
  if (tech.includes('solar')) return Sun;
  if (tech.includes('wind')) return Wind;
  if (tech.includes('battery')) return Battery;
  return Zap;
};

const getStatusColor = (status?: string) => {
  switch (status) {
    case 'active': return BRAND_COLORS.GREEN;
    case 'inactive': return `${BRAND_COLORS.DARK_BLUE}60`;
    case 'maintenance': return BRAND_COLORS.YELLOW;
    default: return BRAND_COLORS.GREEN;
  }
};

export default function DeviceManagement({ devices: initialDevices }: { devices: Device[] }) {
  const [devices, setDevices] = useState(initialDevices.map(d => ({
    ...d,
    status: 'active' as const,
    installation_date: '2024-06-15',
    last_reading: new Date().toISOString()
  })));
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTechnology, setFilterTechnology] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  // Filter devices
  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         device.technology.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterTechnology === 'all' || device.technology === filterTechnology;
    return matchesSearch && matchesFilter;
  });

  // Get unique technologies
  const technologies = ['all', ...Array.from(new Set(devices.map(d => d.technology)))];

  // Calculate statistics
  const totalCapacity = devices.reduce((sum, d) => sum + d.system_size_kw, 0);
  const activeDevices = devices.filter(d => d.status === 'active').length;
  const maintenanceDevices = devices.filter(d => d.status === 'maintenance').length;

  const DeviceCard = ({ device }: { device: Device }) => {
    const Icon = getTechnologyIcon(device.technology);
    
    return (
      <div 
        className="p-6 rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer"
        style={{
          backgroundColor: BRAND_COLORS.WHITE,
          border: `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}20`
        }}
        onClick={() => setSelectedDevice(device)}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${BRAND_COLORS.YELLOW}, ${BRAND_COLORS.GREEN})`
              }}
            >
              <Icon className="text-white" size={24} />
            </div>
            <div>
              <h3 
                className="text-lg font-bold"
                style={{ color: BRAND_COLORS.DARK_BLUE }}
              >
                {device.name}
              </h3>
              <p 
                className="text-xs font-mono"
                style={{ color: `${BRAND_COLORS.DARK_BLUE}60` }}
              >
                ID: {device.id}
              </p>
            </div>
          </div>
          <span 
            className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: `${getStatusColor(device.status)}20`,
              color: getStatusColor(device.status)
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            <span className="capitalize">{device.status || 'active'}</span>
          </span>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p 
              className="text-xs font-medium mb-1"
              style={{ color: `${BRAND_COLORS.DARK_BLUE}60` }}
            >
              Technology
            </p>
            <p 
              className="text-sm font-semibold"
              style={{ color: BRAND_COLORS.DARK_BLUE }}
            >
              {device.technology}
            </p>
          </div>
          <div>
            <p 
              className="text-xs font-medium mb-1"
              style={{ color: `${BRAND_COLORS.DARK_BLUE}60` }}
            >
              Capacity
            </p>
            <p 
              className="text-sm font-semibold"
              style={{ color: BRAND_COLORS.GREEN }}
            >
              {device.system_size_kw.toFixed(1)} kW
            </p>
          </div>
          <div>
            <p 
              className="text-xs font-medium mb-1"
              style={{ color: `${BRAND_COLORS.DARK_BLUE}60` }}
            >
              Location
            </p>
            <div className="flex items-center space-x-1">
              <MapPin 
                size={12} 
                style={{ color: BRAND_COLORS.CELESTIAL_BLUE }} 
              />
              <p 
                className="text-sm font-semibold"
                style={{ color: BRAND_COLORS.DARK_BLUE }}
              >
                {device.location_lat.toFixed(2)}°
              </p>
            </div>
          </div>
          <div>
            <p 
              className="text-xs font-medium mb-1"
              style={{ color: `${BRAND_COLORS.DARK_BLUE}60` }}
            >
              Last Reading
            </p>
            <p 
              className="text-sm font-semibold"
              style={{ color: BRAND_COLORS.DARK_BLUE }}
            >
              {device.last_reading ? new Date(device.last_reading).toLocaleTimeString() : 'N/A'}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div 
          className="pt-4 flex space-x-2"
          style={{ borderTop: `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}20` }}
        >
          <button
            className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-80"
            style={{
              backgroundColor: `${BRAND_COLORS.CELESTIAL_BLUE}10`,
              color: BRAND_COLORS.CELESTIAL_BLUE
            }}
          >
            <Activity size={16} />
            <span>View Data</span>
          </button>
          <button
            className="flex items-center justify-center px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-80"
            style={{
              backgroundColor: `${BRAND_COLORS.DARK_BLUE}05`,
              color: BRAND_COLORS.DARK_BLUE
            }}
          >
            <Edit2 size={16} />
          </button>
          <button
            className="flex items-center justify-center px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-80"
            style={{
              backgroundColor: `${BRAND_COLORS.DARK_BLUE}05`,
              color: '#DC2626'
            }}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    );
  };

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
                Device Management
              </h1>
              <p 
                className="text-lg"
                style={{ color: `${BRAND_COLORS.DARK_BLUE}80` }}
              >
                Monitor and manage your energy devices
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:opacity-90 shadow-lg"
              style={{
                backgroundColor: BRAND_COLORS.GREEN,
                color: BRAND_COLORS.WHITE
              }}
            >
              <Plus size={20} />
              <span>Add Device</span>
            </button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div 
              className="p-6 rounded-xl"
              style={{
                backgroundColor: BRAND_COLORS.WHITE,
                border: `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}20`
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <p 
                  className="text-sm font-medium"
                  style={{ color: `${BRAND_COLORS.DARK_BLUE}80` }}
                >
                  Total Devices
                </p>
                <Zap style={{ color: BRAND_COLORS.CELESTIAL_BLUE }} size={20} />
              </div>
              <p 
                className="text-3xl font-bold"
                style={{ color: BRAND_COLORS.DARK_BLUE }}
              >
                {devices.length}
              </p>
            </div>

            <div 
              className="p-6 rounded-xl"
              style={{
                backgroundColor: BRAND_COLORS.WHITE,
                border: `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}20`
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <p 
                  className="text-sm font-medium"
                  style={{ color: `${BRAND_COLORS.DARK_BLUE}80` }}
                >
                  Active Devices
                </p>
                <Power style={{ color: BRAND_COLORS.GREEN }} size={20} />
              </div>
              <p 
                className="text-3xl font-bold"
                style={{ color: BRAND_COLORS.GREEN }}
              >
                {activeDevices}
              </p>
            </div>

            <div 
              className="p-6 rounded-xl"
              style={{
                backgroundColor: BRAND_COLORS.WHITE,
                border: `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}20`
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <p 
                  className="text-sm font-medium"
                  style={{ color: `${BRAND_COLORS.DARK_BLUE}80` }}
                >
                  Total Capacity
                </p>
                <TrendingUp style={{ color: BRAND_COLORS.YELLOW }} size={20} />
              </div>
              <p 
                className="text-3xl font-bold"
                style={{ color: BRAND_COLORS.DARK_BLUE }}
              >
                {totalCapacity.toFixed(1)} kW
              </p>
            </div>

            <div 
              className="p-6 rounded-xl"
              style={{
                backgroundColor: BRAND_COLORS.WHITE,
                border: `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}20`
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <p 
                  className="text-sm font-medium"
                  style={{ color: `${BRAND_COLORS.DARK_BLUE}80` }}
                >
                  Maintenance
                </p>
                <Activity style={{ color: BRAND_COLORS.YELLOW }} size={20} />
              </div>
              <p 
                className="text-3xl font-bold"
                style={{ color: BRAND_COLORS.YELLOW }}
              >
                {maintenanceDevices}
              </p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search 
                className="absolute left-4 top-1/2 transform -translate-y-1/2"
                size={20}
                style={{ color: `${BRAND_COLORS.DARK_BLUE}60` }}
              />
              <input
                type="text"
                placeholder="Search devices by name or technology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: BRAND_COLORS.WHITE,
                  border: `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}20`,
                  color: BRAND_COLORS.DARK_BLUE,
                  fontFamily: 'DM Sans, sans-serif'
                }}
              />
            </div>

            <div className="relative">
              <Filter 
                className="absolute left-4 top-1/2 transform -translate-y-1/2"
                size={20}
                style={{ color: `${BRAND_COLORS.DARK_BLUE}60` }}
              />
              <select
                value={filterTechnology}
                onChange={(e) => setFilterTechnology(e.target.value)}
                className="pl-12 pr-8 py-3 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 appearance-none cursor-pointer"
                style={{
                  backgroundColor: BRAND_COLORS.WHITE,
                  border: `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}20`,
                  color: BRAND_COLORS.DARK_BLUE,
                  fontFamily: 'DM Sans, sans-serif',
                  minWidth: '200px'
                }}
              >
                {technologies.map(tech => (
                  <option key={tech} value={tech}>
                    {tech === 'all' ? 'All Technologies' : tech}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Devices Grid */}
        {filteredDevices.length === 0 ? (
          <div 
            className="text-center py-20 rounded-xl"
            style={{ 
              backgroundColor: BRAND_COLORS.WHITE,
              border: `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}20`
            }}
          >
            <Zap 
              size={64} 
              style={{ 
                color: `${BRAND_COLORS.DARK_BLUE}20`,
                margin: '0 auto 24px'
              }} 
            />
            <h3 
              className="text-2xl font-bold mb-4"
              style={{ color: BRAND_COLORS.DARK_BLUE }}
            >
              {devices.length === 0 ? 'No devices yet' : 'No devices found'}
            </h3>
            <p 
              className="text-lg mb-6"
              style={{ color: `${BRAND_COLORS.DARK_BLUE}60` }}
            >
              {devices.length === 0 
                ? 'Add your first energy monitoring device to get started'
                : 'Try adjusting your search or filter criteria'}
            </p>
            {devices.length === 0 && (
              <button
                onClick={() => setShowAddModal(true)}
                className="px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90"
                style={{
                  backgroundColor: BRAND_COLORS.YELLOW,
                  color: BRAND_COLORS.DARK_BLUE
                }}
              >
                Add Your First Device
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDevices.map(device => (
              <DeviceCard key={device.id} device={device} />
            ))}
          </div>
        )}

        {/* Add Device Modal Placeholder */}
        {showAddModal && (
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddModal(false)}
          >
            <div 
              className="max-w-md w-full p-6 rounded-xl"
              style={{
                backgroundColor: BRAND_COLORS.WHITE
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 
                className="text-2xl font-bold mb-4"
                style={{ color: BRAND_COLORS.DARK_BLUE }}
              >
                Add New Device
              </h2>
              <p 
                className="mb-6"
                style={{ color: `${BRAND_COLORS.DARK_BLUE}80` }}
              >
                Device registration form would go here
              </p>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-full py-3 rounded-lg font-semibold"
                style={{
                  backgroundColor: BRAND_COLORS.CELESTIAL_BLUE,
                  color: BRAND_COLORS.WHITE
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}