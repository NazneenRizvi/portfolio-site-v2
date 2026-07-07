"use client";

import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen pt-20 md:pt-24 bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white flex items-center"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 w-full overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

          {/* Left Side */}
          <div>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-cyan-400 font-semibold mb-4"
            >
              👋 Hello, I'm
            </motion.p>

            <motion.h1
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight drop-shadow-[0_0_25px_rgba(34,211,238,0.4)]"
            >
              Syeda
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                Nazneen Rizvi
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl sm:text-2xl md:text-3xl mt-6 text-gray-300 font-semibold"
            >
              <TypeAnimation
                sequence={[
                  "Front-end Developer",
                  2000,
                  "React Developer",
                  2000,
                  "Next.js Developer",
                  2000,
                  "TypeScript Developer",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6 text-base sm:text-lg text-gray-400 leading-7 max-w-xl"
            >
              I build modern, responsive and user-friendly web applications
              using HTML, CSS, JavaScript, React, Next.js, TypeScript and
              Tailwind CSS.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-4 mt-10"
            >
              <a
                href="#projects"
                className="bg-cyan-500 hover:bg-cyan-600 transition px-6 py-3 rounded-full font-semibold flex items-center gap-2"
              >
                🚀 View My Work
                <FaArrowRight />
              </a>

              <a
                href="#contact"
                className="border border-cyan-500 px-6 py-3 rounded-full hover:bg-cyan-500 transition"
              >
                Contact Me
              </a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex gap-6 mt-8 text-3xl text-cyan-400"
            >
              <a
                href="https://github.com/YOUR_GITHUB_USERNAME"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white hover:scale-110 transition"
              >
                <FaGithub />
              </a>

              <a
                href="https://linkedin.com/in/YOUR_LINKEDIN_USERNAME"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white hover:scale-110 transition"
              >
                <FaLinkedin />
              </a>

              <a
                href="mailto:your@email.com"
                className="hover:text-white hover:scale-110 transition"
              >
                <FaEnvelope />
              </a>

            </motion.div>

          </div>

          {/* Right Side */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: [0, -15, 0],
            }}
            transition={{
              delay: 0.6,
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex justify-center mt-10 lg:mt-0"
          >

            <div className="w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full bg-cyan-500/20 border border-cyan-500 flex items-center justify-center">

              <div className="text-center">

                <div className="text-5xl sm:text-6xl mb-4">
                  💻
                </div>

                <p className="text-cyan-400 font-semibold text-sm sm:text-base">
                  3D Model Coming Soon...
                </p>

              </div>

            </div>

          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}