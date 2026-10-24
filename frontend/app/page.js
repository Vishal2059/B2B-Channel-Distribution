"use client";
import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import ContactModal from "@/components/modals/ContactModal";
import LoginModal from "@/components/modals/LoginModal";
import ApplyModal from "@/components/modals/ApplyModal";

export default function Home() {
  // kaun sa popup khula hai: "contact" | "login" | "apply" | null
  const [modal, setModal] = useState(null);
  const close = () => setModal(null);

  return (
    <>
      <Navbar onOpen={setModal} />
      <main>
        <Hero onOpen={setModal} />
        <Features />
      </main>
      <Footer />

      {modal === "contact" && <ContactModal onClose={close} />}
      {modal === "login" && <LoginModal onClose={close} onSwitch={setModal} />}
      {modal === "apply" && <ApplyModal onClose={close} />}
    </>
  );
}