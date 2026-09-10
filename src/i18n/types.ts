export type LanguageCode =
  | 'en'
  | 'fr'
  | 'es'
  | 'pt'
  | 'de'
  | 'it'
  | 'nl'
  | 'ar'
  | 'zh'
  | 'ja'
  | 'ko'
  | 'ru'
  | 'tr'
  | 'hi'
  | 'id'
  | 'bn'
  | 'th'
  | 'pl'
  | 'sv'
  | 'uk'
  | 'vi'
  | 'fil'
  | 'ms'
  | 'no'
  | 'da'
  | 'fi'
  | 'cs'
  | 'ro'
  | 'el'
  | 'hu';

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  dir?: 'ltr' | 'rtl';
}

export interface Translations {
  // Navigation & Header
  nav: {
    home: string;
    activateMyCard: string;
    activateTicket: string;
    presentation: string;
    advantages: string;
    whyUs: string;
    firstSteps: string;
    testimonials: string;
    clientSpace: string;
    adminConsole: string;
    login: string;
    logout: string;
    language: string;
    refund?: string;
    privacy?: string;
  };

  // Hero section
  hero: {
    badge?: string;
    officialBadge: string;
    title?: string;
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    btnActivate: string;
    activateBtn?: string;
    btnRefund: string;
    metricRealtime: string;
    statSpeed?: string;
    metricSsl: string;
    statSecurity?: string;
    metricMobile: string;
    statMobile?: string;
  };

  // Chatbot
  chatbot?: {
    triggerTitle: string;
    triggerSubtitle: string;
    headerTitle: string;
    onlineStatus: string;
    placeholder: string;
    send: string;
    quickActivate: string;
    quickDelay: string;
    quickSecurity: string;
    openActivationBtn: string;
    welcomeMsg: string;
    replyActivation: string;
    replyDelay: string;
    replySecurity: string;
    replyHuman: string;
    replyDefault: string;
    justNow: string;
    closeChat: string;
  };

  // Ticket Activation Modal ("Activate My Card")
  modal: {
    title: string;
    subtitle: string;
    cardType: string;
    cardTypeRequired: string;
    cardTypePlaceholder: string;
    cardTypeSelected: string;
    amount: string;
    amountRequired: string;
    code1: string;
    code1Required: string;
    code2: string;
    code3: string;
    code4: string;
    code5: string;
    optional: string;
    optionalBadge: string;
    privacyAcceptPrefix: string;
    privacyPolicyLink: string;
    btnActivate: string;
    btnProcessing: string;
    sslNotice: string;
    footerNotice: string;

    // Errors
    errCardType: string;
    errAmountRequired: string;
    errAmountValid: string;
    errCode1Required: string;
    errCode1Length: string;
    errPrivacyRequired: string;
    errServerDefault: string;

    // Success view
    successBadge: string;
    successTitle: string;
    successDesc: string;
    refLabel: string;
    cardTypeLabel: string;
    amountLabel: string;
    verifiedCode1: string;
    verifiedCode2: string;
    verifiedCode3: string;
    verifiedCode4: string;
    verifiedCode5: string;
    cryptoSeal: string;
    btnPrintReceipt: string;
    btnActivateAnother: string;
    btnClose: string;

    // In-modal Privacy Policy Reader
    privacyTitle: string;
    privacySubtitle: string;
    privacyIntro: string;
    sec1Title: string;
    sec1Desc: string;
    sec2Title: string;
    sec2Desc: string;
    sec3Title: string;
    sec3Desc: string;
    btnOpenFullPage: string;
    btnReadAndAccept: string;
  };

  // Presentation Section
  presentation: {
    badge: string;
    title: string;
    subtitle: string;
    card1Title: string;
    card1Desc: string;
    card2Title: string;
    card2Desc: string;
    card3Title: string;
    card3Desc: string;
  };

  // Advantages Section
  advantages: {
    badge: string;
    title: string;
    subtitle: string;
    adv1Title: string;
    adv1Desc: string;
    adv2Title: string;
    adv2Desc: string;
    adv3Title: string;
    adv3Desc: string;
    adv4Title: string;
    adv4Desc: string;
  };

  // Why choose us Section
  whyUs: {
    badge: string;
    title: string;
    subtitle: string;
    point1Title: string;
    point1Desc: string;
    point2Title: string;
    point2Desc: string;
    point3Title: string;
    point3Desc: string;
    point4Title: string;
    point4Desc: string;
  };

  // How it works Section
  howItWorks: {
    badge: string;
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };

  // Where to buy Section
  whereToBuy: {
    badge: string;
    title: string;
    subtitle: string;
  };

  // Testimonials Section
  testimonials: {
    badge: string;
    title: string;
    subtitle: string;
  };

  // FAQ Section
  faq: {
    badge: string;
    title: string;
    subtitle: string;
  };

  // Contact Section
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    btnSubmit: string;
    successMessage: string;
  };

  // Verification Form & Page
  verification: {
    badge: string;
    title: string;
    subtitle: string;
    selectBrand: string;
    enterCode: string;
    btnVerify: string;
    verifying: string;
    secureNotice: string;
  };

  // Tickets Selection Page
  ticketsPage: {
    backHome: string;
    officialBadge: string;
    categoryBadge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allTickets: string;
    btnActivateNow: string;
  };

  // Refund Page
  refundPage: {
    badge: string;
    title: string;
    subtitle: string;
    backHome: string;
    formTitle: string;
    providerLabel: string;
    codeLabel: string;
    amountLabel: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    ibanLabel: string;
    reasonLabel: string;
    commentsLabel: string;
    acceptTerms: string;
    btnSubmit: string;
    submitting: string;
    successTitle: string;
    successDesc: string;
    dossierRef: string;
    btnNewRequest: string;
  };

  // Client Dashboard
  clientSpace: {
    badge: string;
    title: string;
    subtitle: string;
    myVerifications: string;
    myReceipts: string;
    helpSupport: string;
    btnNewActivation: string;
    noReceipts: string;
  };

  // Admin Space
  adminSpace: {
    title: string;
    subtitle: string;
    loginTitle: string;
    loginSubtitle: string;
    username: string;
    password: string;
    btnLogin: string;
    btnLogout: string;
    dashboard: string;
    verifications: string;
    providers: string;
    support: string;
    paymentMethods: string;
  };

  // Footer
  footer: {
    advisoryTitle: string;
    advisoryText: string;
    missionText: string;
    sslEncrypted: string;
    zeroPlaintext: string;
    sectionsTitle: string;
    legalTitle: string;
    terms: string;
    privacy: string;
    legalNotice: string;
    refund: string;
    customerServiceTitle: string;
    contactSupport: string;
    faqLink: string;
    copyright: string;
    language: string;
  };

  // Common UI
  common: {
    back: string;
    close: string;
    copy: string;
    copied: string;
    print: string;
    cancel: string;
    confirm: string;
    save: string;
    loading: string;
    error: string;
    success: string;
    optional: string;
    required: string;
    active: string;
    inactive: string;
  };
}
