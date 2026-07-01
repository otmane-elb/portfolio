'use client';

export default function Footer() {
  return (
    <footer className="mt-32 mb-12 border-t border-white/5 pt-12 flex flex-col items-center text-center space-y-8">
      <div className="space-y-3">
        <h3 className="text-xl font-semibold tracking-tight text-white">Let&apos;s Connect</h3>
        <p className="text-neutral-400 max-w-md mx-auto text-sm leading-relaxed">
          Whether you want to build something amazing or just say hi, feel free to reach out. I&apos;m always open to discussing new engineering challenges.
        </p>
      </div>

      <div className="flex items-center justify-center gap-5">
        <a href="https://github.com/otmane-elb" target="_blank" aria-label="GitHub" className="text-neutral-500 transition-colors hover:text-white p-2 rounded-full hover:bg-white/5">
          <i className="fa-brands fa-github text-2xl"></i>
        </a>
        <a href="https://x.com/elbaghzaoui" target="_blank" aria-label="X (Twitter)" className="text-neutral-500 transition-colors hover:text-white p-2 rounded-full hover:bg-white/5">
          <i className="fa-brands fa-x-twitter text-2xl"></i>
        </a>
        <a href="https://www.linkedin.com/in/otmane-el-baghazaoui/" target="_blank" aria-label="LinkedIn" className="text-neutral-500 transition-colors hover:text-white p-2 rounded-full hover:bg-white/5">
          <i className="fa-brands fa-linkedin text-2xl"></i>
        </a>
        <a href="mailto:otmane.elbaghzaoui@gmail.com" aria-label="Email" className="text-neutral-500 transition-colors hover:text-white p-2 rounded-full hover:bg-white/5">
          <i className="fa-solid fa-envelope text-2xl"></i>
        </a>
        
      </div>

      {/* CV Download Section */}
      <div className="w-full max-w-md mx-auto space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 text-center">Download my CV</p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="/files/cv-en.pdf"
            download
            aria-label="Download CV in English"
            title="Download CV in English"
            className="group inline-flex items-center gap-2.5 rounded-xl border border-blue-600/20 bg-blue-600/5 px-5 py-3 text-sm font-semibold text-blue-700 transition-all duration-300 hover:bg-blue-600/10 hover:border-blue-600/40 hover:shadow-[0_0_20px_rgba(29,78,216,0.10)] hover:scale-105 active:scale-95"
          >
            <i className="fa-solid fa-download text-base group-hover:animate-bounce"></i>
            CV — English
          </a>
          <a
            href="/files/cv-fr.pdf"
            download
            aria-label="Download CV in French"
            title="Download CV in French"
            className="group inline-flex items-center gap-2.5 rounded-xl border border-blue-600/20 bg-blue-600/5 px-5 py-3 text-sm font-semibold text-blue-700 transition-all duration-300 hover:bg-blue-600/10 hover:border-blue-600/40 hover:shadow-[0_0_20px_rgba(29,78,216,0.10)] hover:scale-105 active:scale-95"
          >
            <i className="fa-solid fa-download text-base group-hover:animate-bounce"></i>
            CV — Français
          </a>
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center text-xs text-neutral-500 pt-8 border-t border-white/5 gap-4">
        <p>© {new Date().getFullYear()} Otmane El Baghazaoui. All rights reserved.</p>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 hover:text-neutral-300 transition-colors group">
          Back to top <span className="group-hover:-translate-y-1 transition-transform duration-300">↑</span>
        </button>
      </div>
    </footer>
  );
}
