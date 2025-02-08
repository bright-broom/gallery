import type { ReactNode } from 'react'
import type { LucideIcon, LucideProps } from 'lucide-react'

export interface NavItem {
  name: string
  href: string
}

export interface FeatureItem {
  title: string
  description: string
}

export interface SocialLink {
  name: string
  href: string
  icon: keyof typeof import('lucide-react')
}

export interface LayoutProps {
  children: ReactNode
}

export interface SubscribeFormData {
  email: string
}

// Lucideアイコンの型定義
export type IconType = LucideIcon
export type IconProps = LucideProps