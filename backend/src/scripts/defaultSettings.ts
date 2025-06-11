export const defaultSettings = [
  // General Settings
  { group: "general", key: "shopName", value: "Coffee & Beans" },
  {
    group: "general",
    key: "shopDescription",
    value: "Serving freshly brewed coffee daily.",
  },
  { group: "general", key: "shopEmail", value: "support@coffeebeans.com" },
  { group: "general", key: "shopPhone", value: "+1 555-123-4567" },
  {
    group: "general",
    key: "shopAddress",
    value: "123 Roast St, Brewtown, USA",
  },

  // Homepage Customization
  {
    group: "homepage",
    key: "bannerText",
    value: "Freshly Roasted, Brewed with Love.",
  },
  { group: "homepage", key: "heroImage", value: "/images/hero-coffee.jpg" },

  // Theme & Appearance
  { group: "themeAppearance", key: "primaryColor", value: "#7C3AED" },
  { group: "themeAppearance", key: "secondaryColor", value: "#FBBF24" },
  { group: "themeAppearance", key: "font", value: "Inter" },
  { group: "themeAppearance", key: "darkMode", value: false },
  { group: "themeAppearance", key: "logo", value: "/images/logo.svg" },

  // Delivery & Pickup Settings
  { group: "deliveryPickup", key: "pickupEnabled", value: true },
  { group: "deliveryPickup", key: "deliveryEnabled", value: true },
  { group: "deliveryPickup", key: "deliveryFee", value: 4.99 },
  {
    group: "deliveryPickup",
    key: "pickupTimeSlots",
    value: ["10:00 AM", "1:00 PM", "4:00 PM"],
  },

  // Payment Settings
  { group: "payment", key: "currency", value: "USD" },
  { group: "payment", key: "paypalEnabled", value: true },
  { group: "payment", key: "stripeEnabled", value: false },
  {
    group: "payment",
    key: "manualPaymentInstructions",
    value: "Pay in store upon pickup.",
  },

  // Tax & Invoice Settings
  { group: "taxInvoice", key: "applyVAT", value: true },
  { group: "taxInvoice", key: "VATPercentage", value: 10 },
  {
    group: "taxInvoice",
    key: "invoiceFooterNote",
    value: "Thank you for your order!",
  },

  // Notifications & Subscriptions
  { group: "notifications", key: "emailSubscriptionEnabled", value: true },
  { group: "notifications", key: "orderConfirmationEmail", value: true },
  { group: "notifications", key: "smsNotifications", value: false },

  // Security & Access
  { group: "security", key: "requireLoginToCheckout", value: true },
  { group: "security", key: "adminTwoFactorEnabled", value: true },
  { group: "security", key: "sessionTimeoutMinutes", value: 30 },

  // SEO & Social Media
  { group: "seo", key: "metaTitle", value: "Coffee & Beans - Freshly Brewed" },
  {
    group: "seo",
    key: "metaDescription",
    value: "Discover our handcrafted coffee and brewing gear.",
  },
  { group: "seo", key: "ogImage", value: "/images/og-coffee.jpg" },
  { group: "seo", key: "twitterHandle", value: "@coffeebeans" },
  {
    group: "seo",
    key: "facebookPage",
    value: "https://facebook.com/coffeebeans",
  },

  // Custom Pages
  {
    group: "customPages",
    key: "aboutPageContent",
    value: "<p>We love coffee and community.</p>",
  },
  {
    group: "customPages",
    key: "termsPageContent",
    value: "<p>Terms and conditions apply...</p>",
  },
  {
    group: "customPages",
    key: "privacyPageContent",
    value: "<p>Your privacy is important to us.</p>",
  },

  // FAQ
  {
    group: "faq",
    key: "faqList",
    value: [
      {
        question: "What are your business hours?",
        answer: "We’re open daily from 8:00 AM to 8:00 PM.",
      },
      {
        question: "Do you offer delivery?",
        answer: "Yes, we offer local delivery within a 5-mile radius.",
      },
      {
        question: "Can I customize my drink?",
        answer:
          "Absolutely! Select your milk, sweetener, and add extras at checkout.",
      },
      {
        question: "Do you sell coffee beans?",
        answer:
          "Yes, our house-roasted beans are available in-store and online.",
      },
      {
        question: "Do you have vegan options?",
        answer: "Yes, we offer oat, almond, and soy milk, plus vegan snacks.",
      },
    ],
  },

  // Internal Use
  { group: "__internal", key: "defaultsSeeded", value: true },
];
