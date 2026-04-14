'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="flex justify-between items-center">
      <Link href="/" className="text-lg font-semibold hover:text-white">
        Otmane El Baghazaoui
      </Link>
      <nav className="space-x-6 text-gray-400 text-sm">
        <Link href="/experience" className="hover:text-white">Experience</Link>
        <Link href="/projects" className="hover:text-white">Projects</Link>
      </nav>
    </header>
  );
}
