import doc1 from "../../assets/doc-1.png";
import doc2 from "../../assets/doc-2.png";
import doc3 from "../../assets/doc-3.png";

const Documents = () => (
  <section className="py-12 sm:py-24 bg-white">
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
      <div className="text-center mb-8 sm:mb-12">
        <span className="text-primary font-semibold text-sm sm:text-base">PROFESSIONELLE DOKUMENTE</span>
        <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-textDark">
          Individuelle <span className="text-primary">Bewertungsdokumente</span>
        </h2>
        <p className="mt-3 sm:mt-4 text-textMuted text-sm sm:text-base max-w-3xl mx-auto">
          Bewertungsdokumente mit Ihrem Logo, CI und editierbar in Word/OpenOffice.
        </p>
      </div>

      <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {[doc1, doc2, doc3].map((doc, i) => (
          <div key={i} className="group relative">
            <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <img 
              src={doc} 
              className="relative rounded-lg shadow-lg transform group-hover:scale-[1.03] transition-transform duration-300 w-full h-auto"
              alt={`Dokument ${i + 1}`}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-3 sm:p-4 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white font-medium text-sm sm:text-base">Dokument {i + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Documents;