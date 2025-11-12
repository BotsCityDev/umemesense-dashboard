// app/profile/page.tsx

import { fetchProfileData } from '@/lib/data';
import ProfileEditForm from '@/components/ProfileEditForm';
import SignOutButton from '@/components/auth/SignOutButton';
import { MapPin, Zap, User, Mail, Calendar, Shield } from 'lucide-react';

const BRAND_COLORS = {
  DARK_BLUE: '#000B3C',
  UMEME_BLUE: '#1523DB',
  ULTRAMARINE_BLUE: '#3D56FF',
  CELESTIAL_BLUE: '#3C9AE9',
  GREEN: '#8ACE47',
  YELLOW: '#F8D200',
  WHITE: '#FFFFFF',
};

export default async function ProfilePage() {
  const data = await fetchProfileData();
  
  return (
    <div 
      className="min-h-screen p-6"
      style={{ 
        backgroundColor: `${BRAND_COLORS.CELESTIAL_BLUE}05`,
        fontFamily: 'DM Sans, sans-serif'
      }}
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 
            className="text-4xl font-bold mb-2"
            style={{ color: BRAND_COLORS.DARK_BLUE }}
          >
            Account Settings
          </h1>
          <p 
            className="text-lg"
            style={{ color: `${BRAND_COLORS.DARK_BLUE}80` }}
          >
            Manage your profile and connected devices
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Profile Summary */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Profile Card */}
            <div 
              className="p-6 rounded-xl"
              style={{
                backgroundColor: BRAND_COLORS.WHITE,
                border: `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}20`
              }}
            >
              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <div 
                  className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${BRAND_COLORS.YELLOW}, ${BRAND_COLORS.GREEN})`,
                    color: BRAND_COLORS.WHITE
                  }}
                >
                  {data.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>

              <div className="text-center mb-6">
                <h2 
                  className="text-2xl font-bold mb-1"
                  style={{ color: BRAND_COLORS.DARK_BLUE }}
                >
                  {data.name}
                </h2>
                <p 
                  className="text-sm"
                  style={{ color: `${BRAND_COLORS.DARK_BLUE}60` }}
                >
                  @{data.name?.toLowerCase().replace(/\s+/g, '') || 'username'}
                </p>
              </div>

              {/* Quick Stats */}
              <div 
                className="pt-4"
                style={{ borderTop: `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}20` }}
              >
                <div className="flex justify-between items-center mb-3">
                  <span 
                    className="text-sm"
                    style={{ color: `${BRAND_COLORS.DARK_BLUE}80` }}
                  >
                    Devices
                  </span>
                  <span 
                    className="text-lg font-bold"
                    style={{ color: BRAND_COLORS.GREEN }}
                  >
                    {data.devices.length}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span 
                    className="text-sm"
                    style={{ color: `${BRAND_COLORS.DARK_BLUE}80` }}
                  >
                    Account Status
                  </span>
                  <span 
                    className="text-sm font-semibold px-3 py-1 rounded-full"
                    style={{ 
                      backgroundColor: `${BRAND_COLORS.GREEN}20`,
                      color: BRAND_COLORS.GREEN
                    }}
                  >
                    Active
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span 
                    className="text-sm"
                    style={{ color: `${BRAND_COLORS.DARK_BLUE}80` }}
                  >
                    Member Since
                  </span>
                  <span 
                    className="text-sm font-semibold"
                    style={{ color: BRAND_COLORS.DARK_BLUE }}
                  >
                    Jan 2025
                  </span>
                </div>
              </div>

              {/* Sign Out Button */}
              <div className="mt-6">
                <SignOutButton />
              </div>
            </div>

            {/* Security Card */}
            <div 
              className="p-6 rounded-xl"
              style={{
                backgroundColor: BRAND_COLORS.WHITE,
                border: `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}20`
              }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <Shield style={{ color: BRAND_COLORS.CELESTIAL_BLUE }} size={20} />
                <h3 
                  className="text-lg font-bold"
                  style={{ color: BRAND_COLORS.DARK_BLUE }}
                >
                  Security
                </h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span style={{ color: `${BRAND_COLORS.DARK_BLUE}80` }}>
                    Two-Factor Auth
                  </span>
                  <span 
                    className="px-2 py-1 rounded text-xs font-semibold"
                    style={{ 
                      backgroundColor: `${BRAND_COLORS.YELLOW}20`,
                      color: BRAND_COLORS.YELLOW
                    }}
                  >
                    Disabled
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: `${BRAND_COLORS.DARK_BLUE}80` }}>
                    Last Password Change
                  </span>
                  <span 
                    className="text-xs font-semibold"
                    style={{ color: BRAND_COLORS.DARK_BLUE }}
                  >
                    30 days ago
                  </span>
                </div>
              </div>
              <button
                className="w-full mt-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90"
                style={{
                  backgroundColor: `${BRAND_COLORS.CELESTIAL_BLUE}10`,
                  color: BRAND_COLORS.CELESTIAL_BLUE,
                  border: `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}30`
                }}
              >
                Update Security Settings
              </button>
            </div>
          </div>

          {/* Right Column - Details & Devices */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Personal Information */}
            <div 
              className="p-6 rounded-xl"
              style={{
                backgroundColor: BRAND_COLORS.WHITE,
                border: `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}20`
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 
                  className="text-2xl font-bold"
                  style={{ color: BRAND_COLORS.DARK_BLUE }}
                >
                  Personal Information
                </h2>
              </div>

              {/* Edit Form Component */}
              <ProfileEditForm 
                initialData={{
                  name: data.name,
                  email: data.email,
                  username: data.name?.toLowerCase().replace(/\s+/g, '') || 'username',
                  phone: '+254 700 000 000',
                  location: 'Nairobi, Kenya'
                }}
              />
            </div>

            {/* Devices Section */}
            <div 
              className="p-6 rounded-xl"
              style={{
                backgroundColor: BRAND_COLORS.WHITE,
                border: `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}20`
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Zap style={{ color: BRAND_COLORS.YELLOW }} size={24} />
                  <h2 
                    className="text-2xl font-bold"
                    style={{ color: BRAND_COLORS.DARK_BLUE }}
                  >
                    Connected Devices
                  </h2>
                  <span 
                    className="px-3 py-1 rounded-full text-sm font-bold"
                    style={{
                      backgroundColor: `${BRAND_COLORS.GREEN}20`,
                      color: BRAND_COLORS.GREEN
                    }}
                  >
                    {data.devices.length}
                  </span>
                </div>
                <button
                  className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90"
                  style={{
                    backgroundColor: BRAND_COLORS.GREEN,
                    color: BRAND_COLORS.WHITE
                  }}
                >
                  + Add Device
                </button>
              </div>

              <div className="space-y-4">
                {data.devices.length === 0 ? (
                  <div 
                    className="text-center py-12 rounded-lg"
                    style={{ backgroundColor: `${BRAND_COLORS.CELESTIAL_BLUE}05` }}
                  >
                    <Zap 
                      size={48} 
                      style={{ 
                        color: `${BRAND_COLORS.DARK_BLUE}40`,
                        margin: '0 auto 16px'
                      }} 
                    />
                    <p 
                      className="text-lg font-medium mb-2"
                      style={{ color: `${BRAND_COLORS.DARK_BLUE}80` }}
                    >
                      No devices connected yet
                    </p>
                    <p 
                      className="text-sm mb-4"
                      style={{ color: `${BRAND_COLORS.DARK_BLUE}60` }}
                    >
                      Add your first energy monitoring device to get started
                    </p>
                    <button
                      className="px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90"
                      style={{
                        backgroundColor: BRAND_COLORS.YELLOW,
                        color: BRAND_COLORS.DARK_BLUE
                      }}
                    >
                      Connect Device
                    </button>
                  </div>
                ) : (
                  data.devices.map((device) => (
                    <div 
                      key={device.id}
                      className="p-5 rounded-lg transition-all duration-200 hover:shadow-md"
                      style={{
                        backgroundColor: `${BRAND_COLORS.CELESTIAL_BLUE}05`,
                        border: `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}20`
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <div 
                              className="w-12 h-12 rounded-lg flex items-center justify-center"
                              style={{
                                background: `linear-gradient(135deg, ${BRAND_COLORS.YELLOW}, ${BRAND_COLORS.GREEN})`
                              }}
                            >
                              <Zap className="text-white" size={24} />
                            </div>
                            <div>
                              <h3 
                                className="text-xl font-bold"
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

                          <div className="grid grid-cols-2 gap-4">
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
                                System Size
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
                                Status
                              </p>
                              <span 
                                className="inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold"
                                style={{
                                  backgroundColor: `${BRAND_COLORS.GREEN}20`,
                                  color: BRAND_COLORS.GREEN
                                }}
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                                <span>Active</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2 ml-4">
                          <button
                            className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-80"
                            style={{
                              backgroundColor: `${BRAND_COLORS.CELESTIAL_BLUE}10`,
                              color: BRAND_COLORS.CELESTIAL_BLUE,
                              border: `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}30`
                            }}
                          >
                            View Details
                          </button>
                          <button
                            className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-80"
                            style={{
                              backgroundColor: `${BRAND_COLORS.DARK_BLUE}05`,
                              color: `${BRAND_COLORS.DARK_BLUE}80`,
                              border: `1px solid ${BRAND_COLORS.DARK_BLUE}20`
                            }}
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}