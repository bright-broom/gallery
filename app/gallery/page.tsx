import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageCard from "@/components/ImageCard";

const images = [
  "/arino.webp",
  "/image_002.webp",
  "/image_004.webp",
  "/image_006.webp",
  "/image_007.webp",
  "/image_017.webp",
];

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main className="p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Gallery</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
          {images.map((src) => (
            <ImageCard key={src} src={src} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
