"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCommentDots, FaXmark, FaPaperPlane, FaRobot } from "react-icons/fa6";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

type Step =
  | "GREETING"
  | "GET_NAME"
  | "GET_PROJECT_INTRO"   // Ask what they want to build (after name)
  | "GET_WEBSITE_TYPE"    // Only if not auto-detected
  | "GET_BUSINESS"
  | "GET_GOAL"
  | "GET_DESIGN"
  | "GET_IMAGES"
  | "GET_TIMELINE"
  | "GET_BUDGET"
  | "GET_EMAIL"
  | "GET_PHONE"
  | "DONE";

interface Brief {
  name: string;
  websiteType: string;
  business: string;
  goal: string;
  design: string;
  images: string;
  timeline: string;
  budget: string;
  email: string;
  phone: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const GREETINGS = ["hi", "hello", "hey", "assalam", "a.o.a", "salam", "aoa",
  "good morning", "good evening", "good afternoon", "howdy", "greetings"];

// These words trigger uncertainty handling at any optional step
const SKIP_WORDS = ["skip", "later", "not sure", "dont know", "don't know",
  "no idea", "idk", "undecided", "flexible", "not decided", "pass", "tbd"];

// These trigger the price intercept
const PRICE_WORDS = ["price", "cost", "how much", "charges", "fees",
  "rate", "quote", "pricing", "tariff", "amount"];

// Website type detection keywords
const WEBSITE_TYPES: Record<string, string> = {
  "landing page": "Landing Page",
  "landing": "Landing Page",
  "portfolio": "Portfolio Website",
  "ecommerce": "E-commerce Store",
  "e-commerce": "E-commerce Store",
  "online store": "E-commerce Store",
  "online shop": "E-commerce Store",
  "shop": "E-commerce Store",
  "sell products": "E-commerce Store",
  "blog": "Blog / News Website",
  "business website": "Business Website",
  "corporate": "Business Website",
  "company website": "Business Website",
  "restaurant": "Business Website",
  "agency": "Business Website",
  "clinic": "Business Website",
  "hospital": "Business Website",
  "school": "Business Website",
  "gym": "Business Website",
  "bakery": "Business Website",
};

// Optional steps where skip is allowed
const OPTIONAL_STEPS: Step[] = ["GET_DESIGN", "GET_IMAGES", "GET_PHONE"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isGreeting(text: string): boolean {
  const t = text.toLowerCase().trim();
  return GREETINGS.some((g) => t === g || t.startsWith(g + " ") || t.startsWith(g + "!") || t.startsWith(g + ","));
}

function isSkip(text: string, step: Step): boolean {
  if (!OPTIONAL_STEPS.includes(step)) return false;
  const t = text.toLowerCase().trim();
  return SKIP_WORDS.some((w) => t.includes(w));
}

function isPriceQuery(text: string): boolean {
  const t = text.toLowerCase();
  return PRICE_WORDS.some((p) => t.includes(p));
}

function extractEmail(text: string): string | null {
  const m = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  return m ? m[0] : null;
}

function detectWebsiteType(text: string): string | null {
  const t = text.toLowerCase();
  for (const [keyword, value] of Object.entries(WEBSITE_TYPES)) {
    if (t.includes(keyword)) return value;
  }
  return null;
}

function isGenericWebsiteRequest(text: string): boolean {
  const t = text.toLowerCase();
  // They said "website" but didn't specify type
  return (t.includes("website") || t.includes("web site") || t.includes("site"))
    && !detectWebsiteType(t);
}

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ─── Conversation Script ──────────────────────────────────────────────────────

function getStepQuestion(step: Step, name: string): string {
  const n = name ? `, ${name}` : "";
  switch (step) {
    case "GET_NAME":
      return "May I know your name? 😊";

    case "GET_PROJECT_INTRO":
      return `Could you tell me a little about what you're looking to build today${n}?`;

    case "GET_WEBSITE_TYPE":
      return `What type of website are you looking for${n}? For example, a landing page, business website, portfolio, e-commerce store, blog, or something else?`;

    case "GET_BUSINESS":
      return `Could you tell me a bit more about your business or project${n}? What does it do, and who is it for?`;

    case "GET_GOAL":
      return `What is the main goal of your website${n}?\n\nFor example: generate leads, sell products, take bookings, show a portfolio, or share information?`;

    case "GET_DESIGN":
      return `Do you already have a design ready — like a Figma file, mockup, or a reference website you like? Or would you prefer Nazneen to create one? (You can type 'skip' if you're not sure yet)`;

    case "GET_IMAGES":
      return `Do you have photos and images ready for the website, or will you need help sourcing them? (Type 'skip' if not decided yet)`;

    case "GET_TIMELINE":
      return `When would you like the project to be completed${n}? For example: ASAP, 1 week, 2 weeks, 1 month, or flexible.`;

    case "GET_BUDGET":
      return `What budget range are you thinking for this project${n}?\n\nFor example: under $300, $300–$1000, above $1000, or let's discuss.`;

    case "GET_EMAIL":
      return `Just one more question${n}! What is the best email address for Nazneen to send you a detailed proposal?`;

    case "GET_PHONE":
      return `And your WhatsApp or phone number? This will make it easier for Nazneen to reach you quickly. (Type 'skip' if you'd prefer not to share)`;

    case "DONE":
      return `I've prepared a project brief based on everything you've shared.\n\nNazneen will be able to review your requirements much more quickly now. 😊\n\nPlease click below to send it directly to her:`;

    default:
      return "How can I help you?";
  }
}

function getAck(step: Step, value: string, name: string): string {
  const n = name ? `, ${name}` : "";
  switch (step) {
    case "GET_NAME":
      return randomPick([
        `Great to meet you, ${value}! 😊`,
        `Lovely to have you here, ${value}! 😊`,
        `Nice to meet you, ${value}!`,
      ]);
    case "GET_PROJECT_INTRO":
    case "GET_WEBSITE_TYPE":
      return randomPick([
        `That sounds like an exciting project${n}!`,
        `Great choice${n}! I'm sure Nazneen can create something amazing.`,
        `Excellent${n}! That's exactly the kind of project Nazneen loves working on.`,
      ]);
    case "GET_BUSINESS":
      return randomPick([
        `Thanks for sharing that${n} — very helpful.`,
        `That gives me a great picture of your project${n}.`,
        `Interesting! Thanks for explaining that${n}.`,
      ]);
    case "GET_GOAL":
      return `Perfect${n}, that helps a lot.`;
    case "GET_DESIGN":
      return `Understood${n}. Good to know.`;
    case "GET_IMAGES":
      return `Got it${n} — I've noted that down.`;
    case "GET_TIMELINE":
      return `Noted${n}!`;
    case "GET_BUDGET":
      return randomPick([
        `Understood${n}. 😊 Every project is unique — Nazneen will work within your range.`,
        `That's helpful${n}. Nazneen will tailor a solution that fits your budget.`,
      ]);
    case "GET_EMAIL":
      return `Perfect${n} — I've got your email.`;
    case "GET_PHONE":
      return value.toLowerCase() === "skip" || value === "Not shared"
        ? `No problem at all${n}!`
        : `Got it${n}, noted.`;
    default:
      return "";
  }
}

// ─── Step Ordering ────────────────────────────────────────────────────────────

const FLOW_ORDER: Step[] = [
  "GREETING", "GET_NAME", "GET_PROJECT_INTRO", "GET_WEBSITE_TYPE",
  "GET_BUSINESS", "GET_GOAL", "GET_DESIGN", "GET_IMAGES",
  "GET_TIMELINE", "GET_BUDGET", "GET_EMAIL", "GET_PHONE", "DONE",
];

function getNextStep(current: Step, skip?: Step[]): Step {
  const skipped = skip || [];
  const idx = FLOW_ORDER.indexOf(current);
  for (let i = idx + 1; i < FLOW_ORDER.length; i++) {
    if (!skipped.includes(FLOW_ORDER[i])) return FLOW_ORDER[i];
  }
  return "DONE";
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasNotif, setHasNotif] = useState(true);
  const [step, setStep] = useState<Step>("GREETING");
  const [brief, setBrief] = useState<Partial<Brief>>({});
  const [stepsToSkip, setStepsToSkip] = useState<Step[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial welcome
  useEffect(() => {
    setMessages([{
      id: "init",
      sender: "bot",
      text: "👋 Hi! Welcome to Nazneen Rizvi's portfolio.\n\nI'm her AI Project Consultant. I'm here to help you explore your ideas and build the right solution.\n\nFeel free to tell me what's on your mind — or ask me anything!",
    }]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // ── Messaging helpers ──────────────────────────────────────────────────────

  const addUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { id: Math.random().toString(36), sender: "user", text }]);
  };

  const addBotMessage = (text: string) => {
    setMessages((prev) => [...prev, { id: Math.random().toString(36), sender: "bot", text }]);
  };

  // Send one or more bot messages with typing delay between each
  const botSay = (lines: string[], delayBetween = 1300) => {
    setIsTyping(true);
    lines.forEach((line, i) => {
      setTimeout(() => {
        setIsTyping(false);
        addBotMessage(line);
        if (i < lines.length - 1) setTimeout(() => setIsTyping(true), 200);
      }, i * delayBetween + 1000);
    });
  };

  // Advance to next step and ask its question
  const advanceToStep = (nextStep: Step, updatedBrief: Partial<Brief>, extraLines: string[] = []) => {
    setStep(nextStep);
    const question = getStepQuestion(nextStep, updatedBrief.name || "");
    botSay([...extraLines, question]);
  };

  // ── Send handler ───────────────────────────────────────────────────────────

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    addUserMessage(text);

    // ── Global: Price Query ────────────────────────────────────────────────
    if (isPriceQuery(text) && step !== "GET_BUDGET") {
      botSay([
        "That's a great question. 😊 Every project is unique, so the cost depends on the scope, features, design, and timeline.",
        "Let me understand your requirements first so Nazneen can provide an accurate quotation.",
      ]);
      return;
    }

    // ── Global: Skip/Uncertainty at optional steps ────────────────────────
    if (isSkip(text, step)) {
      const updatedBrief = { ...brief };
      const fieldMap: Partial<Record<Step, keyof Brief>> = {
        GET_DESIGN: "design",
        GET_IMAGES: "images",
        GET_PHONE: "phone",
      };
      const field = fieldMap[step];
      if (field) (updatedBrief as Record<string, string>)[field] = "Not decided yet";
      setBrief(updatedBrief);
      const nextStep = getNextStep(step, stepsToSkip);
      setStep(nextStep);
      botSay([
        "No problem at all! 😊 We can always revisit that later.",
        getStepQuestion(nextStep, updatedBrief.name || ""),
      ]);
      return;
    }

    // ── State machine ──────────────────────────────────────────────────────
    processStep(text);
  };

  const processStep = (text: string) => {
    const updatedBrief = { ...brief };

    switch (step) {

      // ── GREETING ──────────────────────────────────────────────────────────
      case "GREETING": {
        if (isGreeting(text)) {
          setStep("GET_NAME");
          botSay([
            "Hello! So glad you stopped by. 😊",
            getStepQuestion("GET_NAME", ""),
          ]);
          return;
        }

        // They wrote something meaningful right away — check for website type
        const detectedType = detectWebsiteType(text);
        if (detectedType) {
          updatedBrief.websiteType = detectedType;
          setBrief(updatedBrief);
          const skip: Step[] = ["GET_PROJECT_INTRO", "GET_WEBSITE_TYPE"];
          setStepsToSkip(skip);
          setStep("GET_NAME");
          botSay([
            `A ${detectedType} — that's an exciting project! 😊 I'd be happy to help.`,
            getStepQuestion("GET_NAME", ""),
          ]);
          return;
        }

        if (isGenericWebsiteRequest(text)) {
          setStep("GET_NAME");
          botSay([
            "I'd be happy to help! 😊 I'll ask you a few simple questions to understand your requirements and recommend the most suitable solution.",
            getStepQuestion("GET_NAME", ""),
          ]);
          return;
        }

        // Generic fallback
        setStep("GET_NAME");
        botSay([
          "That sounds interesting! 😊 Let me help you figure out the best solution.",
          getStepQuestion("GET_NAME", ""),
        ]);
        break;
      }

      // ── GET NAME ──────────────────────────────────────────────────────────
      case "GET_NAME": {// Better name extraction

const cleanText = text.trim();

// Common words to ignore
const ignoreWords = [
  "yes",
  "yeah",
  "yep",
  "sure",
  "ok",
  "okay",
  "hi",
  "hello",
  "hey",
  "my",
  "name",
  "is",
  "i'm",
  "i",
  "am",
  "its",
  "it's",
];

const words = cleanText
  .replace(/[.,!?]/g, "")
  .split(/\s+/)
  .filter((word) => !ignoreWords.includes(word.toLowerCase()));

let name =
  words.length > 0
    ? words
        .map(
          (word) =>
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ")
    : "";

if (!name) {
  botSay([
    "I'm sorry, I couldn't catch your name. 😊",
    "May I know your name?"
  ]);
  return;
}

updatedBrief.name = name;
setBrief(updatedBrief);
        updatedBrief.name = name;
        setBrief(updatedBrief);

        const ack = getAck("GET_NAME", name, "");

        // If website type already captured, skip intro & type steps
        if (updatedBrief.websiteType) {
          const nextStep = "GET_BUSINESS";
          setStep(nextStep);
          botSay([ack, getStepQuestion(nextStep, name)]);
        } else {
          const nextStep = "GET_PROJECT_INTRO";
          setStep(nextStep);
          botSay([ack, getStepQuestion(nextStep, name)]);
        }
        break;
      }

      // ── GET PROJECT INTRO ─────────────────────────────────────────────────
      case "GET_PROJECT_INTRO": {
        const name = updatedBrief.name || "";
        const detectedType = detectWebsiteType(text);

        if (detectedType) {
          // Specific website type detected — acknowledge + ask business
          updatedBrief.websiteType = detectedType;
          setBrief(updatedBrief);
          const nextStep = "GET_BUSINESS";
          setStep(nextStep);
          botSay([
            getAck("GET_PROJECT_INTRO", detectedType, name),
            `I'd be happy to help with your ${detectedType}.`,
            getStepQuestion(nextStep, name),
          ]);
          return;
        }

        if (isGenericWebsiteRequest(text)) {
          // They said "website" but didn't specify — ask about business to recommend
          setBrief(updatedBrief);
          const nextStep = "GET_BUSINESS";
          setStep(nextStep);
          botSay([
            "I'd be happy to help! 😊",
            `Could you tell me a little about your business or project, ${name}? Based on your answer, I'll recommend the most suitable type of website.`,
          ]);
          return;
        }

        // They described something — save as business context and ask website type
        updatedBrief.business = text;
        setBrief(updatedBrief);
        const nextStep = "GET_WEBSITE_TYPE";
        setStep(nextStep);
        botSay([
          getAck("GET_BUSINESS", text, name),
          getStepQuestion(nextStep, name),
        ]);
        break;
      }

      // ── GET WEBSITE TYPE ──────────────────────────────────────────────────
      case "GET_WEBSITE_TYPE": {
        const name = updatedBrief.name || "";
        const detectedType = detectWebsiteType(text) || text;
        updatedBrief.websiteType = detectedType;
        setBrief(updatedBrief);

        const nextStep = updatedBrief.business ? "GET_GOAL" : "GET_BUSINESS";
        setStep(nextStep);
        botSay([
          getAck("GET_WEBSITE_TYPE", detectedType, name),
          getStepQuestion(nextStep, name),
        ]);
        break;
      }

      // ── GET BUSINESS ──────────────────────────────────────────────────────
      case "GET_BUSINESS": {
        const name = updatedBrief.name || "";
        updatedBrief.business = text;
        setBrief(updatedBrief);
        const nextStep = "GET_GOAL";
        setStep(nextStep);
        botSay([getAck("GET_BUSINESS", text, name), getStepQuestion(nextStep, name)]);
        break;
      }

      // ── GET GOAL ──────────────────────────────────────────────────────────
      case "GET_GOAL": {
        const name = updatedBrief.name || "";
        updatedBrief.goal = text;
        setBrief(updatedBrief);
        const nextStep = "GET_DESIGN";
        setStep(nextStep);
        botSay([getAck("GET_GOAL", text, name), getStepQuestion(nextStep, name)]);
        break;
      }

      // ── GET DESIGN ────────────────────────────────────────────────────────
      case "GET_DESIGN": {
        const name = updatedBrief.name || "";
        updatedBrief.design = text;
        setBrief(updatedBrief);
        const nextStep = "GET_IMAGES";
        setStep(nextStep);
        botSay([getAck("GET_DESIGN", text, name), getStepQuestion(nextStep, name)]);
        break;
      }

      // ── GET IMAGES ────────────────────────────────────────────────────────
      case "GET_IMAGES": {
        const name = updatedBrief.name || "";
        updatedBrief.images = text;
        setBrief(updatedBrief);
        const nextStep = "GET_TIMELINE";
        setStep(nextStep);
        botSay([getAck("GET_IMAGES", text, name), getStepQuestion(nextStep, name)]);
        break;
      }

      // ── GET TIMELINE ──────────────────────────────────────────────────────
      case "GET_TIMELINE": {
        const name = updatedBrief.name || "";
        updatedBrief.timeline = text;
        setBrief(updatedBrief);
        const nextStep = "GET_BUDGET";
        setStep(nextStep);
        botSay([getAck("GET_TIMELINE", text, name), getStepQuestion(nextStep, name)]);
        break;
      }

      // ── GET BUDGET ────────────────────────────────────────────────────────
      case "GET_BUDGET": {
        const name = updatedBrief.name || "";
        updatedBrief.budget = text;
        setBrief(updatedBrief);
        const nextStep = "GET_EMAIL";
        setStep(nextStep);
        botSay([getAck("GET_BUDGET", text, name), getStepQuestion(nextStep, name)]);
        break;
      }

      // ── GET EMAIL ─────────────────────────────────────────────────────────
      case "GET_EMAIL": {
        const name = updatedBrief.name || "";
        const email = extractEmail(text) || text;
        updatedBrief.email = email;
        setBrief(updatedBrief);
        const nextStep = "GET_PHONE";
        setStep(nextStep);
        botSay([getAck("GET_EMAIL", email, name), getStepQuestion(nextStep, name)]);
        break;
      }

      // ── GET PHONE ─────────────────────────────────────────────────────────
      case "GET_PHONE": {
        const name = updatedBrief.name || "";
        const phone = isSkip(text, "GET_PHONE") ? "Not shared" : text;
        updatedBrief.phone = phone;
        setBrief(updatedBrief);
        setStep("DONE");
        botSay([
          getAck("GET_PHONE", phone, name),
          getStepQuestion("DONE", name),
        ]);
        break;
      }

      // ── DONE ──────────────────────────────────────────────────────────────
      case "DONE": {
        botSay(["Your brief is ready above. 😊 Please click WhatsApp or Email to send it to Nazneen directly!"]);
        break;
      }
    }
  };

  // ─── Build brief text ──────────────────────────────────────────────────────

  const buildBriefText = (): string => {
    return (
      `🌐 New Project Brief — Nazneen Rizvi Portfolio\n\n` +
      `• Name: ${brief.name || "—"}\n` +
      `• Website Type: ${brief.websiteType || "—"}\n` +
      `• Business / Project: ${brief.business || "—"}\n` +
      `• Main Goal: ${brief.goal || "—"}\n` +
      `• Design Status: ${brief.design || "—"}\n` +
      `• Images Status: ${brief.images || "—"}\n` +
      `• Timeline: ${brief.timeline || "—"}\n` +
      `• Budget Range: ${brief.budget || "—"}\n` +
      `• Email: ${brief.email || "—"}\n` +
      `• WhatsApp/Phone: ${brief.phone || "—"}`
    );
  };

  const handleWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?phone=923113270742&text=${encodeURIComponent(buildBriefText())}`,
      "_blank"
    );
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Project Inquiry from ${brief.name || "Visitor"}`);
    window.open(
      `mailto:rizvinazneen896@gmail.com?subject=${subject}&body=${encodeURIComponent(buildBriefText())}`,
      "_blank"
    );
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* FAB */}
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => { setIsOpen(true); setHasNotif(false); setTimeout(() => inputRef.current?.focus(), 400); }}
          className="relative bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 p-4 rounded-full shadow-[0_0_30px_rgba(34,211,238,0.45)] hover:shadow-[0_0_40px_rgba(34,211,238,0.65)] border border-cyan-300/30 focus:outline-none"
        >
          <FaCommentDots size={28} />
          {hasNotif && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-400" />
            </span>
          )}
        </motion.button>
      )}

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="w-[340px] sm:w-[380px] h-[540px] bg-slate-900/96 border border-cyan-500/20 rounded-3xl shadow-[0_0_50px_rgba(34,211,238,0.18)] backdrop-blur-md flex flex-col overflow-hidden text-white"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-950 to-slate-900 px-5 py-4 border-b border-cyan-500/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <FaRobot size={19} />
                </div>
                <div>
                  <p className="font-bold text-sm tracking-wide">NR Assistant</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[11px] text-gray-400">AI Project Consultant</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition focus:outline-none">
                <FaXmark size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-medium rounded-tr-none"
                      : "bg-slate-800 text-gray-200 border border-slate-700/50 rounded-tl-none"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing dots */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 border border-slate-700/50 rounded-2xl rounded-tl-none px-4 py-3 flex gap-1 items-center">
                    {[0, 150, 300].map((d) => (
                      <span key={d} className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: `${d}ms` }} />
                    ))}
                  </div>
                </div>
              )}

              {/* Project Brief Summary */}
              {step === "DONE" && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-950/80 border border-cyan-500/20 rounded-2xl p-4 space-y-3 text-xs"
                >
                  <h5 className="font-bold text-cyan-400 text-sm">📋 Project Brief</h5>
                  <div className="space-y-1.5 text-gray-300 max-h-[130px] overflow-y-auto pr-1">
                    {brief.name && <p><strong>Name:</strong> {brief.name}</p>}
                    {brief.websiteType && <p><strong>Website:</strong> {brief.websiteType}</p>}
                    {brief.business && <p><strong>Business:</strong> {brief.business}</p>}
                    {brief.goal && <p><strong>Goal:</strong> {brief.goal}</p>}
                    {brief.design && <p><strong>Design:</strong> {brief.design}</p>}
                    {brief.images && <p><strong>Images:</strong> {brief.images}</p>}
                    {brief.timeline && <p><strong>Timeline:</strong> {brief.timeline}</p>}
                    {brief.budget && <p><strong>Budget:</strong> {brief.budget}</p>}
                    {brief.email && <p><strong>Email:</strong> {brief.email}</p>}
                    {brief.phone && brief.phone !== "Not shared" && <p><strong>Phone:</strong> {brief.phone}</p>}
                  </div>
                  <div className="flex gap-2 pt-2 border-t border-cyan-500/10">
                    <button onClick={handleWhatsApp} className="flex-1 bg-green-500 hover:bg-green-600 text-slate-950 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 focus:outline-none transition">
                      <FaWhatsapp size={13} /> Continue on WhatsApp
                    </button>
                    <button onClick={handleEmail} className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 focus:outline-none transition">
                      <FaEnvelope size={13} /> Send by Email
                    </button>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="p-4 bg-slate-950 border-t border-cyan-500/10 flex gap-2 items-center shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={step === "DONE" ? "Brief sent! 🎉" : "Type your message..."}
                disabled={step === "DONE"}
                className="flex-1 bg-slate-900 border border-slate-800 focus:border-cyan-500/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none transition disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || step === "DONE"}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-slate-950 p-2.5 rounded-xl transition flex items-center justify-center focus:outline-none disabled:opacity-40"
              >
                <FaPaperPlane size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
