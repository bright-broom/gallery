import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { GalleryImage } from "@/lib/constants/images";

interface ImageCardProps {
  image: GalleryImage;
}

export default function ImageCard({ image }: ImageCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0 w-full aspect-square relative">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="w-full h-auto object-cover"
        />
      </CardContent>
    </Card>
  );
}
