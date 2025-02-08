import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageCard from "@/components/ImageCard";
import { GALLERY_IMAGES } from "@/lib/constants/images";
import "./globals.css";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-20 p-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
          {GALLERY_IMAGES.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
