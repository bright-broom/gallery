export const siteConfig = {
  name: "Portfolio",
  description: "Portfolio site",
  navigation: [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Products", href: "#products" },
    { name: "Contact", href: "#contact" },
  ],
  features: [
    { title: "高速", description: "Next.js + Turbopackで超高速表示" },
    { title: "柔軟", description: "コンポーネントベースで簡単拡張" },
    { title: "モダン", description: "最新技術を活用した開発環境" },
  ],
  socialLinks: [
    { name: "Facebook", href: "#", icon: "Facebook" },
    { name: "Twitter", href: "#", icon: "Twitter" },
    { name: "Instagram", href: "https://www.instagram.com/aki.h_portfolio/", icon: "Instagram" },
    { name: "LinkedIn", href: "#", icon: "Linkedin" },
  ],
}

export type SiteConfig = typeof siteConfig