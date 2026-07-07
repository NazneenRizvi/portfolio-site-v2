"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus("sending");
    
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      
      // Reset back to idle after 5 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    }, 1500);
  };

  return (
    <section
      id="contact"
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
            Contact <span className="text-cyan-400">Me</span>
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Have a project in mind or want to work together? Feel free to reach out.
          </p>
        </motion.div>

        {/* Left card aur Contact Form yahan add karenge */}
        <div className="grid lg:grid-cols-2 gap-10">

  {/* Left Side */}
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="bg-slate-900 border border-cyan-500/20 rounded-3xl p-8"
  >
    <h3 className="text-3xl font-bold mb-6">
      Let's Work Together
    </h3>

    <p className="text-gray-400 leading-8 mb-8">
      I'm available for freelance projects, front-end development and
      exciting opportunities. Feel free to contact me anytime.
    </p>

    <div className="space-y-6">

      <div className="flex items-center gap-4">
        <FaEnvelope className="text-cyan-400 text-2xl" />
        <span>rizvinazneen896@gmail.com</span>
      </div>

      <div className="flex items-center gap-4">
        <FaMapMarkerAlt className="text-cyan-400 text-2xl" />
        <span>Karachi, Pakistan</span>
      </div>

      <div className="flex items-center gap-4">
        <FaGithub className="text-cyan-400 text-2xl" />
        <a
          href="https://github.com/NazneenRizvi"
          target="_blank"
            rel="noopener noreferrer"
          className="hover:text-cyan-400"
        >
          GitHub
        </a>
      </div>

<div className="flex items-center gap-4">
  <FaLinkedin className="text-cyan-400 text-2xl" />

  <a
    href="https://www.linkedin.com/in/nazneen-rizvi-2bb237208/"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-cyan-400 transition"
  >
    LinkedIn
  </a>
</div>
</div>
  </motion.div>

  {/* Right Side */}
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="bg-slate-900 border border-cyan-500/20 rounded-3xl p-8 flex flex-col justify-center"
  >
    {status === "success" ? (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-4 py-8"
      >
        <FaCheckCircle className="text-cyan-400 text-6xl mx-auto animate-bounce" />
        <h4 className="text-2xl font-bold text-white">Message Sent!</h4>
        <p className="text-gray-400 max-w-sm mx-auto">
          Thank you for reaching out. Nazneen will get back to you as soon as possible.
        </p>
      </motion.div>
    ) : (
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Your Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={status === "sending"}
          className="w-full bg-slate-800 border border-cyan-500/20 rounded-xl px-5 py-3 focus:outline-none focus:border-cyan-400 text-white placeholder-gray-500 disabled:opacity-50"
        />

        <input
          type="email"
          placeholder="Your Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "sending"}
          className="w-full bg-slate-800 border border-cyan-500/20 rounded-xl px-5 py-3 focus:outline-none focus:border-cyan-400 text-white placeholder-gray-500 disabled:opacity-50"
        />

        <textarea
          rows={6}
          placeholder="Your Message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={status === "sending"}
          className="w-full bg-slate-800 border border-cyan-500/20 rounded-xl px-5 py-3 focus:outline-none focus:border-cyan-400 text-white placeholder-gray-500 resize-none disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold py-3 rounded-xl transition duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {status === "sending" ? (
            <>
              <span className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </button>
      </form>
    )}
  </motion.div>

</div>

      </div>
    </section>
  );
}