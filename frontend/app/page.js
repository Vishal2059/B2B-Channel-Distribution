"use client";
import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import ProductShowcase from "@/components/landing/ProductShowcase";
import Faq from "@/components/landing/Faq";
import Cta from "@/components/landing/Cta";
import Footer from "@/components/landing/Footer";
import ContactModal from "@/components/modals/ContactModal";
import LoginModal from "@/components/modals/LoginModal";
import ApplyModal from "@/components/modals/ApplyModal";

export default function Home() {
  // kaun sa popup khula hai: "contact" | "login" | "apply" | null
  const [modal, setModal] = useState(null);
  const [role, setRole] = useState(""); // apply popup mein pehle se chuna hua role
  const close = () => setModal(null);

  const open = (name, presetRole = "") => {
    setRole(presetRole);
    setModal(name);
  };

  return (
    <>
      <Navbar onOpen={open} />
      <main>
        <Hero onOpen={open} />
        <About />
        <HowItWorks />
        <Features />
        <ProductShowcase onOpen={open} />
        <Faq />
        <Cta onOpen={open} />
      </main>
      <Footer onOpen={open} />

      {modal === "contact" && <ContactModal onClose={close} />}
      {modal === "login" && <LoginModal onClose={close} onSwitch={open} />}
      {modal === "apply" && <ApplyModal onClose={close} defaultRole={role} />}
    </>
  );
}