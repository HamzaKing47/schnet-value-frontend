// src/pages/Screenshots.jsx
import Layout from "../components/Layout";
import Documents from "../components/home/Documents";

const Screenshots = () => (
  <Layout>
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-textDark mb-6">Screenshots</h1>
      <p className="text-textMuted mb-8">
        Sehen Sie sich unsere Software in Aktion an.
      </p>
      <Documents />
    </div>
  </Layout>
);

export default Screenshots;