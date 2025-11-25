import React from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Menu from "./pages/Menu.jsx";
import Location from "./pages/Location.jsx";
import Contact from "./pages/Contact.jsx";
import ChatIA from "./components/ChatIA.jsx";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      {/* Orden de arriba hacia abajo */}
      <Home />
      <About />
      <Menu />
      <Location />
      <Contact />
      <Footer />
      <ChatIA />
    </div>
  );
};

export default App;
