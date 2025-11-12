// components/ProfileEditForm.tsx
'use client';

import { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit2, Save, X } from 'lucide-react';

const BRAND_COLORS = {
  DARK_BLUE: '#000B3C',
  UMEME_BLUE: '#1523DB',
  ULTRAMARINE_BLUE: '#3D56FF',
  CELESTIAL_BLUE: '#3C9AE9',
  GREEN: '#8ACE47',
  YELLOW: '#F8D200',
  WHITE: '#FFFFFF',
};

interface ProfileData {
  name: string;
  email: string;
  username: string;
  phone: string;
  location: string;
}

export default function ProfileEditForm({ initialData }: { initialData: ProfileData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Here you would make an actual API call:
    // await fetch('/api/profile', {
    //   method: 'PATCH',
    //   body: JSON.stringify(formData)
    // });
    
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(initialData);
    setIsEditing(false);
  };

  const InfoField = ({ 
    icon: Icon, 
    label, 
    value, 
    name,
    type = 'text'
  }: { 
    icon: React.ElementType; 
    label: string; 
    value: string;
    name: keyof ProfileData;
    type?: string;
  }) => (
    <div className="mb-4">
      <label 
        className="flex items-center space-x-2 text-sm font-medium mb-2"
        style={{ color: `${BRAND_COLORS.DARK_BLUE}80` }}
      >
        <Icon size={16} style={{ color: BRAND_COLORS.CELESTIAL_BLUE }} />
        <span>{label}</span>
      </label>
      {isEditing ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
          className="w-full px-4 py-3 rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2"
          style={{
            backgroundColor: `${BRAND_COLORS.CELESTIAL_BLUE}05`,
            border: `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}30`,
            color: BRAND_COLORS.DARK_BLUE,
            fontFamily: 'DM Sans, sans-serif'
          }}
          disabled={name === 'email'} // Email typically shouldn't be editable
        />
      ) : (
        <div 
          className="px-4 py-3 rounded-lg text-sm font-medium"
          style={{
            backgroundColor: `${BRAND_COLORS.CELESTIAL_BLUE}05`,
            color: BRAND_COLORS.DARK_BLUE,
            fontFamily: 'DM Sans, sans-serif'
          }}
        >
          {value}
        </div>
      )}
    </div>
  );

  return (
    <div>
      <div className="space-y-4 mb-6">
        <InfoField
          icon={User}
          label="Full Name"
          value={formData.name}
          name="name"
        />
        
        <InfoField
          icon={User}
          label="Username"
          value={formData.username}
          name="username"
        />
        
        <InfoField
          icon={Mail}
          label="Email Address"
          value={formData.email}
          name="email"
          type="email"
        />
        
        <InfoField
          icon={Phone}
          label="Phone Number"
          value={formData.phone}
          name="phone"
          type="tel"
        />
        
        <InfoField
          icon={MapPin}
          label="Location"
          value={formData.location}
          name="location"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 hover:opacity-90 disabled:opacity-50"
              style={{
                backgroundColor: BRAND_COLORS.GREEN,
                color: BRAND_COLORS.WHITE,
                fontFamily: 'DM Sans, sans-serif'
              }}
            >
              <Save size={18} />
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
            <button
              onClick={handleCancel}
              disabled={isSaving}
              className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 hover:opacity-80 disabled:opacity-50"
              style={{
                backgroundColor: `${BRAND_COLORS.DARK_BLUE}10`,
                color: BRAND_COLORS.DARK_BLUE,
                border: `1px solid ${BRAND_COLORS.DARK_BLUE}30`,
                fontFamily: 'DM Sans, sans-serif'
              }}
            >
              <X size={18} />
              <span>Cancel</span>
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:opacity-90"
            style={{
              backgroundColor: BRAND_COLORS.CELESTIAL_BLUE,
              color: BRAND_COLORS.WHITE,
              fontFamily: 'DM Sans, sans-serif'
            }}
          >
            <Edit2 size={18} />
            <span>Edit Profile</span>
          </button>
        )}
      </div>
    </div>
  );
}