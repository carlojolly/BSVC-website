"use client";

import React, { useRef, useState, useEffect, MouseEvent, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  glowColor?: string;
  backgroundColor?: string;
  textColor?: string;
  hoverTextColor?: string;
}

const HoverButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
  disabled = false,
  glowColor = '#EBB800',
  backgroundColor = '#000000',
  textColor = '#ffffff',
  hoverTextColor = '#EBB800',
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rafId = useRef<number | null>(null);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setGlowPosition({ x: clientX - rect.left, y: clientY - rect.top });
      }
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        relative inline-block cursor-pointer overflow-hidden
        transition-colors duration-300 z-10
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      style={{
        backgroundColor,
        color: isHovered ? hoverTextColor : textColor,
      }}
    >
      {/* Glow effect */}
      <div
        className={`
          absolute w-[220px] h-[220px] rounded-full pointer-events-none
          -translate-x-1/2 -translate-y-1/2
          transition-all duration-300 ease-out
          ${isHovered ? 'opacity-40 scale-100' : 'opacity-0 scale-0'}
        `}
        style={{
          left: `${glowPosition.x}px`,
          top: `${glowPosition.y}px`,
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          zIndex: 0,
        }}
      />
      {/* Content */}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export { HoverButton };
