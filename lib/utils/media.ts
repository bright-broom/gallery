import type { Media, SortOrder } from '@/types'

/**
 * メディアのソート関数
 * 指定されたソート順に基づいてメディアをソートします
 */
export const sortMedia = (media: Media[], order: SortOrder): Media[] => {
  const sorted = [...media]
  switch (order) {
    case 'newest':
      return sorted.reverse()
    case 'oldest':
      return sorted
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    default:
      return sorted
  }
}