import { motion } from 'motion/react';
import { Download, Mail, ArrowRight } from 'lucide-react';
import dianitaAvatar from '../assets/Dianita_Avatar.png';

export default function Hero() {
  return (
    <section id="inicio" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6"
          >
            Disponible para nuevos proyectos
          </motion.span>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Hola, soy <span className="text-primary">Diana Sofia</span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-medium text-foreground/70 mb-8">
            Desarrolladora Frontend
          </h2>
          
          <p className="text-lg text-foreground/60 mb-10 max-w-lg leading-relaxed">
            Especializada en crear experiencias digitales modernas, elegantes y altamente funcionales. 
            Me apasiona transformar ideas complejas en interfaces intuitivas.
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-primary text-background px-8 py-4 rounded-xl font-bold transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            >
              Contáctame <Mail size={18} />
            </motion.a>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 px-8 py-4 rounded-xl font-bold transition-all"
            >
              Descargar CV <Download size={18} />
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 bg-surface relative z-10">
            <img 
              src={dianitaAvatar} 
              alt="Diana Sofia" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 border-t-2 border-r-2 border-primary/50 rounded-tr-3xl" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 border-b-2 border-l-2 border-primary/50 rounded-bl-3xl" />
        </motion.div>
      </div>
    </section>
  );
}
