import { Github, Linkedin, Twitter, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-white/5 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="text-2xl font-bold tracking-tighter text-primary mb-2">
              DS<span className="text-foreground">.dev</span>
            </div>
            <p className="text-foreground/50 text-sm">
              Construyendo el futuro de la web, un píxel a la vez.
            </p>
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-foreground/50 hover:text-primary transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="text-foreground/50 hover:text-primary transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-foreground/50 hover:text-primary transition-colors">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-foreground/30 uppercase tracking-widest font-bold">
          <p>© {currentYear} Diana Sofia. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Hecho con <Heart size={12} className="text-red-500 fill-red-500" /> usando React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
