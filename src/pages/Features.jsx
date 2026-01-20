// src/pages/Features.jsx
import Layout from "../components/Layout";
import FeaturesGrid from "../components/home/FeaturesGrid";

const Features = () => (
  <Layout>
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-textDark mb-6">Funktionen</h1>
      <p className="text-textMuted mb-8">
        Entdecken Sie den umfangreichen Funktionsumfang unserer Immobilienbewertungs-Software.
      </p>
      <FeaturesGrid />
    </div>
  </Layout>
);

export default Features;