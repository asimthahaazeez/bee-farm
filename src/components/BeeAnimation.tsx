import React from 'react';

interface BeeAnimationProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BeeAnimation: React.FC<BeeAnimationProps> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`inline-block animate-float ${className}`}>
      <svg 
        className={`${sizeClasses[size]} text-amber-500`}
        viewBox="0 0 24 24" 
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Bee Body */}
        <ellipse cx="12" cy="14" rx="3" ry="6" className="fill-amber-400"/>
        
        {/* Bee Stripes */}
        <rect x="9.5" y="11" width="5" height="1" className="fill-amber-800"/>
        <rect x="9.5" y="13" width="5" height="1" className="fill-amber-800"/>
        <rect x="9.5" y="15" width="5" height="1" className="fill-amber-800"/>
        <rect x="9.5" y="17" width="5" height="1" className="fill-amber-800"/>
        
        {/* Left Wing */}
        <ellipse 
          cx="8" 
          cy="10" 
          rx="3" 
          ry="2" 
          className="fill-blue-100 opacity-70"
          style={{ 
            transformOrigin: '8px 10px',
            animation: 'wing-flutter 0.3s ease-in-out infinite alternate'
          }}
        />
        
        {/* Right Wing */}
        <ellipse 
          cx="16" 
          cy="10" 
          rx="3" 
          ry="2" 
          className="fill-blue-100 opacity-70"
          style={{ 
            transformOrigin: '16px 10px',
            animation: 'wing-flutter 0.3s ease-in-out infinite alternate'
          }}
        />
        
        {/* Antennae */}
        <line x1="10" y1="8" x2="9" y2="6" stroke="currentColor" strokeWidth="1" className="stroke-amber-800"/>
        <line x1="14" y1="8" x2="15" y2="6" stroke="currentColor" strokeWidth="1" className="stroke-amber-800"/>
        <circle cx="9" cy="6" r="0.5" className="fill-amber-800"/>
        <circle cx="15" cy="6" r="0.5" className="fill-amber-800"/>
      </svg>
      
      <style>{`
        @keyframes wing-flutter {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(15deg); }
        }
      `}</style>
    </div>
  );
};

export const PollenParticle: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`absolute animate-pollen-drift ${className}`}>
    <div className="w-1 h-1 bg-yellow-300 rounded-full opacity-60"></div>
  </div>
);

export const BeeTrail: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`absolute animate-bee-trail ${className}`}>
    <BeeAnimation size="sm" />
  </div>
);