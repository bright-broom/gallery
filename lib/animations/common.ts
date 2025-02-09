import type { Transition, Variants } from "framer-motion";

/**
 * アプリケーション全体で共通して使用するアニメーションの設定
 */

// 共通のトランジション設定
export const transitions = {
  // スプリングアニメーション
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 30
  } as const satisfies Transition,

  // スムーズなイージング
  smooth: {
    type: "tween",
    ease: "easeInOut",
    duration: 0.2
  } as const satisfies Transition,

  // 即時のトランジション
  instant: {
    duration: 0
  } as const satisfies Transition
} as const;

// 共通のインタラクションパターン
export const interactions = {
  // ホバーエフェクト（スケール）
  hover: {
    scale: {
      initial: { scale: 1 },
      hover: { scale: 1.05 },
      tap: { scale: 0.95 }
    },
    translateY: {
      initial: { y: 0 },
      hover: { y: -5 }
    }
  }
} as const;

// 共通のアニメーションバリアント
export const variants = {
  // コンテナのスタガーアニメーション
  staggerContainer: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        ease: "easeInOut"
      }
    }
  } as Variants,

  // 子要素のフェードイン + スライドアップ
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: transitions.spring
    }
  } as Variants,

  // ボタンのホバーエフェクト
  buttonHover: {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    transition: transitions.spring
  } as Variants,

  // ローディングインジケーター
  loading: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: transitions.smooth
  } as Variants,

  // フェードイン/アウト
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  } as Variants
} as const;