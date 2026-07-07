"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=923113270742&text=Hi%20Nazneen,%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition duration-300 z-50"
    >
      <FaWhatsapp size={30} />
    </a>
  );
}