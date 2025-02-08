'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md p-4 fixed top-0 left-0">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">MySite</Link>
        <nav>
          <Button variant="outline">ログイン</Button>
        </nav>
      </div>
    </header>
  );
}
