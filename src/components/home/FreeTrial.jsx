const FreeTrial = () => (
  <section className="py-20 bg-gradient-to-r from-primaryLighter to-white">
    <div className="max-w-6xl mx-auto px-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* Left Column - Text Content */}
          <div className="p-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-1 bg-primary rounded-full"></div>
              <span className="text-primary font-semibold uppercase text-sm tracking-wider">
                Kostenlos testen
              </span>
            </div>
            
            <h2 className="text-3xl font-bold text-textDark mb-6">
              6 Wochen kostenlos testen
            </h2>
            
            <div className="space-y-4 text-textMuted mb-8">
              <p>
                Sie möchten sich selbst ein Bild von unserer Software machen oder sind sich 
                noch nicht sicher, ob diese die Richtige für Sie ist?
              </p>
              <p>
                Gerne können Sie unsere Software kostenlos und unverbindlich testen. 
                Und das für ganze 6 Wochen.
              </p>
              <p>
                Die ersten 6 Wochen Ihrer Mitgliedschaft sind kostenlos. Erst nach dieser 
                Testzeit entsteht ein kostenpflichtiges Vertragsverhältnis. Kündigen Sie 
                während der kostenlosen Testzeit, so entstehen Ihnen keinerlei Kosten.
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-textDark font-medium">Kostenlose Probezeit mit vollem Funktionsumfang</span>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-textDark font-medium">Test ohne Risiko</span>
              </div>
              
              <div className="pl-9 text-sm text-textMuted">
                <p>(Angebot gilt nur einmalig für Neukunden)</p>
              </div>
            </div>
            
            <a
              href="#testen"
              className="inline-block bg-primary text-white px-10 py-3.5 rounded-lg font-bold text-lg hover:bg-primaryDark transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Jetzt kostenlos testen
            </a>
          </div>
          
          {/* Right Column - Video/Visual */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-12 flex flex-col items-center justify-center">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-textDark mb-2">Lernen Sie unsere Software kennen</h3>
              <p className="text-textMuted">
                Gerne stellen wir Ihnen unsere Software in einem kleinen Video vor.
              </p>
            </div>
            
            {/* Placeholder for video */}
            <div className="w-full max-w-md aspect-video bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg overflow-hidden border-2 border-primary/20 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-textDark font-medium">Demo Video</p>
                <p className="text-sm text-textMuted mt-1">Dauer: 3:45 Minuten</p>
              </div>
            </div>
            
            <a
              href="#demo-video"
              className="inline-flex items-center gap-2 mt-8 text-primary font-semibold hover:text-primaryDark transition"
            >
              Video ansehen
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default FreeTrial;