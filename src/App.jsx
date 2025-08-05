import ButtonGradient from "./assets/svg/ButtonGradient";
import Benefits from "./components/Benefits";
import Collaboration from "./components/Collaboration";
import EmailRequestForm from "./components/EmailRequest";
// import Contact from "./components/.Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
// import PricingList from "./components/PricingList";
// import Roadmap from "./components/Roadmap";
import Services from "./components/Services";

const App = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <EmailRequestForm />
        <Hero />
        <Benefits />
        <Collaboration />
        <Services />
        {/* <PricingList /> */}
        {/* <Roadmap /> */}
        <Footer />
        {/* <Contact /> */}
      </div>
      <ButtonGradient />
    </>
  );
};

export default App;
