import { useCallback } from 'react';
import type { Media } from '@/types';

export function useGalleryNavigation(
  mediaItems: Media[],
  selectedMedia: Media | null,
  setSelectedMedia: (media: Media) => void
) {
  const handleNavigate = useCallback(
    (direction: 'prev' | 'next') => {
      if (!selectedMedia) return;

      const currentIndex = mediaItems.findIndex((item) => item.id === selectedMedia.id);
      let newIndex: number;

      if (direction === 'prev') {
        newIndex = currentIndex === 0 ? mediaItems.length - 1 : currentIndex - 1;
      } else {
        newIndex = currentIndex === mediaItems.length - 1 ? 0 : currentIndex + 1;
      }

      setSelectedMedia(mediaItems[newIndex]);
    },
    [mediaItems, selectedMedia, setSelectedMedia]
  );

  return handleNavigate;
}