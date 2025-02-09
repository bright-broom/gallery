import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { variants, transitions } from "@/lib/animations/common";

interface MotionImageProps {
  src: string;
  alt: string;
  id: string;
  className?: string;
  onClick?: () => void;
  layoutId?: string;
  containerClassName?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  loading?: "lazy" | "eager";
  imageStyle?: React.CSSProperties;
}

export function MotionImage({
  src,
  alt,
  id,
  className,
  onClick,
  layoutId = `gallery-image-${id}`,
  containerClassName,
  fill = true,
  width,
  height,
  priority = false,
  loading = "lazy",
  imageStyle
}: MotionImageProps) {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // エラー時のフォールバックUI
  if (isError) {
    return (
      <motion.div
        layoutId={layoutId}
        className={`relative flex items-center justify-center bg-gray-100 ${containerClassName || ''}`}
        style={{ aspectRatio: "1" }}
        variants={variants.fade}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center p-4">
          <p className="text-gray-500">画像の読み込みに失敗しました</p>
          <button
            type="button"
            onClick={() => setIsError(false)}
            className="mt-2 text-blue-500 hover:underline"
          >
            再読み込み
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layoutId={layoutId}
      className={`relative ${containerClassName || ''}`}
      onClick={onClick}
      initial={false}
    >
      {/* ローディング状態のオーバーレイ */}
      {isLoading && (
        <motion.div
          className="absolute inset-0 bg-gray-100"
          variants={variants.loading}
          initial="initial"
          animate="animate"
          exit="exit"
        />
      )}

      <Image
        src={src}
        alt={alt}
        className={`transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        } ${className || ""}`}
        fill={fill}
        width={fill ? undefined : (width ?? 640)}
        height={fill ? undefined : (height ?? 640)}
        style={{ ...(fill ? { objectFit: "cover" } : {}), ...imageStyle }}
        priority={priority}
        loading={priority ? undefined : loading}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          setIsError(true);
          setIsLoading(false);
        }}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        quality={90}
      />

      {onClick && !isLoading && (
        <motion.div
          className="absolute inset-0 bg-black/0"
          initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          whileHover={{
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            transition: transitions.smooth
          }}
        />
      )}
    </motion.div>
  );
}