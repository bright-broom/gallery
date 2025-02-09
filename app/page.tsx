import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GalleryGrid } from "@/components/gallery/gallery-grid";

export default function Home() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-20">
        <GalleryGrid />
      </main>
      <Footer />
    </>
  );
}
