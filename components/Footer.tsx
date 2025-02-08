'use client'

import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { siteConfig } from "@/lib/config"
import { useSubscribe } from "@/hooks/use-subscribe"
import type { FormEvent } from "react"
import type { SocialLink } from "@/types"

const SOCIAL_ICONS = {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} as const

export default function Footer() {
  const { isLoading, error, handleSubscribe } = useSubscribe()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    await handleSubscribe({ email })
  }

  const getSocialIcon = (iconName: keyof typeof SOCIAL_ICONS) => {
    return SOCIAL_ICONS[iconName] || null
  }

  return (
    <footer className="bg-background py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          <div className="mb-8 rounded-full bg-primary/10 p-8">
            <Icons.logo className="icon-class w-6" />
          </div>
          <nav className="mb-8 flex flex-wrap justify-center gap-6">
            {siteConfig.navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-primary"
              >
                {item.name}
              </a>
            ))}
          </nav>
          <div className="mb-8 flex space-x-4">
            {siteConfig.socialLinks.map((social) => {
              const Icon = getSocialIcon(social.icon as keyof typeof SOCIAL_ICONS)
              if (!Icon) return null

              return (
                <Button
                  key={social.name}
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  asChild
                >
                  <a href={social.href}>
                    <Icon className="h-4 w-4" />
                    <span className="sr-only">{social.name}</span>
                  </a>
                </Button>
              )
            })}
          </div>
          <div className="mb-8 w-full max-w-md">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
              <div className="flex space-x-2">
                <div className="flex-grow">
                  <Label htmlFor="email" className="sr-only">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    className="rounded-full"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="rounded-full"
                  disabled={isLoading}
                >
                  {isLoading ? "送信中..." : "Subscribe"}
                </Button>
              </div>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
            </form>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}