import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GalleryGrid } from "@/components/GalleryModal/GalleryGrid";
import { GALLERY_IMAGES } from "@/lib/constants/images";

export default function Home() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-20">
        <GalleryGrid images={GALLERY_IMAGES} />
      </main>
      <Footer />
    </>
  );
}
