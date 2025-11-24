import React from 'react';
import { FlowerType } from '../types';

export const RedFlowerIcon = ({ size = 24, className = "", style }: { size?: number, className?: string, style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="15" fill="#FFE082" />
    <path d="M50 20C50 5 35 5 35 20C35 35 50 40 50 50C50 40 65 35 65 20C65 5 50 5 50 20Z" fill="#FF5252" />
    <path d="M50 80C50 95 35 95 35 80C35 65 50 60 50 50C50 60 65 65 65 80C65 95 50 95 50 80Z" fill="#FF5252" />
    <path d="M20 50C5 50 5 35 20 35C35 35 40 50 50 50C40 50 35 65 20 65C5 65 5 50 20 50Z" fill="#FF5252" />
    <path d="M80 50C95 50 95 35 80 35C65 35 60 50 50 50C60 50 65 65 80 65C95 65 95 50 80 50Z" fill="#FF5252" />
    <path d="M29 29C18 18 10 25 18 35C25 42 35 45 50 50C35 45 30 35 29 29Z" fill="#FF5252" transform="rotate(45 50 50)" />
    <path d="M71 29C82 18 90 25 82 35C75 42 65 45 50 50C65 45 70 35 71 29Z" fill="#FF5252" transform="rotate(-45 50 50)" />
    <path d="M29 71C18 82 10 75 18 65C25 58 35 55 50 50C35 55 30 65 29 71Z" fill="#FF5252" transform="rotate(-45 50 50)" />
    <path d="M71 71C82 82 90 75 82 65C75 58 65 55 50 50C65 55 70 65 71 71Z" fill="#FF5252" transform="rotate(45 50 50)" />
    <circle cx="50" cy="50" r="12" fill="#FFC107" stroke="#FFA000" strokeWidth="2" />
    <circle cx="45" cy="46" r="2" fill="white" fillOpacity="0.6" />
  </svg>
);

export const BlueFlowerIcon = ({ size = 24, className = "", style }: { size?: number, className?: string, style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
     <circle cx="50" cy="50" r="15" fill="#BBDEFB" />
    <path d="M50 20C50 10 40 10 40 20C40 35 50 40 50 50C50 40 60 35 60 20C60 10 50 10 50 20Z" fill="#448AFF" />
    <path d="M50 80C50 90 40 90 40 80C40 65 50 60 50 50C50 60 60 65 60 80C60 90 50 90 50 80Z" fill="#448AFF" />
    <path d="M20 50C10 50 10 40 20 40C35 40 40 50 50 50C40 50 35 60 20 60C10 60 10 50 20 50Z" fill="#448AFF" />
    <path d="M80 50C90 50 90 40 80 40C65 40 60 50 50 50C60 50 65 60 80 60C90 60 90 50 80 50Z" fill="#448AFF" />
    
    <path d="M29 29C20 20 15 25 20 32C28 40 35 45 50 50C35 45 28 35 29 29Z" fill="#448AFF" transform="rotate(45 50 50)" />
    <path d="M71 29C80 20 85 25 80 32C72 40 65 45 50 50C65 45 72 35 71 29Z" fill="#448AFF" transform="rotate(-45 50 50)" />
    <path d="M29 71C20 80 15 75 20 68C28 60 35 55 50 50C35 55 28 65 29 71Z" fill="#448AFF" transform="rotate(-45 50 50)" />
    <path d="M71 71C80 80 85 75 80 68C72 60 65 55 50 50C65 55 72 65 71 71Z" fill="#448AFF" transform="rotate(45 50 50)" />

    <circle cx="50" cy="50" r="10" fill="#90CAF9" stroke="#1565C0" strokeWidth="2" />
    <path d="M45 52 Q50 48 55 52" stroke="#1565C0" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ChevronLeft = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m15 18-6-6 6-6"/>
  </svg>
);

export const ChevronRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

export const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 6 6 18"/>
    <path d="m6 6 18 18"/>
  </svg>
);

export const TrashIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 6h18"/>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
  </svg>
);