'use client'

import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { siteConfig } from "@/lib/config"

const SOCIAL_ICONS = {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} as const

export default function Footer() {
  return (
    <footer className="bg-background py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          {renderLogo()}
          {renderNavigation()}
          {renderSocialLinks()}
          {renderCopyright()}
        </div>
      </div>
    </footer>
  )
}

// ロゴ表示
const renderLogo = () => (
  <div className="mb-8 rounded-full bg-primary/10 p-8">
    <Icons.logo className="icon-class w-6" />
  </div>
)

// ナビゲーションメニュー
const renderNavigation = () => (
  <nav className="mb-8 flex flex-wrap justify-center gap-6">
    {siteConfig.navigation.map((item) => (
      <a key={item.href} href={item.href} className="hover:text-primary">
        {item.name}
      </a>
    ))}
  </nav>
)

// ソーシャルリンク
const renderSocialLinks = () => (
  <div className="mb-8 flex space-x-4">
    {siteConfig.socialLinks.map(({ icon, name, href }) => {
      const Icon = SOCIAL_ICONS[icon as keyof typeof SOCIAL_ICONS]
      return Icon ? (
        <Button key={name} variant="outline" size="icon" className="rounded-full" asChild>
          <a href={href}>
            <Icon className="h-4 w-4" />
            <span className="sr-only">{name}</span>
          </a>
        </Button>
      ) : null
    })}
  </div>
)

// 著作権表示
const renderCopyright = () => (
  <div className="text-center">
    <p className="text-sm text-muted-foreground">
      © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
    </p>
  </div>
)
