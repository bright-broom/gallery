import type { ReactNode } from 'react'
import type { LucideIcon, LucideProps } from 'lucide-react'

export interface NavItem {
  name: string
  href: string
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

// メディアの型定義
export interface Media {
  id: string
  alt: string
  title: string
  type: 'image'
  src: string
}

// ソート順の定義
export type SortOrder = 'newest' | 'oldest' | 'title'

// Lucideアイコンの型定義
export type IconType = LucideIcon
export type IconProps = LucideProps