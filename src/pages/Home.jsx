// Home.jsx - updated
import { useState } from "react";
import Hero from "../components/home/Hero";
import ValuationSection from "../components/home/ValuationSection";
import TariffLevels from "../components/home/TariffLevels";
import OnlineSoftware from "../components/home/OnlineSoftware";
import DataDelivery from "../components/home/DataDelivery";
import Documents from "../components/home/Documents";
import LeadGeneration from "../components/home/LeadGeneration";
import TrustBadge from "../components/home/TrustBadge";
import FreeTrial from "../components/home/FreeTrial";
import FeaturesGrid from "../components/home/FeaturesGrid";
import FinalCTA from "../components/home/FinalCTA";
import Footer from "../components/home/Footer";
import ContactModal from "../components/modals/ContactModal";
import VideoModal from "../components/modals/VideoModal";
import LeadGeneratorModal from "../components/modals/LeadGeneratorModal";

const Home = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);

  return (
    <>
      <Hero />
      <ValuationSection />
      <TariffLevels />
      <OnlineSoftware />
      <DataDelivery />
      <Documents />
      <LeadGeneration 
        onDetailsClick={() => setShowLeadModal(true)}
      />
      <TrustBadge />
      <FreeTrial 
        onWatchVideo={() => setShowVideoModal(true)}
      />
      <FeaturesGrid />
      <FinalCTA />
      <Footer />

      {/* Modals */}
      <ContactModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />
      <VideoModal 
        isOpen={showVideoModal} 
        onClose={() => setShowVideoModal(false)} 
      />
      <LeadGeneratorModal 
        isOpen={showLeadModal} 
        onClose={() => setShowLeadModal(false)} 
      />
    </>
  );
};

export default Home;