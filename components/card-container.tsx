import React from 'react';

interface CardContainerProps {
  children: React.ReactNode;
}

export default function CardContainer({ children }: CardContainerProps) {
  return (
    <div className="card-container">
      <div className="card-border"></div>
      <div className="card">
        {children}
      </div>
      <div className="backdrop"></div>
      <div className="spin spin-blur"></div>
      <div className="spin spin-intense"></div>
      <div className="spin spin-inside"></div>
      
      {/* SVG filters for the spin effects */}
      <svg width="0" height="0">
        <filter id="unopaq">
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 20 -10"
          />
        </filter>
        <filter id="unopaq2">
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 30 -15"
          />
        </filter>
        <filter id="unopaq3">
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 100 -20"
          />
        </filter>
      </svg>
    </div>
  );
}