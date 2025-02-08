'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { siteConfig } from "@/lib/config"

export default function Header() {
  const { isLoading, handleLogin } = useAuth()

  return (
    <header className="w-full bg-white shadow-md p-4 fixed top-0 left-0">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          {siteConfig.name}
        </Link>
        <nav className="flex items-center gap-6">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
          <Button 
            variant="outline"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? "ログイン中..." : "ログイン"}
          </Button>
        </nav>
      </div>
    </header>
  )
}
