import { Navigate, Route, Routes } from "react-router-dom";

import ButtonGradient from "./assets/svg/ButtonGradient";
import Benefits from "./components/Benefits";
import Collaboration from "./components/Collaboration";
import Contact from "./components/Contact";
import EmailRequestForm from "./components/EmailRequest";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";

const App = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <EmailRequestForm />
                <Hero />
                <Benefits />
                <Collaboration />
                <Services />
                <Footer />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Header />
                <Contact />
                <Footer />
              </>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <ButtonGradient />
    </>
  );
};

export default App;
