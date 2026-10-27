// AIAndBeyond Partner & Affiliate Configuration
// When you receive your unique referral/affiliate links, simply replace the 'url' values below.
// If you don't have a referral link yet, clean official URLs are provided as safe fallbacks.

export const affiliates = {
  hostinger: {
    name: "Hostinger",
    tagline: "Best value web hosting for beginners & students",
    description: "Start your blog or website with high-speed LiteSpeed servers, free domain, SSL, and 1-click WordPress install.",
    cta: "Claim Hosting Deal (Up to 75% Off)",
    // Replace with your Hostinger tracking URL from hostinger.com/affiliates:
    url: "https://www.hostinger.in",
    image: "/hostinger.webp",
    badge: "Top Pick (40-60% Off)",
    category: "Web Hosting"
  },
  canva: {
    name: "Canva Pro",
    tagline: "Design viral Pinterest pins and social graphics",
    description: "Access 100M+ premium templates, 1-click background remover, bulk create, and social scheduling. Free trial included.",
    cta: "Try Canva Pro Free",
    // Canva Pro URL:
    url: "https://www.canva.com/pro/",
    image: "/canva.webp",
    badge: "Free 30-Day Trial",
    category: "Design Tools"
  },
  fiverr: {
    name: "Fiverr",
    tagline: "Monetize AI skills or hire freelance talent",
    description: "The world's largest marketplace to sell AI prompt writing, n8n automations, and custom chatbots to global clients.",
    cta: "Explore Fiverr Marketplace",
    // Replace with your Fiverr affiliate URL:
    url: "https://www.fiverr.com",
    image: "/makemoneywithai.webp",
    badge: "Earn in USD",
    category: "Freelancing"
  },
  notion: {
    name: "Notion AI",
    tagline: "Build a second brain & organize study workflows",
    description: "All-in-one workspace for notes, project management, and study planners with built-in AI summarization and writing.",
    cta: "Get Notion for Free",
    // Replace with your Notion affiliate URL:
    url: "https://www.notion.so",
    image: "/productivity.webp",
    badge: "Free Plan Available",
    category: "Productivity"
  },
  coursera: {
    name: "Coursera",
    tagline: "Master generative AI & computer science",
    description: "Accredited AI, machine learning, and programming certificates from Stanford, Google, and IBM. Free to audit.",
    cta: "Browse Free AI Courses",
    // Replace with your Coursera/Impact affiliate URL:
    url: "https://www.coursera.org",
    image: "/tutorials.webp",
    badge: "Free to Audit",
    category: "Learning"
  },
  nordvpn: {
    name: "NordVPN",
    tagline: "Military-grade online privacy & threat protection",
    description: "Protect your data on public college WiFi, block malicious trackers, and access geo-restricted tech research tools.",
    cta: "Get NordVPN Protection",
    // Replace with your NordVPN affiliate URL:
    url: "https://nordvpn.com",
    image: "/nord_vpn.webp",
    badge: "Editor's Pick",
    category: "Security"
  }
}

export const categoryAffiliate = {
  "AI Tools": affiliates.coursera,
  "Web Hosting": affiliates.hostinger,
  "AI Agents & Automation": affiliates.coursera,
  "Tutorials": affiliates.coursera,
  "Productivity": affiliates.notion,
  "MakeMoneyWithAI": affiliates.fiverr,
}
