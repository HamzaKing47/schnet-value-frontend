import doc1 from "../../assets/doc-1.png";
import doc2 from "../../assets/doc-2.png";
import doc3 from "../../assets/doc-3.png";

const Documents = () => (
  <section className="py-24 bg-white">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="text-center mb-12">
        <span className="text-primary font-semibold">PROFESSIONELLE DOKUMENTE</span>
        <h2 className="mt-2 text-3xl font-bold text-textDark">
          Individuelle <span className="text-primary">Bewertungsdokumente</span>
        </h2>
        <p className="mt-4 text-textMuted max-w-3xl mx-auto">
          Bewertungsdokumente mit Ihrem Logo, CI und editierbar in Word/OpenOffice.
        </p>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-8">
        {[doc1, doc2, doc3].map((doc, i) => (
          <div key={i} className="group relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <img 
              src={doc} 
              className="relative rounded-lg shadow-lg transform group-hover:scale-[1.03] transition-transform duration-300"
              alt={`Dokument ${i + 1}`}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-4 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white font-medium">Dokument {i + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Documents;