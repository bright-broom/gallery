'use client';

import { useEffect, useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import type { Media } from '@/types';
import { animations } from '@/lib/animations/gallery';
import { MotionImage } from '../common/MotionImage';

interface Props {
  /** 表示するメディアの配列 */
  media: Media[];
  /** 現在選択中のメディア */
  selectedMedia: Media | null;
  /** モーダルを閉じる際のコールバック */
  onClose: () => void;
  /** メディア間のナビゲーション用コールバック */
  onNavigate: (direction: 'prev' | 'next') => void;
}

const MotionDialog = motion.dialog;

// スワイプ検出の設定
const swipeConfidenceThreshold = 5000; // より低い値で感度を上げる
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

// スワイプのアニメーション設定
const swipeTransition = {
  type: "spring",
  stiffness: 400,
  damping: 40,
  mass: 1
};

export function GalleryModal({ media, selectedMedia, onClose, onNavigate }: Props) {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * スワイプによるナビゲーション処理
   * 速度と移動距離に基づいてナビゲーションを判定
   */
  const paginate = (newDirection: number) => {
    if (newDirection > 0) {
      onNavigate('next');
    } else {
      onNavigate('prev');
    }
    setPage([page + newDirection, newDirection]);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  /**
   * キーボードナビゲーションの処理
   * ESC: モーダルを閉じる
   * 左右矢印: メディア間のナビゲーション
   */
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

  // キーボードイベントリスナーの設定
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // メディアのプリロード処理
  useEffect(() => {
    if (!selectedMedia) return;

    setIsLoading(true);
    const img = new Image();
    img.src = selectedMedia.src;
    img.onload = () => setIsLoading(false);
    img.onerror = () => setIsLoading(false);
  }, [selectedMedia]);

  if (!selectedMedia) return null;

  /**
   * メディアコンテンツのレンダリング
   */
const renderMedia = () => {
  return (
    <MotionImage
      src={selectedMedia.src}
      alt={selectedMedia.alt}
      id={selectedMedia.id}
      layoutId={`gallery-media-${selectedMedia.id}`}
      className="transition-transform"
      containerClassName="flex items-center justify-center w-screen h-screen"
      fill={false}
      width={2560}
      height={1440}
      priority={true}
      imageStyle={{
        width: "100%",
        height: "100%",
        maxWidth: "100vw",
        maxHeight: "100vh",
        margin: "0 auto",
        objectFit: "contain"
      }}
    />
  );
};

  return (
    <AnimatePresence>
      <MotionDialog
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={animations.fadeInOut}
        className="fixed top-[-3.9vh] left-1/2 transform -translate-x-1/2 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md w-[100vw] h-[100vh]"
        onClick={onClose}
        aria-modal="true"
        aria-label="画像ビューアー"
        open
      >
        <motion.div
          className="relative flex h-full w-full items-center justify-center"
          onClick={(e) => e.stopPropagation()}
          role="presentation"
        >
          <motion.div
            key={selectedMedia.id}
            custom={direction}
            variants={animations.slideAnimation}
            initial="enter"
            animate="center"
            exit="exit"
            transition={swipeTransition}
            drag="x"
            dragConstraints={{ left: -150, right: 150 }}
            dragElastic={1}
            whileDrag={{ scale: 0.95 }}
            onDragEnd={handleDragEnd}
            className="relative transform-gpu"
            style={{
              touchAction: 'none',
            }}
          >
            {/* ローディングインジケーター */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  variants={animations.loading}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm"
                >
                  <div className="relative h-14 w-14">
                    <div className="absolute inset-0 animate-ping rounded-full bg-white/30" />
                    <div className="absolute inset-0 animate-spin rounded-full border-4 border-gray-300 border-t-white" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* メディアコンテンツ */}
            <motion.div
              animate={{ opacity: isLoading ? 0.5 : 1 }}
              transition={{ duration: 0.2 }}
            >
              {renderMedia()}
            </motion.div>
          </motion.div>

          {/* ナビゲーションボタン */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none px-4 md:px-8 z-50">
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('prev');
              }}
              type="button"
              className="group rounded-full bg-black/30 p-3 md:p-4 text-white opacity-80 backdrop-blur-md transition-all hover:bg-black/50 hover:opacity-100 pointer-events-auto z-50"
              aria-label="前の画像"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                initial={false}
                animate="rest"
                whileHover="hover"
                variants={animations.navigationButton.left}
                transition={animations.navigationButton.transition}
                className="block text-xl md:text-2xl"
              >
                ←
              </motion.span>
            </motion.button>
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('next');
              }}
              type="button"
              className="group rounded-full bg-black/30 p-3 md:p-4 text-white opacity-80 backdrop-blur-md transition-all hover:bg-black/50 hover:opacity-100 pointer-events-auto z-50"
              aria-label="次の画像"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                initial={false}
                animate="rest"
                whileHover="hover"
                variants={animations.navigationButton.right}
                transition={animations.navigationButton.transition}
                className="block text-xl md:text-2xl"
              >
                →
              </motion.span>
            </motion.button>
          </div>

          {/* プログレスインジケーター */}
          <div className="absolute bottom-6 md:bottom-8 left-1/2 flex -translate-x-1/2 gap-1.5 md:gap-2 px-4 py-2 rounded-full bg-black/20 backdrop-blur-md">
            {media.map((item) => (
              <motion.div
                key={item.id}
                className={`h-1 md:h-1.5 w-6 md:w-8 rounded-full transition-colors ${
                  item.id === selectedMedia.id ? 'bg-white' : 'bg-white/30'
                }`}
                initial={false}
                animate={item.id === selectedMedia.id ? "active" : "inactive"}
                variants={animations.progressIndicator}
                transition={animations.progressIndicator.transition}
                whileHover={{ scale: 1.1 }}
              />
            ))}
          </div>
        </motion.div>

        {/* 閉じるボタン */}
        <motion.button
          onClick={onClose}
          className="absolute right-4 md:right-6 top-4 md:top-6 z-[60] flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-black/30 text-xl md:text-2xl font-medium text-white/90 shadow-lg backdrop-blur-md transition-all hover:bg-black/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="ビューアーを閉じる"
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          variants={animations.closeButton}
          type="button"
        >
          ×
        </motion.button>
      </MotionDialog>
    </AnimatePresence>
  );
}

export default GalleryModal;