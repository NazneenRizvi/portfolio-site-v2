"use client";

import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Developer Portfolio V2",
    description:
      "A premium developer portfolio built with Next.js, TypeScript and Tailwind CSS featuring responsive layouts, smooth animations and modern UI.",
    image: "/projects/portfolio-v2.png",
    github: "https://github.com/NazneenRizvi",
    live: "#",
    featured: true,
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Salah Diary",
    description:
      "A responsive Islamic web application that helps users track daily prayers with a clean and user-friendly interface.",
    image: "/projects/salah-diary.png",
    github: "https://github.com/NazneenRizvi/salah_dairy",
    live: "https://salah-diary-37273.web.app/",
    featured: false,
    tech: ["HTML", "CSS", "JavaScript", "Firebase"],
  },
  {
    title: "Burger Shop",
    description:
      "A responsive restaurant landing page with a modern layout, navigation menu and attractive UI design.",
    image: "/projects/burger-shop.png",
    github: "https://github.com/NazneenRizvi/burgershop",
    live: "https://burgershop-iota.vercel.app/",
    featured: false,
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Portfolio V1",
    description:
      "My first portfolio website that marked the beginning of my web development journey and shows my learning progress.",
    image: "/projects/portfolio-v1.png",
    github: "https://github.com/NazneenRizvi/portfolio-site",
    live: "https://portfolio-site-kappa-pied.vercel.app/",
    featured: false,
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Dubai Active-Wear",
    description:
      "A full-stack React app that showcases a line of active-wear products, with Supabase-backed authentication, Stripe payments and a realtime inventory dashboard.",
    image: "/projects/dubai-active-wear.png",
    github: "https://github.com/NazneenRizvi/Dubai-active-wear-",
    live: "https://dubai-active-wear.vercel.app/",
    featured: false,
    tech: ["React", "Next.js", "Supabase", "Stripe", "Tailwind CSS"],
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen bg-slate-950 text-white py-20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            My <span className="text-cyan-400">Projects</span>
          </h2>
          <p className="text-gray-400 mt-4">
            Some of my featured projects built during my learning journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.4 }}
              className="group bg-slate-900 rounded-3xl overflow-hidden border border-cyan-500/20 hover:border-cyan-400 shadow-xl transition-all duration-300"
            >
              <div className="relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={700}
                  height={450}
                  className="w-full h-64 object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-cyan-500 text-slate-950 px-5 py-2 rounded-full font-semibold"
                  >
                    View Project
                  </a>
                </div>
                {project.featured && (
                  <div className="absolute top-5 left-5 bg-cyan-500 text-black text-xs font-bold px-4 py-2 rounded-full">
                    ⭐ Featured
                  </div>
                )}
              </div>

              <div className="p-7">
                <h3 className="text-3xl font-bold">{project.title}</h3>
                <p className="text-gray-400 mt-4 leading-7">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3 mt-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 px-4 py-2 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-5 mt-8">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-full transition"
                  >
                    <FaExternalLinkAlt />
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-cyan-500 hover:bg-cyan-500 px-6 py-3 rounded-full transition"
                  >
                    <FaGithub />
                    GitHub
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
