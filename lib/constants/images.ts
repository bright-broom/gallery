export const GALLERY_IMAGES = [
  {
    id: 'image_1',
    src: '/images/gallery/image_001.webp',
    alt: 'Gallery Image 1',
  },
  {
    id: 'image_2',
    src: '/images/gallery/image_002.webp',
    alt: 'Gallery Image 2',
  },
  {
    id: 'image_3',
    src: '/images/gallery/image_003.webp',
    alt: 'Gallery Image 3',
  },
  {
    id: 'image_4',
    src: '/images/gallery/image_004.webp',
    alt: 'Gallery Image 4',
  },
  {
    id: 'image_5',
    src: '/images/gallery/image_005.webp',
    alt: 'Gallery Image 5',
  },
  {
    id: 'image_6',
    src: '/images/gallery/image_006.webp',
    alt: 'Gallery Image 6',
  },
] as const;

export type GalleryImage = typeof GALLERY_IMAGES[number];