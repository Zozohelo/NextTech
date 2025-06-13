const About = () => {
  return (
    <section
      id="about"
      className="bg-gray-950 py-16 px-4 md:px-0 flex justify-center"
    >
      <div className="max-w-4xl w-full mx-auto text-gray-100 flex flex-col items-center">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-white drop-shadow-lg">
          Rólunk
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mb-8 text-center leading-relaxed">
          A <span className="text-indigo-400 font-bold">NextTech</span>{" "}
          webshopot 2022-ben alapítottuk azzal a céllal, hogy a legújabb
          technológiai eszközöket elérhetővé tegyük mindenki számára.
          Szenvedélyesen hiszünk abban, hogy a modern élethez elengedhetetlenek
          a megbízható, minőségi készülékek – legyen szó telefonról, tabletről
          vagy számítógépről.
        </p>
        <div className="flex flex-col md:flex-row gap-8 w-full">
          <div className="flex-1 bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-indigo-400 mb-2">
              Küldetésünk
            </h3>
            <p className="text-gray-300">
              Küldetésünk, hogy ügyfeleink mindig naprakész és kiváló
              készülékekhez jussanak, gyors szállítással, megbízható garanciával
              és ügyfélbarát kiszolgálással.
            </p>
          </div>
          <div className="flex-1 bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-indigo-400 mb-2">
              Rólunk néhány érdekesség
            </h3>
            <ul className="list-disc pl-4 text-gray-300 space-y-1">
              <li>100% magyar tulajdonú vállalkozás vagyunk</li>
              <li>
                Már több mint <span className="font-bold text-white">5000</span>{" "}
                elégedett vásárló
              </li>
              <li>Folyamatosan bővülő, prémium termékkínálat</li>
              <li>Gyors, országos szállítás</li>
              <li>Biztonságos online fizetés</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 bg-gray-800/90 rounded-2xl shadow-inner py-6 px-6 w-full text-center">
          <h3 className="text-lg md:text-xl font-bold text-white mb-2">
            Miért válassz minket?
          </h3>
          <p className="text-gray-300">
            <span className="font-semibold text-indigo-400">NextTech</span> –
            ahol a technológia találkozik a megbízhatósággal és a szenvedéllyel.
            Iratkozz fel hírlevelünkre, hogy elsőként értesülj az újdonságokról,
            akciókról!
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
