"use client";

import { motion } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGithub,
  FaGitAlt,
  FaNodeJs,
} from "react-icons/fa";

import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiFirebase,
  SiFastapi,
} from "react-icons/si";

const skills = [
  { name: "HTML5", icon: <FaHtml5 />, color: "text-orange-500" },
  { name: "CSS3", icon: <FaCss3Alt />, color: "text-blue-500" },
  { name: "JavaScript", icon: <FaJs />, color: "text-yellow-400" },
  { name: "TypeScript", icon: <SiTypescript />, color: "text-blue-400" },
  { name: "React", icon: <FaReact />, color: "text-cyan-400" },
  { name: "Next.js", icon: <SiNextdotjs />, color: "text-white" },
  { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "text-cyan-400" },
  { name: "Git", icon: <FaGitAlt />, color: "text-orange-500" },
  { name: "GitHub", icon: <FaGithub />, color: "text-white" },
  { name: "Firebase", icon: <SiFirebase />, color: "text-yellow-400" },
];

const learning = [
  { name: "Node.js", icon: <FaNodeJs />, color: "text-green-500" },
  { name: "FastAPI", icon: <SiFastapi />, color: "text-teal-400" },
  { name: "Artificial Intelligence", icon: "🤖", color: "text-cyan-400" },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="min-h-screen bg-slate-950 text-white py-20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            My <span className="text-cyan-400">Skills</span>
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Technologies and tools I use to build modern,
            responsive and user-friendly web applications.
          </p>
        </motion.div>

        {/* Main Skills */}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">

          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                scale: 1.05,
              }}
              className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-6 text-center hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] transition-all duration-300"
            >
              <div className={`text-5xl mb-4 ${skill.color}`}>
                {skill.icon}
              </div>

              <h3 className="font-semibold text-lg">
                {skill.name}
              </h3>
            </motion.div>
          ))}

        </div>

        {/* Learning */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-center mb-10 text-cyan-400">
            Currently Learning
          </h3>

          <div className="grid md:grid-cols-3 gap-6">

            {learning.map((item, index) => (
              <motion.div
                key={item.name}
                whileHover={{
                  y: -6,
                  scale: 1.03,
                }}
                className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-8 text-center hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] transition-all"
              >
                <div className={`text-5xl mb-4 ${item.color}`}>
                  {item.icon}
                </div>

                <h4 className="text-xl font-semibold">
                  {item.name}
                </h4>

                <p className="text-gray-400 mt-3">
                  Continuously improving my knowledge through
                  hands-on projects and practice.
                </p>

              </motion.div>
            ))}

          </div>

        </motion.div>

      </div>
    </section>
  );
}