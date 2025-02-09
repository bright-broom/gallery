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
  socialLinks: [
    { name: "Facebook", href: "https://www.facebook.com", icon: "Facebook" },
    { name: "Twitter", href: "https://x.com/home", icon: "Twitter" },
    { name: "Instagram", href: "https://www.instagram.com", icon: "Instagram" },
    { name: "LinkedIn", href: "https://www.linkedin.com", icon: "Linkedin" },
  ],
}

export type SiteConfig = typeof siteConfig