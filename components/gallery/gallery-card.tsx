import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Media } from "@/types";
import { motion } from "framer-motion";
import { MotionImage } from "../common/MotionImage";
import { animations } from "@/lib/animations/gallery";

interface GalleryCardProps {
  /** 表示するメディア情報 */
  media: Media;
  /** クリック時のコールバック関数 */
  onClick?: () => void;
  /** タイトルを表示するかどうか。デフォルトはtrue */
  showTitle?: boolean;
}

export function GalleryCard({ media, onClick, showTitle = true }: GalleryCardProps) {
  return (
    <motion.div
      className="overflow-hidden cursor-pointer group"
      variants={animations.card}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
    >
      <Card className="border-0 bg-transparent transition-all duration-300 hover:shadow-lg">
        <CardContent className="relative p-0 w-full aspect-square overflow-hidden rounded-lg">
          <div className="relative w-full h-full overflow-hidden rounded-lg">
            <MotionImage
              src={media.src}
              alt={media.alt}
              id={media.id}
              onClick={onClick}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              containerClassName="w-full h-full"
              priority={false}
              loading="lazy"
              layoutId={`gallery-media-${media.id}`}
            />
          </div>
        </CardContent>
        {showTitle && (
          <CardFooter className="px-1 py-3">
            <h3 className="w-full text-base font-medium tracking-tight text-gray-900 line-clamp-1 text-center">
              {media.title || media.alt}
            </h3>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}

export default GalleryCard;