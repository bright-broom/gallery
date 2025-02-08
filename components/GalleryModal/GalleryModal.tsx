'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { GalleryImage } from '@/lib/constants/images';

interface Props {
  images: readonly GalleryImage[];
  selectedImage: GalleryImage | null;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

const MotionDialog = motion.dialog;

const fadeInOut = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9,
    transition: {
      duration: 0.2
    }
  },
};

export function GalleryModal({ images, selectedImage, onClose, onNavigate }: Props) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // スワイプ判定の閾値（ピクセル）
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      onNavigate('next');
    }
    if (isRightSwipe) {
      onNavigate('prev');
    }
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onNavigate('prev');
      } else if (e.key === 'ArrowRight') {
        onNavigate('next');
      }
    },
    [onClose, onNavigate]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!selectedImage) return null;

  return (
    <AnimatePresence>
      <MotionDialog
        variants={fadeInOut}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') onClose();
        }}
        aria-modal="true"
        aria-label="画像ビューアー"
        open
      >
        <motion.div
          className="relative max-h-[100vh] max-w-[100vw]"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.stopPropagation();
            }
          }}
          role="presentation"
          variants={scaleUp}
        >
          <motion.img
            key={selectedImage.id}
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="h-auto max-h-[100vh] w-auto max-w-[100vw] rounded-lg object-contain shadow-2xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            layoutId={`gallery-image-${selectedImage.id}`}
          />

          {/* ナビゲーションボタン */}
          <div className="absolute inset-y-0 left-0 flex w-1/4 items-center justify-start">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('prev');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onNavigate('prev');
              }}
              type="button"
              className="rounded-full bg-black/20 p-4 text-white opacity-75 backdrop-blur-sm transition-all hover:bg-black/40 hover:opacity-100"
              aria-label="前の画像"
            >
              ←
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex w-1/4 items-center justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('next');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onNavigate('next');
              }}
              type="button"
              className="rounded-full bg-black/20 p-4 text-white opacity-75 backdrop-blur-sm transition-all hover:bg-black/40 hover:opacity-100"
              aria-label="次の画像"
            >
              →
            </button>
          </div>
        </motion.div>
      </MotionDialog>
    </AnimatePresence>
  );
}