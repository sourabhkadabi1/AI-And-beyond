export const affiliates = {
  hostinger: {
    name: "Hostinger",
    tagline: "Best value web hosting for beginners",
    description: "Start your blog or website for as low as ₹69/month. Includes free domain, SSL, and AI website builder.",
    cta: "Get 75% Off Hosting",
    url: "YOUR_HOSTINGER_AFFILIATE_LINK",
    image: "/hostinger.png",
    badge: "Most Popular",
    category: "Web Hosting"
  },
  canva: {
    name: "Canva Pro",
    tagline: "Design Pinterest pins that actually get clicks",
    description: "Access 100M+ templates, remove backgrounds, schedule social posts. Free trial available.",
    cta: "Try Canva Pro Free",
    url: "YOUR_CANVA_AFFILIATE_LINK",
    image: "/canva.png",
    badge: "Free Trial",
    category: "Design Tools"
  },
  nordvpn: {
    name: "NordVPN",
    tagline: "Stay secure and private online",
    description: "Protect your data on public WiFi, access geo-blocked content, and browse without tracking.",
    cta: "Get NordVPN Deal",
    url: "YOUR_NORDVPN_AFFILIATE_LINK",
    image: "/nord_vpn.png",
    badge: "Editor's Pick",
    category: "Security"
  },
  fiverr: {
    name: "Fiverr",
    tagline: "Find freelance services or sell your skills",
    description: "Hire designers, writers, developers — or create a gig and earn from your own skills.",
    cta: "Explore Fiverr",
    url: "YOUR_FIVERR_AFFILIATE_LINK",
    image: "/fiverr.png",
    badge: null,
    category: "Freelancing"
  },
  coursera: {
    name: "Coursera",
    tagline: "Learn AI and tech from top universities",
    description: "Courses from Google, IBM, Stanford. Many are free to audit. Get certified in AI, ML, and more.",
    cta: "Browse Free Courses",
    url: "YOUR_COURSERA_AFFILIATE_LINK",
    image: "/coursera.png",
    badge: "Free to Audit",
    category: "Learning"
  }
}

export const categoryAffiliate = {
  "AI Tools": affiliates.coursera,
  "Web Hosting": affiliates.hostinger,
  "AI Agents & Automation": affiliates.coursera,
  "Tutorials": affiliates.coursera,
  "Productivity": affiliates.canva,
  "MakeMoneyWithAI": affiliates.coursera,
}
