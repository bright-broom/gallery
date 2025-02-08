'use client'

import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { useAuth } from "@/hooks/use-auth"
import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"

export default function Header() {
  const { isLoading, handleLogin } = useAuth()

  return (
    <header className="w-full bg-white/50 backdrop-blur-md p-3 fixed top-0 left-0 z-50">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          {siteConfig.name}
        </Link>

        {/* デスクトップナビゲーション */}
        <nav className="hidden md:flex items-center gap-6">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm hover:text-primary transition-colors"
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

        {/* モバイルナビゲーション */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="メニューを開く">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[320px]">
            <SheetHeader>
              <SheetTitle>{siteConfig.name}</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-6">
              {siteConfig.navigation.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-base hover:text-primary transition-colors",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                      "py-2 px-4 rounded-md hover:bg-muted"
                    )}
                  >
                    {item.name}
                  </Link>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Button 
                  variant="outline"
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="w-full mt-2"
                >
                  {isLoading ? "ログイン中..." : "ログイン"}
                </Button>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
