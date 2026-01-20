// src/components/modals/VideoModal.jsx
export default function VideoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-4xl w-full">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 flex items-center gap-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Schließen
        </button>
        
        <div className="bg-black rounded-xl overflow-hidden shadow-2xl">
          <div className="aspect-video bg-gray-900 flex items-center justify-center">
            {/* Video placeholder - in production, replace with actual video */}
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-white text-xl font-semibold">Produkt-Demo Video</h3>
              <p className="text-gray-400 mt-2">(In der finalen Version wird hier das Video eingebettet)</p>
            </div>
          </div>
          
          <div className="p-6 bg-gray-900 text-white">
            <h3 className="text-lg font-semibold mb-2">Software zur Immobilienbewertung</h3>
            <p className="text-gray-400">
              In diesem Video zeigen wir Ihnen, wie einfach Sie professionelle Immobilienbewertungen erstellen können.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}