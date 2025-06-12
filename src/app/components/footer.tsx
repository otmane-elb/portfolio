'use client';
export default function Footer() {
  return (
    <footer className="space-y-6 border-t border-gray-800 pt-12">
      <h3 className="text-lg font-semibold">Let&apos;s Connect</h3>
      <p className="text-gray-400 max-w-lg leading-relaxed">
        If you want to get in touch with me about something or just to say hi, reach out on social media or send me an email.
      </p>

      <div className="flex items-center gap-6 text-2xl text-white">
        <a href="https://github.com/otmane-elb" target="_blank" aria-label="GitHub" className="hover:text-gray-300">
          <i className="fa-brands fa-github"></i>
        </a>
        <a href="https://x.com/elbaghzaoui" target="_blank" aria-label="X (Twitter)" className="hover:text-gray-300">
          <i className="fa-brands fa-x-twitter"></i>
        </a>
        <a href="https://www.linkedin.com/in/otmane-el-baghazaoui/" target="_blank" aria-label="LinkedIn" className="hover:text-gray-300">
          <i className="fa-brands fa-linkedin"></i>
        </a>
        <a href="mailto:otmane.elbaghzaoui@gmail.com" aria-label="Email" className="hover:text-gray-300">
          <i className="fa-solid fa-envelope"></i>
        </a>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 pt-10">
        <p>© {new Date().getFullYear()} | Otmane El Baghazaoui</p>
        <a href="#" className="flex items-center gap-2 border border-gray-600 rounded px-3 py-1 hover:bg-white/5 transition text-white">
          <span className="text-sm">↑</span> Back to top
        </a>
      </div>
    </footer>
  );
}
