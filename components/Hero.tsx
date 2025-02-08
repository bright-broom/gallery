import { Button } from "@/components/ui/button";
import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 px-6">
      <h2 className="text-4xl font-bold mb-4">Welcome to MySite 🚀</h2>
      <p className="text-gray-600 mb-6">Next.js + ShadCN + Tailwind CSS で開発</p>
      <Link href="/gallery">
      <Button size="lg">今すぐ始める</Button>
      </Link>
    </section>
  );
}
