// components/NavBar.tsx
'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Power, User, Home, Zap, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { BrandLogo, BRAND_COLORS } from './BrandUtilities'; // <-- Import BrandLogo



export default function NavBar() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavLink = ({ 
    href, 
    children, 
    icon: Icon 
  }: { 
    href: string; 
    children: React.ReactNode; 
    icon: React.ElementType;
  }) => (
    <Link 
      href={href}
      onClick={() => setMobileMenuOpen(false)}
      className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 group"
      style={{ 
        fontFamily: 'DM Sans, sans-serif',
        color: BRAND_COLORS.DARK_BLUE,
      }}
    >
      <Icon 
        size={18} 
        className="transition-colors duration-200"
        style={{ color: BRAND_COLORS.CELESTIAL_BLUE }}
      />
      <span className="group-hover:text-opacity-80">{children}</span>
    </Link>
  );

  return (
    <nav 
      className="sticky top-0 z-50 shadow-sm backdrop-blur-sm"
      style={{ 
        backgroundColor: BRAND_COLORS.WHITE,
        borderBottom: `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}20`,
        fontFamily: 'DM Sans, sans-serif'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/" aria-label="Home">
          {/* Set a width and height that maintains the rectangular shape */}
          <BrandLogo width={250} height={75} /> 
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 flex-1 justify-center">
            <NavLink href="/" icon={Home}>Home</NavLink>
            <NavLink href="/dashboard" icon={Zap}>Dashboard</NavLink>
            <NavLink href="/devices" icon={Power}>Devices</NavLink>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <Link 
                  href="/profile"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200"
                  style={{ 
                    fontFamily: 'DM Sans, sans-serif',
                    color: BRAND_COLORS.DARK_BLUE,
                  }}
                >
                  <User size={18} style={{ color: BRAND_COLORS.CELESTIAL_BLUE }} />
                  <span className="max-w-[120px] truncate">
                    {session.user?.name || 'Profile'}
                  </span>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:opacity-90 shadow-md"
                  style={{ 
                    fontFamily: 'DM Sans, sans-serif',
                    backgroundColor: BRAND_COLORS.ULTRAMARINE_BLUE,
                    color: BRAND_COLORS.WHITE,
                  }}
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login"
                  className="px-5 py-2 rounded-lg font-semibold transition-all duration-200 hover:opacity-80"
                  style={{ 
                    fontFamily: 'DM Sans, sans-serif',
                    color: BRAND_COLORS.ULTRAMARINE_BLUE,
                  }}
                >
                  Sign In
                </Link>
                <Link 
                  href="/register"
                  className="px-5 py-2 rounded-lg font-semibold transition-all duration-200 hover:opacity-90 shadow-md"
                  style={{ 
                    fontFamily: 'DM Sans, sans-serif',
                    backgroundColor: BRAND_COLORS.GREEN,
                    color: BRAND_COLORS.WHITE,
                  }}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors duration-200"
            style={{ color: BRAND_COLORS.UMEME_BLUE }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div 
            className="md:hidden py-4 border-t"
            style={{ 
              borderColor: `${BRAND_COLORS.CELESTIAL_BLUE}20`,
              backgroundColor: BRAND_COLORS.WHITE
            }}
          >
            <div className="flex flex-col space-y-1">
              <NavLink href="/" icon={Home}>Home</NavLink>
              <NavLink href="/dashboard" icon={Zap}>Dashboard</NavLink>
              <NavLink href="/devices" icon={Power}>Devices</NavLink>
              
              {isAuthenticated ? (
                <>
                  <div className="pt-3 mt-3" style={{ borderTop: `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}20` }}>
                    <NavLink href="/profile" icon={User}>
                      {session.user?.name || 'Profile'}
                    </NavLink>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOut({ callbackUrl: '/' });
                    }}
                    className="flex items-center space-x-2 mx-4 px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:opacity-90 shadow-md"
                    style={{ 
                      fontFamily: 'DM Sans, sans-serif',
                      backgroundColor: BRAND_COLORS.ULTRAMARINE_BLUE,
                      color: BRAND_COLORS.WHITE,
                    }}
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-3 mt-3 px-4" style={{ borderTop: `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}20` }}>
                  <Link 
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center px-5 py-2.5 rounded-lg font-semibold transition-all duration-200"
                    style={{ 
                      fontFamily: 'DM Sans, sans-serif',
                      color: BRAND_COLORS.ULTRAMARINE_BLUE,
                      border: `2px solid ${BRAND_COLORS.ULTRAMARINE_BLUE}`,
                    }}
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-md"
                    style={{ 
                      fontFamily: 'DM Sans, sans-serif',
                      backgroundColor: BRAND_COLORS.GREEN,
                      color: BRAND_COLORS.WHITE,
                    }}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}