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
        
        <div className="w-px h-6 bg-white/10 mx-2"></div>
        
        <a href="/files/cv-en.pdf" download aria-label="Download CV in English" title="Download CV in English" className="text-neutral-500 transition-colors hover:text-white p-2 text-sm font-medium hover:bg-white/5 rounded-md flex items-center gap-2">
          <i className="fa-solid fa-file-pdf"></i> EN
        </a>
        <a href="/files/cv-fr.pdf" download aria-label="Download CV in French" title="Download CV in French" className="text-neutral-500 transition-colors hover:text-white p-2 text-sm font-medium hover:bg-white/5 rounded-md flex items-center gap-2">
          <i className="fa-solid fa-file-pdf"></i> FR
        </a>
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
