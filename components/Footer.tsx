// components/Footer.tsx
'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';
import { BrandLogo, BRAND_COLORS } from './BrandUtilities'; // <-- Import BrandLogo





export default function Footer() {
  const currentYear = new Date().getFullYear();

  const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
      href={href}
      className="text-sm transition-colors duration-200 hover:opacity-80"
      style={{ 
        fontFamily: 'DM Sans, sans-serif',
        color: BRAND_COLORS.DARK_BLUE
      }}
    >
      {children}
    </Link>
  );

  const SocialLink = ({ 
    href, 
    icon: Icon, 
    label 
  }: { 
    href: string; 
    icon: React.ElementType; 
    label: string;
  }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="p-2 rounded-lg transition-all duration-200 hover:opacity-80"
      style={{ 
        backgroundColor: `${BRAND_COLORS.CELESTIAL_BLUE}10`,
        color: BRAND_COLORS.CELESTIAL_BLUE
      }}
    >
      <Icon size={20} />
    </a>
  );

  return (
    <footer 
      className="border-t"
      style={{ 
        backgroundColor: BRAND_COLORS.WHITE,
        borderColor: `${BRAND_COLORS.CELESTIAL_BLUE}20`,
        fontFamily: 'DM Sans, sans-serif'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            {/* Logo */}
          <Link href="/" aria-label="Home">
          {/* Set a width and height that maintains the rectangular shape */}
          <BrandLogo width={250} height={75} /> 
          </Link>
            <p 
              className="mt-4 text-sm leading-relaxed max-w-sm"
              style={{ 
                color: `${BRAND_COLORS.DARK_BLUE}99`,
                fontFamily: 'DM Sans, sans-serif'
              }}
            >
              Making sense of energy consumption through intelligent monitoring and analytics. 
              Track your renewable assets and manage RECs with real-time precision.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-3 mt-6">
              <SocialLink href="https://linkedin.com" icon={Linkedin} label="LinkedIn" />
              <SocialLink href="https://twitter.com" icon={Twitter} label="Twitter" />
              <SocialLink href="https://facebook.com" icon={Facebook} label="Facebook" />
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h3 
              className="font-bold text-sm mb-4"
              style={{ 
                color: BRAND_COLORS.DARK_BLUE,
                fontFamily: 'DM Sans, sans-serif'
              }}
            >
              PRODUCT
            </h3>
            <ul className="space-y-3">
              <li><FooterLink href="/features">Features</FooterLink></li>
              <li><FooterLink href="/pricing">Pricing</FooterLink></li>
              <li><FooterLink href="/dashboard">Dashboard</FooterLink></li>
              <li><FooterLink href="/devices">Devices</FooterLink></li>
              <li><FooterLink href="/api-docs">API Docs</FooterLink></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 
              className="font-bold text-sm mb-4"
              style={{ 
                color: BRAND_COLORS.DARK_BLUE,
                fontFamily: 'DM Sans, sans-serif'
              }}
            >
              COMPANY
            </h3>
            <ul className="space-y-3">
              <li><FooterLink href="/about">About Us</FooterLink></li>
              <li><FooterLink href="/careers">Careers</FooterLink></li>
              <li><FooterLink href="/blog">Blog</FooterLink></li>
              <li><FooterLink href="/press">Press Kit</FooterLink></li>
              <li><FooterLink href="/contact">Contact</FooterLink></li>
            </ul>
          </div>

          {/* Support & Legal Column */}
          <div>
            <h3 
              className="font-bold text-sm mb-4"
              style={{ 
                color: BRAND_COLORS.DARK_BLUE,
                fontFamily: 'DM Sans, sans-serif'
              }}
            >
              SUPPORT
            </h3>
            <ul className="space-y-3">
              <li><FooterLink href="/help">Help Center</FooterLink></li>
              <li><FooterLink href="/privacy">Privacy Policy</FooterLink></li>
              <li><FooterLink href="/terms">Terms of Service</FooterLink></li>
              <li><FooterLink href="/security">Security</FooterLink></li>
              <li><FooterLink href="/compliance">Compliance</FooterLink></li>
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div 
          className="py-6 mb-6 rounded-lg"
          style={{ backgroundColor: `${BRAND_COLORS.CELESTIAL_BLUE}05` }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6">
            <div className="flex items-center space-x-3">
              <div 
                className="p-2 rounded-lg"
                style={{ 
                  backgroundColor: BRAND_COLORS.WHITE,
                  color: BRAND_COLORS.CELESTIAL_BLUE
                }}
              >
                <Mail size={18} />
              </div>
              <div>
                <p 
                  className="text-xs font-semibold"
                  style={{ color: `${BRAND_COLORS.DARK_BLUE}80` }}
                >
                  Email
                </p>
                <a 
                  href="mailto:contact@umemesense.com"
                  className="text-sm font-medium hover:opacity-80 transition-opacity"
                  style={{ 
                    color: BRAND_COLORS.DARK_BLUE,
                    fontFamily: 'DM Sans, sans-serif'
                  }}
                >
                  contact@umemesense.com
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div 
                className="p-2 rounded-lg"
                style={{ 
                  backgroundColor: BRAND_COLORS.WHITE,
                  color: BRAND_COLORS.CELESTIAL_BLUE
                }}
              >
                <Phone size={18} />
              </div>
              <div>
                <p 
                  className="text-xs font-semibold"
                  style={{ color: `${BRAND_COLORS.DARK_BLUE}80` }}
                >
                  Phone
                </p>
                <a 
                  href="tel:+254700000000"
                  className="text-sm font-medium hover:opacity-80 transition-opacity"
                  style={{ 
                    color: BRAND_COLORS.DARK_BLUE,
                    fontFamily: 'DM Sans, sans-serif'
                  }}
                >
                  +254 700 000 000
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div 
                className="p-2 rounded-lg"
                style={{ 
                  backgroundColor: BRAND_COLORS.WHITE,
                  color: BRAND_COLORS.CELESTIAL_BLUE
                }}
              >
                <MapPin size={18} />
              </div>
              <div>
                <p 
                  className="text-xs font-semibold"
                  style={{ color: `${BRAND_COLORS.DARK_BLUE}80` }}
                >
                  Location
                </p>
                <p 
                  className="text-sm font-medium"
                  style={{ 
                    color: BRAND_COLORS.DARK_BLUE,
                    fontFamily: 'DM Sans, sans-serif'
                  }}
                >
                  Nairobi, Kenya
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="pt-6 border-t flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          style={{ 
            borderColor: `${BRAND_COLORS.CELESTIAL_BLUE}20`
          }}
        >
          <p 
            className="text-sm"
            style={{ 
              color: `${BRAND_COLORS.DARK_BLUE}80`,
              fontFamily: 'DM Sans, sans-serif'
            }}
          >
            © {currentYear} UmemeSense. All rights reserved.
          </p>
          <p 
            className="text-sm"
            style={{ 
              color: `${BRAND_COLORS.DARK_BLUE}60`,
              fontFamily: 'DM Sans, sans-serif'
            }}
          >
            Powered by sustainable energy intelligence
          </p>
        </div>
      </div>
    </footer>
  );
}