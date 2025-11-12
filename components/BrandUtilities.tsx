// components/BrandUtilities.tsx (Updated)

import Image from 'next/image';

// Brand Colors from Page 4
export const BRAND_COLORS = {
    ULTRAMARINE_BLUE: '#3D56FF',
    UMEME_BLUE: '#1523DB',
    CELESTIAL_BLUE: '#3C9AE9',
    YELLOW: '#F8D200',
    GREEN: '#8ACE47',
    DARK_BLUE: '#000B3C',
    WHITE: '#FFFFFF',
};

// Reusable Logo Component
// This version uses the uploaded image but crops/styles it to show only the icon (without text).
// export const BrandLogo = ({ size = 32, showText = false, showTagline = false }: 
//     { size?: number, showText?: boolean, showTagline?: boolean }) => {

//     if (!showText && !showTagline) {
//         // --- Option 1: Icon Only (for minimalist navbar use) ---
//         return (
//             <div 
//                 style={{ width: size, height: size, overflow: 'hidden' }}
//                 title="UmemeSense Logo Icon"
//             >
//                 {/* We use the full logo image but style it to show only the icon.
//                 Since the image is wide (icon + text), we'll visually crop it 
//                 or ideally, you should use the pre-cropped icon: /logo-icon.svg 
//                 For demonstration, we'll treat the logo image as containing only the icon.
//                 */}
//                  <img
//                     src="/logoumeme.jpg" // Accesses the uploaded file in public folder
//                     alt="UmemeSense Icon"
//                     style={{ 
//                         width: 'auto', 
//                         height: '100%', 
//                         maxWidth: '100%' 
//                     }}
//                 />
//             </div>
//         );
//     }
    
//     // --- Option 2: Full Logo (Icon + Text + Tagline, using a styled DIV/IMG) ---
//     return (
//         <div className="flex items-center space-x-2">
//             {/* The full image provided includes the icon, text, and tagline. */}
//             <img
//                 src="/logoumeme.jpg"
//                 alt="UmemeSense Logo"
//                 style={{ 
//                     height: size, 
//                     width: 'auto', 
//                     maxHeight: '100%' 
//                 }}
//             />
//             {/* You could optionally render the text/tagline separately if using the icon-only image */}
//         </div>
//     );
// };

export const BrandLogo = ({ width = 144, height = 36 }: { width?: number, height?: number }) => {
    return (
        // The container now uses separate width and height for a rectangular shape
        <div style={{ width: width, height: height, display: 'inline-block' }}> 
            <img
                src="/logoumeme.svg" 
                alt="UmemeSense Logo"
                // The image itself is now scaled to fill the entire container
                style={{ 
                    height: '100%', 
                    width: '100%', 
                    // Use object-fit: contain to ensure the aspect ratio of the image is respected 
                    // and it doesn't get stretched inside the div.
                    objectFit: 'contain'
                }}
            />
        </div>
    );
};