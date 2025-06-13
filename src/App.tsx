import "./App.css";
import About from "./components/About";
import Contact from "./components/Contact";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import Products from "./components/Products";

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Products />
      <About />
      <Contact />
    </>
  );
}

export default App;
