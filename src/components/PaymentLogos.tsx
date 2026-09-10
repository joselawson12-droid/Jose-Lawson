import React from 'react';

interface PaymentLogoProps {
  type: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const PaymentLogo: React.FC<PaymentLogoProps> = ({ type, className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-6 w-auto max-w-[54px]',
    md: 'h-8 w-auto max-w-[70px]',
    lg: 'h-10 w-auto max-w-[90px]'
  }[size];

  switch (type.toLowerCase()) {
    // 1. VISA
    case 'visa':
      return (
        <svg viewBox="0 0 120 40" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Visa">
          <rect width="120" height="40" rx="6" fill="#1434CB" />
          <path d="M47.2 28.5L52.8 11.5H58.6L53 28.5H47.2ZM39.5 11.5L34.1 23.8L33.5 20.8C32.5 17.2 29.2 13.5 25.4 11.7L30.6 28.5H36.7L45.8 11.5H39.5ZM20.8 11.5H11.5L11.4 11.9C18.6 13.7 23.4 18.2 25.4 23.6L23.4 13.5C23 11.9 22 11.5 20.8 11.5ZM82.4 20.1C82.4 14.5 74.5 14.2 74.6 11.8C74.6 11 75.4 10.2 77.2 10C78.1 9.9 80.6 9.8 83.4 11.1L84.6 5.8C83 5.2 81 4.7 78.4 4.7C71.8 4.7 67.2 8.2 67.2 13.2C67.1 17 70.4 19.1 73 20.4C75.6 21.7 76.5 22.6 76.5 23.8C76.5 25.6 74.4 26.4 72.4 26.4C69.4 26.4 67.6 25.6 65.5 24.6L64.3 30.1C66.1 30.9 69.4 31.6 72.8 31.6C79.8 31.6 84.4 28.1 84.4 22.8L82.4 20.1ZM107.5 28.5H112.7L108.2 11.5H103.4C102.3 11.5 101.4 12.1 101 13.1L92.2 28.5H98.4L99.6 25.1H106.8L107.5 28.5ZM101.3 20.5L104.2 13.9L105.9 20.5H101.3Z" fill="white" />
          <path d="M25.4 23.6C23.4 18.2 18.6 13.7 11.4 11.9L11.5 11.5H20.8C22 11.5 23 11.9 23.4 13.5L25.4 23.6Z" fill="#F7B600" />
        </svg>
      );

    // 2. MASTERCARD
    case 'mastercard':
      return (
        <svg viewBox="0 0 120 40" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Mastercard">
          <rect width="120" height="40" rx="6" fill="#0A0A0A" />
          <circle cx="48" cy="20" r="13" fill="#EB001B" />
          <circle cx="72" cy="20" r="13" fill="#F79E1B" />
          <path d="M60 10.6C63.6 13.1 66 16.3 66 20C66 23.7 63.6 26.9 60 29.4C56.4 26.9 54 23.7 54 20C54 16.3 56.4 13.1 60 10.6Z" fill="#FF5F00" />
        </svg>
      );

    // 3. CB (Cartes Bancaires)
    case 'cb':
      return (
        <svg viewBox="0 0 120 40" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Cartes Bancaires">
          <rect width="120" height="40" rx="6" fill="#0D5F3A" />
          <path d="M18 10H46C49.3 10 52 12.7 52 16V24C52 27.3 49.3 30 46 30H18C14.7 30 12 27.3 12 24V16C12 12.7 14.7 10 18 10Z" fill="#008850" />
          <text x="32" y="24" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="16" textAnchor="middle">CB</text>
          <text x="82" y="24" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="700" fontSize="13" textAnchor="middle">BANCAIRE</text>
        </svg>
      );

    // 4. AMERICAN EXPRESS
    case 'amex':
      return (
        <svg viewBox="0 0 120 40" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="American Express">
          <rect width="120" height="40" rx="6" fill="#006FCF" />
          <rect x="6" y="6" width="108" height="28" rx="3" stroke="#5AC8FA" strokeWidth="1.5" />
          <text x="60" y="24.5" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="13" letterSpacing="1.2" textAnchor="middle">AMERICAN EXPRESS</text>
        </svg>
      );

    // 5. DISCOVER
    case 'discover':
      return (
        <svg viewBox="0 0 120 40" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Discover">
          <rect width="120" height="40" rx="6" fill="#231F20" />
          <text x="24" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="15">DISC</text>
          <circle cx="68" cy="20" r="8.5" fill="#F46B00" />
          <text x="79" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="15">VER</text>
        </svg>
      );

    // 6. UNIONPAY
    case 'unionpay':
      return (
        <svg viewBox="0 0 120 40" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="UnionPay">
          <rect width="120" height="40" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          <g transform="translate(18, 7)">
            <rect x="0" y="2" width="22" height="22" rx="3" fill="#D9222A" transform="skewX(-10)" />
            <rect x="18" y="2" width="22" height="22" rx="3" fill="#004A80" transform="skewX(-10)" />
            <rect x="36" y="2" width="22" height="22" rx="3" fill="#00796B" transform="skewX(-10)" />
            <text x="28" y="18" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="11" fontStyle="italic" textAnchor="middle">Union</text>
            <text x="46" y="18" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="11" fontStyle="italic" textAnchor="middle">Pay</text>
          </g>
        </svg>
      );

    // 7. JCB
    case 'jcb':
      return (
        <svg viewBox="0 0 120 40" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="JCB">
          <rect width="120" height="40" rx="6" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
          <g transform="translate(24, 7)">
            <rect x="0" y="0" width="22" height="26" rx="4" fill="#0E4293" />
            <text x="11" y="18" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="14" textAnchor="middle">J</text>
            <rect x="25" y="0" width="22" height="26" rx="4" fill="#D71920" />
            <text x="36" y="18" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="14" textAnchor="middle">C</text>
            <rect x="50" y="0" width="22" height="26" rx="4" fill="#1C7E2E" />
            <text x="61" y="18" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="14" textAnchor="middle">B</text>
          </g>
        </svg>
      );

    // 8. DINERS CLUB
    case 'diners':
      return (
        <svg viewBox="0 0 120 40" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Diners Club">
          <rect width="120" height="40" rx="6" fill="#004A87" />
          <circle cx="34" cy="20" r="10" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
          <path d="M34 10V30" stroke="#FFFFFF" strokeWidth="2" />
          <text x="74" y="24" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="12" letterSpacing="0.8" textAnchor="middle">Diners Club</text>
        </svg>
      );

    // 9. MAESTRO
    case 'maestro':
      return (
        <svg viewBox="0 0 120 40" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Maestro">
          <rect width="120" height="40" rx="6" fill="#0A0A0A" />
          <circle cx="48" cy="20" r="13" fill="#EB001B" />
          <circle cx="72" cy="20" r="13" fill="#0061A8" />
          <path d="M60 10.6C63.6 13.1 66 16.3 66 20C66 23.7 63.6 26.9 60 29.4C56.4 26.9 54 23.7 54 20C54 16.3 56.4 13.1 60 10.6Z" fill="#753BBB" />
          <text x="60" y="36" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="700" fontSize="7" textAnchor="middle" letterSpacing="0.5">maestro</text>
        </svg>
      );

    // 10. RUPAY
    case 'rupay':
      return (
        <svg viewBox="0 0 120 40" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="RuPay">
          <rect width="120" height="40" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          <text x="22" y="26" fill="#092B65" fontFamily="sans-serif" fontWeight="900" fontSize="18" fontStyle="italic">Ru</text>
          <text x="50" y="26" fill="#EE7623" fontFamily="sans-serif" fontWeight="900" fontSize="18" fontStyle="italic">Pay</text>
          <polygon points="86,12 98,12 90,26 78,26" fill="#097838" />
          <polygon points="98,12 110,12 102,26 90,26" fill="#EE7623" />
        </svg>
      );

    // 11. GOOGLE PAY
    case 'google-pay':
      return (
        <svg viewBox="0 0 120 40" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Google Pay">
          <rect width="120" height="40" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          {/* G logo */}
          <g transform="translate(24, 10)">
            <path d="M19.6 10.2C19.6 9.5 19.5 8.8 19.4 8.2H10V12.1H15.4C15.2 13.2 14.5 14.2 13.6 14.8V17.1H16.7C18.5 15.4 19.6 13 19.6 10.2Z" fill="#4285F4" />
            <path d="M10 20C12.7 20 15 19.1 16.7 17.1L13.6 14.8C12.7 15.4 11.5 15.8 10 15.8C7.4 15.8 5.2 14 4.4 11.6H1.2V14C3 17.5 6.2 20 10 20Z" fill="#34A853" />
            <path d="M4.4 11.6C4.2 11 4.1 10.3 4.1 9.6C4.1 8.9 4.2 8.2 4.4 7.6V5.2H1.2C0.4 6.7 0 8.1 0 9.6C0 11.1 0.4 12.5 1.2 14L4.4 11.6Z" fill="#FBBC05" />
            <path d="M10 3.4C11.5 3.4 12.8 3.9 13.8 4.8L16.8 1.9C15 0.2 12.7 0 10 0C6.2 0 3 2.5 1.2 6L4.4 8.4C5.2 6 7.4 3.4 10 3.4Z" fill="#EA4335" />
          </g>
          <text x="68" y="25" fill="#3C4043" fontFamily="sans-serif" fontWeight="700" fontSize="16">Pay</text>
        </svg>
      );

    // 12. APPLE PAY
    case 'apple-pay':
      return (
        <svg viewBox="0 0 120 40" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Apple Pay">
          <rect width="120" height="40" rx="6" fill="#000000" />
          <g transform="translate(30, 9)" fill="#FFFFFF">
            {/* Apple shape */}
            <path d="M11.9 12.5C11.9 9.8 14.1 8.3 14.2 8.2C13 6.4 11.1 6.1 10.5 6C8.9 5.8 7.4 7 6.6 7C5.8 7 4.5 6 3.3 6C1.7 6.1 0.2 7 0 9.7C-0.3 13.8 2.7 19.9 5.2 19.9C6.4 19.9 6.9 19.1 8.4 19.1C9.8 19.1 10.2 19.9 11.5 19.9C14.1 19.9 15.6 17.5 16.3 16.3C14.7 15.6 13.7 13.9 13.8 12.2C13.8 12.3 11.9 12.5 11.9 12.5Z" />
            <path d="M9.8 4C10.5 3.1 11 1.9 10.9 0.6C9.8 0.7 8.5 1.4 7.8 2.3C7.2 3.1 6.7 4.3 6.9 5.5C8.1 5.6 9.2 4.9 9.8 4Z" />
          </g>
          <text x="66" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="600" fontSize="15">Pay</text>
        </svg>
      );

    // 13. PAYPAL
    case 'paypal':
      return (
        <svg viewBox="0 0 120 40" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="PayPal">
          <rect width="120" height="40" rx="6" fill="#003087" />
          <g transform="translate(24, 7)">
            <path d="M14.2 6.5C13.8 9.3 11.4 10.6 8.7 10.6H5.4L3.6 22H0L3.5 0H9.5C12.5 0 14.6 1.5 14.2 6.5Z" fill="#0079C1" />
            <path d="M19.2 6.5C18.8 9.3 16.4 10.6 13.7 10.6H10.4L8.6 22H5L8.5 0H14.5C17.5 0 19.6 1.5 19.2 6.5Z" fill="#00457C" opacity="0.8" />
          </g>
          <text x="64" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="15" fontStyle="italic">PayPal</text>
        </svg>
      );

    // 14. SAMSUNG PAY
    case 'samsung-pay':
      return (
        <svg viewBox="0 0 120 40" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Samsung Pay">
          <rect width="120" height="40" rx="6" fill="#034EA2" />
          <text x="32" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="13" letterSpacing="0.5">SAMSUNG</text>
          <text x="88" y="25" fill="#69B3E7" fontFamily="sans-serif" fontWeight="800" fontSize="13">pay</text>
        </svg>
      );

    // 15. SKRILL
    case 'skrill':
      return (
        <svg viewBox="0 0 120 40" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Skrill">
          <rect width="120" height="40" rx="6" fill="#811243" />
          <text x="60" y="26" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="20" fontStyle="italic" letterSpacing="0.8" textAnchor="middle">skrill</text>
        </svg>
      );

    // 16. NETELLER
    case 'neteller':
      return (
        <svg viewBox="0 0 120 40" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Neteller">
          <rect width="120" height="40" rx="6" fill="#1C1C1C" />
          <text x="60" y="25" fill="#8DC63F" fontFamily="sans-serif" fontWeight="900" fontSize="15" letterSpacing="1.2" textAnchor="middle">NETELLER</text>
        </svg>
      );

    // 17. PAYSAFECARD
    case 'paysafecard':
      return (
        <svg viewBox="0 0 120 40" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Paysafecard">
          <rect width="120" height="40" rx="6" fill="#002D62" />
          <circle cx="28" cy="20" r="10" fill="#008FD5" />
          <path d="M25 14L32 20L25 26" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <text x="72" y="24.5" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="11" letterSpacing="0.4" textAnchor="middle">paysafecard</text>
        </svg>
      );

    // 18. NEOSURF
    case 'neosurf':
      return (
        <svg viewBox="0 0 120 40" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Neosurf">
          <rect width="120" height="40" rx="6" fill="#E40046" />
          <path d="M22 28C26 24 30 18 36 12C33 19 32 24 38 28C34 26 28 27 22 28Z" fill="#FFFFFF" />
          <text x="74" y="26" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="16" letterSpacing="0.5" textAnchor="middle">neosurf</text>
        </svg>
      );

    // 19. STEAM WALLET
    case 'steam':
      return (
        <svg viewBox="0 0 120 40" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Steam Wallet">
          <rect width="120" height="40" rx="6" fill="#171A21" />
          <g transform="translate(18, 9)" fill="#FFFFFF">
            <circle cx="11" cy="11" r="10" stroke="#66C0F4" strokeWidth="1.5" fill="none" />
            <circle cx="11" cy="7" r="3.5" fill="#66C0F4" />
            <circle cx="7" cy="14" r="2.5" fill="#C7D5E0" />
            <path d="M11 7L7 14" stroke="#66C0F4" strokeWidth="1.5" />
          </g>
          <text x="68" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="15" letterSpacing="0.8">STEAM</text>
        </svg>
      );

    // 20. APPLE GIFT CARD
    case 'apple-gift-card':
      return (
        <svg viewBox="0 0 120 40" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Apple Gift Card">
          <defs>
            <linearGradient id="appleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF2D55" />
              <stop offset="50%" stopColor="#AF52DE" />
              <stop offset="100%" stopColor="#007AFF" />
            </linearGradient>
          </defs>
          <rect width="120" height="40" rx="6" fill="url(#appleGrad)" />
          <g transform="translate(18, 9)" fill="#FFFFFF">
            <path d="M11.9 12.5C11.9 9.8 14.1 8.3 14.2 8.2C13 6.4 11.1 6.1 10.5 6C8.9 5.8 7.4 7 6.6 7C5.8 7 4.5 6 3.3 6C1.7 6.1 0.2 7 0 9.7C-0.3 13.8 2.7 19.9 5.2 19.9C6.4 19.9 6.9 19.1 8.4 19.1C9.8 19.1 10.2 19.9 11.5 19.9C14.1 19.9 15.6 17.5 16.3 16.3C14.7 15.6 13.7 13.9 13.8 12.2C13.8 12.3 11.9 12.5 11.9 12.5Z" />
            <path d="M9.8 4C10.5 3.1 11 1.9 10.9 0.6C9.8 0.7 8.5 1.4 7.8 2.3C7.2 3.1 6.7 4.3 6.9 5.5C8.1 5.6 9.2 4.9 9.8 4Z" />
          </g>
          <text x="68" y="24" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="700" fontSize="11" letterSpacing="0.4">Gift Card</text>
        </svg>
      );

    // 21. GOOGLE PLAY
    case 'google-play':
      return (
        <svg viewBox="0 0 120 40" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Google Play">
          <rect width="120" height="40" rx="6" fill="#1F2937" />
          <g transform="translate(16, 9)">
            <polygon points="2,2 18,11 2,20" fill="#00A0FF" />
            <polygon points="2,2 14,14 18,11" fill="#FF3A44" />
            <polygon points="2,20 14,8 18,11" fill="#00E676" />
            <polygon points="18,11 14,14 14,8" fill="#FFC800" />
          </g>
          <text x="44" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="700" fontSize="13">Google Play</text>
        </svg>
      );

    // 22. TONEO FIRST
    case 'toneo':
      return (
        <svg viewBox="0 0 120 40" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Toneo First">
          <rect width="120" height="40" rx="6" fill="#FF6B00" />
          <text x="60" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="14" letterSpacing="0.8" textAnchor="middle">TONEO FIRST</text>
        </svg>
      );

    // 23. CASHLIB
    case 'cashlib':
      return (
        <svg viewBox="0 0 120 40" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="CASHlib">
          <rect width="120" height="40" rx="6" fill="#0B5554" />
          <circle cx="24" cy="20" r="10" fill="#00C49F" />
          <text x="24" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="12" textAnchor="middle">C</text>
          <text x="44" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="15" letterSpacing="0.5">CASH</text>
          <text x="88" y="25" fill="#00C49F" fontFamily="sans-serif" fontWeight="800" fontSize="15">lib</text>
        </svg>
      );

    // 24. TRANSCASH
    case 'transcash':
      return (
        <svg viewBox="0 0 120 40" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Transcash">
          <rect width="120" height="40" rx="6" fill="#1C1E23" />
          <rect x="12" y="11" width="18" height="18" rx="3" fill="#E30613" />
          <path d="M17 20L21 16V24L17 20Z" fill="#FFFFFF" />
          <path d="M25 20L21 24V16L25 20Z" fill="#FFFFFF" />
          <text x="36" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="12" letterSpacing="0.5">TRANS</text>
          <text x="82" y="25" fill="#E30613" fontFamily="sans-serif" fontWeight="900" fontSize="12" letterSpacing="0.5">CASH</text>
        </svg>
      );

    // 25. PCS MASTERCARD
    case 'pcs':
      return (
        <svg viewBox="0 0 120 40" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="PCS Mastercard">
          <rect width="120" height="40" rx="6" fill="#0A2C68" />
          <text x="32" y="26" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="18" letterSpacing="1">PCS</text>
          <circle cx="82" cy="20" r="8" fill="#EB001B" />
          <circle cx="94" cy="20" r="8" fill="#F79E1B" opacity="0.9" />
        </svg>
      );

    // 26. FLEXEPIN
    case 'flexepin':
      return (
        <svg viewBox="0 0 120 40" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Flexepin">
          <rect width="120" height="40" rx="6" fill="#4B1278" />
          <circle cx="25" cy="20" r="9" fill="#E6007E" />
          <path d="M25 15L29 20L25 25L21 20Z" fill="#FFFFFF" />
          <text x="44" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="14" letterSpacing="0.5">flexe</text>
          <text x="82" y="25" fill="#E6007E" fontFamily="sans-serif" fontWeight="900" fontSize="14">pin</text>
        </svg>
      );

    // 27. PLAYSTATION
    case 'playstation':
    case 'psn':
      return (
        <svg viewBox="0 0 120 40" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="PlayStation">
          <rect width="120" height="40" rx="6" fill="#003791" />
          <g transform="translate(18, 11)" fill="#FFFFFF">
            <path d="M8.5 0C4.3 0 0.8 2.8 0 6.6L4.2 8.3C4.6 6.3 6.3 4.8 8.4 4.8C10.8 4.8 12.7 6.7 12.7 9.1V9.5L8.5 7.8L0 11.2V14.8L6.4 12.2V17H10.6V10.6L14.8 12.3V9.1C14.8 4.1 12 0 8.5 0Z" />
          </g>
          <text x="44" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="12" letterSpacing="0.6">PlayStation</text>
        </svg>
      );

    // 28. XBOX
    case 'xbox':
      return (
        <svg viewBox="0 0 120 40" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Xbox">
          <rect width="120" height="40" rx="6" fill="#107C10" />
          <circle cx="28" cy="20" r="10" fill="#0E6B0E" />
          <circle cx="28" cy="20" r="9" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
          <path d="M23 15C25 18 28 22 28 22C28 22 31 18 33 15M23 25C25 22 28 18 28 18C28 18 31 22 33 25" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <text x="50" y="26" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="15" letterSpacing="1.2">XBOX</text>
        </svg>
      );

    // 29. AMAZON
    case 'amazon':
      return (
        <svg viewBox="0 0 120 40" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Amazon">
          <rect width="120" height="40" rx="6" fill="#232F3E" />
          <text x="60" y="21" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="14" letterSpacing="0.6" textAnchor="middle">amazon</text>
          <path d="M38 27C52 31 68 31 82 26" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" />
          <path d="M80 24L83 26.5L80 28" fill="#FF9900" />
        </svg>
      );

    // 30. VANILLA PREPAID
    case 'vanilla':
      return (
        <svg viewBox="0 0 120 40" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Vanilla Prepaid">
          <rect width="120" height="40" rx="6" fill="#B78727" />
          <text x="60" y="22" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="13" letterSpacing="1" textAnchor="middle">VANILLA</text>
          <text x="60" y="32" fill="#FFF2D6" fontFamily="sans-serif" fontWeight="700" fontSize="7" letterSpacing="1.5" textAnchor="middle">PREPAID CARD</text>
        </svg>
      );

    // 31. RAZER GOLD
    case 'razer':
    case 'razer-gold':
      return (
        <svg viewBox="0 0 120 40" className={`${sizeClasses} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Razer Gold">
          <rect width="120" height="40" rx="6" fill="#111111" />
          <circle cx="25" cy="20" r="9" fill="#FFA500" stroke="#00FF00" strokeWidth="1" />
          <text x="25" y="24" fill="#000000" fontFamily="sans-serif" fontWeight="900" fontSize="11" textAnchor="middle">Z</text>
          <text x="42" y="24" fill="#00FF00" fontFamily="sans-serif" fontWeight="900" fontSize="11" letterSpacing="0.8">RAZER</text>
          <text x="84" y="24" fill="#FFA500" fontFamily="sans-serif" fontWeight="800" fontSize="11">GOLD</text>
        </svg>
      );

    default:
      return (
        <div className={`flex items-center justify-center bg-slate-100 rounded-md border border-slate-300 font-mono font-bold text-xs text-slate-700 px-2 py-1 ${className}`}>
          {type.toUpperCase()}
        </div>
      );
  }
};
