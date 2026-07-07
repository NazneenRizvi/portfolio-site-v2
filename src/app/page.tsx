import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Chatbot from "@/components/Chatbot";
import Header from '../components/Header';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import Projects from '../components/Projects';
import About from '@/components/About';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer/>
        <WhatsAppButton />
        <Chatbot />
      </main>
    </>
  );
}