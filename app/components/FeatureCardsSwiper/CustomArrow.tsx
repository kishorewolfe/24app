// components/CustomArrow.tsx
import React from 'react';

interface CustomArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const NextArrow: React.FC<CustomArrowProps> = ({ className, style, onClick }) => (
  <div
    className={`${className} custom-next-arrow`}
    style={{ ...style, display: 'block', background: 'blue', borderRadius: '50%' }} // Customize your styles
    onClick={onClick}
  >
    &#10095; {/* This is the right arrow symbol */}
  </div>
);

export const PrevArrow: React.FC<CustomArrowProps> = ({ className, style, onClick }) => (
  <div
    className={`${className} custom-prev-arrow`}
    style={{ ...style, display: 'block', background: 'blue', borderRadius: '50%' }} // Customize your styles
    onClick={onClick}
  >
    &#10094; {/* This is the left arrow symbol */}
  </div>
);
