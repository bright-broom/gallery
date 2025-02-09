import { transitions, variants } from "./common";
import type { TargetAndTransition, Variants } from "framer-motion";

/**
 * ギャラリー機能専用のアニメーション定義
 */
export const animations = {
  // モーダルのフェードイン/アウト
  fadeInOut: variants.fade,

  // スライドアニメーション
  slideAnimation: {
    enter: (direction: number): TargetAndTransition => ({
      x: direction > 0 ? "100vw" : "-100vw",
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      transition: transitions.spring
    },
    exit: (direction: number): TargetAndTransition => ({
      x: direction < 0 ? "100vw" : "-100vw",
      opacity: 0,
      transition: {
        ...transitions.smooth,
        duration: 0.3
      }
    })
  } as const,

  // グリッドコンテナのアニメーション
  container: variants.staggerContainer,

  // グリッドアイテムのアニメーション
  item: variants.fadeInUp,

  // ナビゲーションボタンのアニメーション
  navigationButton: {
    left: {
      rest: { x: 0 },
      hover: { x: -5 }
    },
    right: {
      rest: { x: 0 },
      hover: { x: 5 }
    },
    transition: transitions.spring
  } as const,

  // 閉じるボタンのアニメーション
  closeButton: variants.buttonHover,

  // プログレスインジケーターのアニメーション
  progressIndicator: {
    active: {
      scale: 1.2,
      opacity: 1
    },
    inactive: {
      scale: 1,
      opacity: 0.5
    },
    transition: transitions.spring
  } as const,

  // カードのホバーアニメーション
  card: {
    initial: { scale: 1 },
    hover: {
      scale: 1.03,
      transition: transitions.smooth
    },
    tap: { scale: 0.97 }
  } as Variants,

  // ローディングインジケーター
  loading: variants.loading
} as const;

// GalleryModalで使用する型定義
export type SlideAnimationDirection = number;
