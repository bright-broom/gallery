'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { GalleryImage } from '@/lib/constants/images';
import { GalleryModal } from './GalleryModal';

interface Props {
  images: readonly GalleryImage[];
}

const MotionButton = motion.button;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

export function GalleryGrid({ images }: Props) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;

    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    let newIndex: number;

    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    }

    setSelectedImage(images[newIndex]);
  };

  return (
    <>
      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {images.map((image) => (
          <MotionButton
            key={image.id}
            variants={item}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.97 }}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-gray-100"
            onClick={() => setSelectedImage(image)}
            aria-label={`${image.alt}を拡大表示`}
            type="button"
          >
            <motion.img
              layoutId={`gallery-image-${image.id}`}
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover transition-transform duration-300 will-change-transform group-hover:scale-105"
              loading="lazy"
            />
            <motion.div
              className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10"
              initial={false}
              whileHover={{
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                transition: { duration: 0.2 },
              }}
            />
          </MotionButton>
        ))}
      </motion.div>

      <GalleryModal
        images={images}
        selectedImage={selectedImage}
        onClose={() => setSelectedImage(null)}
        onNavigate={handleNavigate}
      />
    </>
  );
}

export default GalleryGrid;