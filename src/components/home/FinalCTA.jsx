const FinalCTA = () => (
  <section className="py-24 bg-gradient-to-r from-primary to-primaryDark text-white text-center relative overflow-hidden">
    {/* Background pattern */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '30px 30px'
      }}></div>
    </div>
    
    <div className="relative z-10 max-w-3xl mx-auto px-6">
      <h2 className="text-4xl font-bold">
        6 Wochen <span className="text-yellow-300">kostenlos</span> testen
      </h2>
      
      <p className="mt-6 text-xl opacity-90">
        Testen Sie unsere Software unverbindlich und ohne Risiko.
        Keine Kreditkarte erforderlich.
      </p>
      
      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="#testen"
          className="inline-block bg-white text-primary px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-200 shadow-2xl hover:shadow-3xl hover:-translate-y-1"
        >
          Jetzt kostenlos testen
        </a>
        <a
          href="#demo"
          className="inline-block border-2 border-white/50 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
        >
          Demo vereinbaren
        </a>
      </div>
      
      <p className="mt-8 text-sm opacity-75">
        Keine Verpflichtungen • Jederzeit kündbar • Volle Funktionen inklusive
      </p>
    </div>
  </section>
);

export default FinalCTA;