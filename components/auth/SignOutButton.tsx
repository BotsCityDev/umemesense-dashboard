// components/auth/SignOutButton.tsx
'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

const BRAND_COLORS = {
    CELESTIAL_BLUE: '#3C9AE9',
    DARK_BLUE: '#000B3C'
};

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="flex items-center space-x-2 py-2 px-4 rounded-lg font-semibold transition duration-300"
      style={{
          backgroundColor: BRAND_COLORS.CELESTIAL_BLUE,
          color: 'white',
          boxShadow: `0 4px 6px -1px ${BRAND_COLORS.CELESTIAL_BLUE}40`
      }}
    >
      <LogOut size={18} />
      <span>Sign Out</span>
    </button>
  );
}