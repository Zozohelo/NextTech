import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import About from "./About";
import Contact from "./Contact";

const MainPage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <About />
      <Contact />
    </div>
  );
};

export default MainPage;
