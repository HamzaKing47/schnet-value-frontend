// src/components/ErrorBoundary.jsx - UPDATED VERSION
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Check if it's a Google Translate/Grammarly error
    if (error.message && 
        (error.message.includes('removeChild') || 
         error.message.includes('GoogleTranslate') ||
         error.message.includes('Grammarly'))) {
      return null; // Don't set error state
    }
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error caught (likely third-party):', error.message);
    
    // Ignore Google Translate/Grammarly errors completely
    if (error.message && 
        (error.message.includes('removeChild') || 
         error.message.includes('GoogleTranslate') ||
         error.message.includes('Grammarly'))) {
      return;
    }
    
    // Log real errors
    console.error('Real error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
            <h2 className="text-2xl font-bold text-textDark mb-4">Oops! Etwas ist schiefgelaufen</h2>
            <p className="text-textMuted mb-6">
              Bitte laden Sie die Seite neu oder kontaktieren Sie den Support.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primaryDark transition-colors"
            >
              Seite neu laden
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;