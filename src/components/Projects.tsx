import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import projectsData from '../data/projects.json';

export default function Projects() {
  return (
    <section id="proyectos" className="py-24 bg-surface/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-4">Portafolio</h2>
            <h3 className="text-4xl font-bold">Proyectos Destacados</h3>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-foreground/50 max-w-md md:text-right"
          >
            Una selección de mis trabajos más recientes, enfocados en la calidad del código y la experiencia de usuario.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-3xl overflow-hidden border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-500 flex flex-col"
            >
              <div className="aspect-video overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="flex gap-3">
                    <a href={project.demo} className="p-2 rounded-full bg-primary text-background hover:scale-110 transition-transform">
                      <ExternalLink size={20} />
                    </a>
                    <a href={project.github} className="p-2 rounded-full bg-white/20 backdrop-blur-md text-foreground hover:scale-110 transition-transform">
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-white/5 text-foreground/50">
                      {tag}
                    </span>
                  ))}
                </div>
                <h4 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h4>
                <p className="text-foreground/60 text-sm leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>
                
                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                  <a href={project.demo} className="text-sm font-bold flex items-center gap-2 hover:text-primary transition-colors">
                    Ver Demo <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
