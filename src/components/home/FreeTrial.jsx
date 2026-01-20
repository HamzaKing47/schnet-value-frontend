import { Link } from "react-router-dom";

const FreeTrial = ({ onWatchVideo = () => alert("Watch video!") }) => (
  <section className="py-12 sm:py-20 bg-gradient-to-r from-primaryLighter to-white">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* Left Column - Text Content */}
          <div className="p-6 sm:p-8 md:p-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-1 bg-primary rounded-full"></div>
              <span className="text-primary font-semibold uppercase text-xs sm:text-sm tracking-wider">
                Kostenlos testen
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-textDark mb-6">
              6 Wochen kostenlos testen
            </h2>

            <div className="space-y-4 text-textMuted text-sm sm:text-base mb-8">
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
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-2 h-2 sm:w-3 sm:h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-textDark font-medium text-sm sm:text-base">Kostenlose Probezeit mit vollem Funktionsumfang</span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-2 h-2 sm:w-3 sm:h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-textDark font-medium text-sm sm:text-base">Test ohne Risiko</span>
              </div>

              <div className="pl-8 sm:pl-9 text-xs sm:text-sm text-textMuted">
                <p>(Angebot gilt nur einmalig für Neukunden)</p>
              </div>
            </div>

            <Link
              to="/register"
              className="inline-block w-full sm:w-auto text-center bg-primary text-white px-6 sm:px-10 py-3 sm:py-3.5 rounded-lg font-bold text-base sm:text-lg hover:bg-primaryDark transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Jetzt kostenlos testen
            </Link>
          </div>

          {/* Right Column - Video/Visual */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 sm:p-8 md:p-12 flex flex-col items-center justify-center">
            <div className="text-center mb-6 sm:mb-8">
              <div className="w-14 h-14 sm:w-20 sm:h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-6 h-6 sm:w-10 sm:h-10 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-textDark mb-2">Lernen Sie unsere Software kennen</h3>
              <p className="text-textMuted text-sm sm:text-base">
                Gerne stellen wir Ihnen unsere Software in einem kleinen Video vor.
              </p>
            </div>

            {/* Placeholder for video */}
            <div className="w-full aspect-video bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg overflow-hidden border-2 border-primary/20 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-textDark font-medium text-sm sm:text-base">Demo Video</p>
                <p className="text-xs sm:text-sm text-textMuted mt-1">Dauer: 3:45 Minuten</p>
              </div>
            </div>

            <button
              onClick={onWatchVideo}
              className="inline-flex items-center gap-2 mt-6 sm:mt-8 text-primary font-semibold hover:text-primaryDark transition text-sm sm:text-base"
            >
              Video ansehen
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default FreeTrial;