import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function ImageCard({ src }: { src: string }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0 w-full aspect-square relative">
        <Image
          src={src}
          alt="Gallery Image"
          fill
          className="w-full h-auto object-cover"
        />
      </CardContent>
    </Card>
  );
}
