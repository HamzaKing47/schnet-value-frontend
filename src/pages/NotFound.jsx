// src/pages/NotFound.jsx
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

const NotFound = () => (
  <Layout>
    <div className="min-h-[calc(100vh-96px)] flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="text-9xl font-bold text-primary/20 mb-8">404</div>
        
        <h1 className="text-3xl font-bold text-textDark mb-4">Seite nicht gefunden</h1>
        
        <p className="text-textMuted mb-8">
          Die von Ihnen gesuchte Seite existiert nicht oder wurde verschoben.
        </p>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primaryDark transition-colors"
          >
            Zur Startseite
          </Link>
          
          <Link
            to="/bewertung"
            className="block border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Bewertung starten
          </Link>
        </div>
      </div>
    </div>
  </Layout>
);

export default NotFound;