// app/page.tsx

import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const BRAND_COLORS = {
  DARK_BLUE: '#000B3C',
  UMEME_BLUE: '#1523DB',
  CELESTIAL_BLUE: '#3C9AE9',
  ULTRAMARINE_BLUE: '#3D56FF',
  GREEN: '#8ACE47',
  YELLOW: '#F8D200',
  WHITE: '#FFFFFF',
};

export default async function LandingPage() {
  const session = await getServerSession(authOptions);
  const isAuthenticated = !!session;

  return (
    <>
      {/* Hero Section */}
      <section 
        className="pt-32 pb-20 px-6"
        style={{
          background: `radial-gradient(ellipse at top, ${BRAND_COLORS.UMEME_BLUE}20, transparent 50%)`
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <div 
            className="inline-block mb-6 px-4 py-2 rounded-full"
            style={{ 
              backgroundColor: `${BRAND_COLORS.UMEME_BLUE}20`,
              border: `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}30`,
              fontFamily: 'DM Sans, sans-serif'
            }}
          >
            <span 
              className="text-sm font-semibold"
              style={{ color: BRAND_COLORS.CELESTIAL_BLUE }}
            >
              Real-time Energy Intelligence
            </span>
          </div>
          
          <h1 
            className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            <span style={{ color: BRAND_COLORS.DARK_BLUE }}>Make sense of</span>
            <br />
            <span 
              style={{ 
                background: `linear-gradient(to right, ${BRAND_COLORS.YELLOW}, ${BRAND_COLORS.GREEN}, ${BRAND_COLORS.CELESTIAL_BLUE})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              your energy consumption
            </span>
          </h1>
          
          <p 
            className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed"
            style={{ 
              color: `${BRAND_COLORS.DARK_BLUE}CC`,
              fontFamily: 'DM Sans, sans-serif'
            }}
          >
            Enterprise-grade energy management platform. Monitor consumption, track renewable assets, 
            and manage Renewable Energy Credits (RECs) with real-time precision.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {isAuthenticated ? (
              <a 
                href="https://dashboard.umemesense.com"
                className="py-4 px-8 rounded-lg font-bold shadow-xl hover:opacity-90 transform hover:scale-105 transition-all duration-300"
                style={{ 
                  backgroundColor: BRAND_COLORS.YELLOW,
                  color: BRAND_COLORS.DARK_BLUE,
                  fontFamily: 'DM Sans, sans-serif'
                }}
              >
                Launch Dashboard →
              </a>
            ) : (
              <>
                <Link 
                  href="/register"
                  className="py-4 px-8 rounded-lg font-bold shadow-xl hover:opacity-90 transform hover:scale-105 transition-all duration-300"
                  style={{ 
                    backgroundColor: BRAND_COLORS.GREEN,
                    color: BRAND_COLORS.WHITE,
                    fontFamily: 'DM Sans, sans-serif'
                  }}
                >
                  Start Today
                </Link>
                <Link 
                  href="/login"
                  className="py-4 px-8 rounded-lg font-semibold transition-all duration-300 hover:opacity-80"
                  style={{ 
                    border: `2px solid ${BRAND_COLORS.CELESTIAL_BLUE}`,
                    color: BRAND_COLORS.CELESTIAL_BLUE,
                    fontFamily: 'DM Sans, sans-serif'
                  }}
                >
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <span style={{ color: BRAND_COLORS.GREEN }}>✓</span>
              <span 
                style={{ 
                  color: `${BRAND_COLORS.DARK_BLUE}99`,
                  fontFamily: 'DM Sans, sans-serif'
                }}
              >
                ISO 27001 Compliant
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ color: BRAND_COLORS.GREEN }}>✓</span>
              <span 
                style={{ 
                  color: `${BRAND_COLORS.DARK_BLUE}99`,
                  fontFamily: 'DM Sans, sans-serif'
                }}
              >
                Bank-level Security
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ color: BRAND_COLORS.GREEN }}>✓</span>
              <span 
                style={{ 
                  color: `${BRAND_COLORS.DARK_BLUE}99`,
                  fontFamily: 'DM Sans, sans-serif'
                }}
              >
                99.9% Uptime SLA
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6" style={{ backgroundColor: `${BRAND_COLORS.CELESTIAL_BLUE}05` }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl font-bold mb-4"
              style={{ 
                color: BRAND_COLORS.DARK_BLUE,
                fontFamily: 'DM Sans, sans-serif'
              }}
            >
              Everything you need to manage energy intelligently
            </h2>
            <p 
              className="text-lg"
              style={{ 
                color: `${BRAND_COLORS.DARK_BLUE}80`,
                fontFamily: 'DM Sans, sans-serif'
              }}
            >
              Comprehensive tools for monitoring, analysis, and optimization
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div 
              className="group p-8 rounded-2xl transition-all duration-300 hover:shadow-xl"
              style={{ 
                backgroundColor: BRAND_COLORS.WHITE,
                border: `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}30`
              }}
            >
              {/* <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                style={{ 
                  // background: `linear-gradient(135deg, ${BRAND_COLORS.YELLOW}, ${BRAND_COLORS.YELLOW}80)`
                }}
              >
                <span className="text-3xl">⚡</span>
              </div> */}
              <h3 
                className="text-xl font-bold mb-3"
                style={{ 
                  color: BRAND_COLORS.DARK_BLUE,
                  fontFamily: 'DM Sans, sans-serif'
                }}
              >
                Real-time Monitoring
              </h3>
              <p 
                className="leading-relaxed"
                style={{ 
                  color: `${BRAND_COLORS.DARK_BLUE}99`,
                  fontFamily: 'DM Sans, sans-serif'
                }}
              >
                Track Active Power (P), Reactive Power (Q), Voltage, and Current with millisecond precision. 
                Live data visualization and historical trend analysis.
              </p>
            </div>

            {/* Feature 2 */}
            <div 
              className="group p-8 rounded-2xl transition-all duration-300 hover:shadow-xl"
              style={{ 
                backgroundColor: BRAND_COLORS.WHITE,
                border: `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}30`
              }}
            >
              {/* <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                style={{ 
                  // background: `linear-gradient(135deg, ${BRAND_COLORS.GREEN}, ${BRAND_COLORS.GREEN}80)`
                }}
              >
                <span className="text-3xl">🌱</span>
              </div> */}
              <h3 
                className="text-xl font-bold mb-3"
                style={{ 
                  color: BRAND_COLORS.DARK_BLUE,
                  fontFamily: 'DM Sans, sans-serif'
                }}
              >
                Renewable Asset Management
              </h3>
              <p 
                className="leading-relaxed"
                style={{ 
                  color: `${BRAND_COLORS.DARK_BLUE}99`,
                  fontFamily: 'DM Sans, sans-serif'
                }}
              >
                Monitor solar, wind, and hybrid systems by location and capacity. Automated REC calculation 
                and certification tracking with blockchain verification.
              </p>
            </div>

            {/* Feature 3 */}
            <div 
              className="group p-8 rounded-2xl transition-all duration-300 hover:shadow-xl"
              style={{ 
                backgroundColor: BRAND_COLORS.WHITE,
                border: `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}30`
              }}
            >
              {/* <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                style={{ 
                  // background: `linear-gradient(135deg, ${BRAND_COLORS.CELESTIAL_BLUE}, ${BRAND_COLORS.CELESTIAL_BLUE}80)`
                }}
              >
                <span className="text-3xl">🔒</span>
              </div> */}
              <h3 
                className="text-xl font-bold mb-3"
                style={{ 
                  color: BRAND_COLORS.DARK_BLUE,
                  fontFamily: 'DM Sans, sans-serif'
                }}
              >
                Enterprise Security
              </h3>
              <p 
                className="leading-relaxed"
                style={{ 
                  color: `${BRAND_COLORS.DARK_BLUE}99`,
                  fontFamily: 'DM Sans, sans-serif'
                }}
              >
                Military-grade encryption, role-based access control, and complete data isolation. 
                SOC 2 Type II certified with NextAuth.js authentication.
              </p>
            </div>

            {/* Feature 4 */}
            <div 
              className="group p-8 rounded-2xl transition-all duration-300 hover:shadow-xl"
              style={{ 
                backgroundColor: BRAND_COLORS.WHITE,
                border: `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}30`
              }}
            >
              {/* <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                style={{ 
                  // background: `linear-gradient(135deg, ${BRAND_COLORS.ULTRAMARINE_BLUE}, ${BRAND_COLORS.CELESTIAL_BLUE})`
                }}
              >
                <span className="text-3xl">📊</span>
              </div> */}
              <h3 
                className="text-xl font-bold mb-3"
                style={{ 
                  color: BRAND_COLORS.DARK_BLUE,
                  fontFamily: 'DM Sans, sans-serif'
                }}
              >
                Advanced Analytics
              </h3>
              <p 
                className="leading-relaxed"
                style={{ 
                  color: `${BRAND_COLORS.DARK_BLUE}99`,
                  fontFamily: 'DM Sans, sans-serif'
                }}
              >
                AI-powered insights, predictive maintenance alerts, and custom reporting. 
                Export data in multiple formats for compliance and auditing.
              </p>
            </div>

            {/* Feature 5 */}
            <div 
              className="group p-8 rounded-2xl transition-all duration-300 hover:shadow-xl"
              style={{ 
                backgroundColor: BRAND_COLORS.WHITE,
                border: `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}30`
              }}
            >
              {/* <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                style={{ 
                  // background: `linear-gradient(135deg, ${BRAND_COLORS.GREEN}, ${BRAND_COLORS.YELLOW})`
                }}
              >
                <span className="text-3xl">🌍</span>
              </div> */}
              <h3 
                className="text-xl font-bold mb-3"
                style={{ 
                  color: BRAND_COLORS.DARK_BLUE,
                  fontFamily: 'DM Sans, sans-serif'
                }}
              >
                Carbon Tracking
              </h3>
              <p 
                className="leading-relaxed"
                style={{ 
                  color: `${BRAND_COLORS.DARK_BLUE}99`,
                  fontFamily: 'DM Sans, sans-serif'
                }}
              >
                Calculate and monitor your carbon footprint in real-time. Generate sustainability 
                reports and track progress toward net-zero goals.
              </p>
            </div>

            {/* Feature 6 */}
            <div 
              className="group p-8 rounded-2xl transition-all duration-300 hover:shadow-xl"
              style={{ 
                backgroundColor: BRAND_COLORS.WHITE,
                border: `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}30`
              }}
            >
              {/* <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                style={{ 
                  // background: `linear-gradient(135deg, ${BRAND_COLORS.YELLOW}, ${BRAND_COLORS.GREEN})`
                }}
              >
                <span className="text-3xl">🔔</span>
              </div> */}
              <h3 
                className="text-xl font-bold mb-3"
                style={{ 
                  color: BRAND_COLORS.DARK_BLUE,
                  fontFamily: 'DM Sans, sans-serif'
                }}
              >
                Smart Alerts
              </h3>
              <p 
                className="leading-relaxed"
                style={{ 
                  color: `${BRAND_COLORS.DARK_BLUE}99`,
                  fontFamily: 'DM Sans, sans-serif'
                }}
              >
                Configurable threshold alerts via email, SMS, and push notifications. 
                Anomaly detection with machine learning to prevent costly downtime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6" style={{ backgroundColor: BRAND_COLORS.WHITE }}>
        <div 
          className="max-w-4xl mx-auto text-center p-12 rounded-3xl"
          style={{ 
            background: `linear-gradient(135deg, ${BRAND_COLORS.UMEME_BLUE}20, ${BRAND_COLORS.CELESTIAL_BLUE}10)`,
            border: `1px solid ${BRAND_COLORS.CELESTIAL_BLUE}30`
          }}
        >
          <h3 
            className="text-4xl font-bold mb-4"
            style={{ 
              color: BRAND_COLORS.DARK_BLUE,
              fontFamily: 'DM Sans, sans-serif'
            }}
          >
            Ready to transform your energy management?
          </h3>
          <p 
            className="text-lg mb-8"
            style={{ 
              color: `${BRAND_COLORS.DARK_BLUE}CC`,
              fontFamily: 'DM Sans, sans-serif'
            }}
          >
            Join leading organizations using UmemeSense to optimize their energy consumption
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register"
              className="py-4 px-8 rounded-lg font-bold shadow-xl hover:opacity-90 transition-all duration-300"
              style={{ 
                backgroundColor: BRAND_COLORS.YELLOW,
                color: BRAND_COLORS.DARK_BLUE,
                fontFamily: 'DM Sans, sans-serif'
              }}
            >
              Start Today
            </Link>
            <a 
              href="mailto:contact@umemesense.com"
              className="py-4 px-8 rounded-lg font-semibold transition-all duration-300 hover:opacity-80"
              style={{ 
                border: `2px solid ${BRAND_COLORS.DARK_BLUE}`,
                color: BRAND_COLORS.DARK_BLUE,
                fontFamily: 'DM Sans, sans-serif'
              }}
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    </>
  );
}