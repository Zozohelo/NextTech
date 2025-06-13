const Contact = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 pt-14 pb-8 px-4" id="contact">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {/* Kapcsolat Info */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">Elérhetőség</h3>
          <ul className="space-y-2 text-gray-300 text-base">
            <li>
              <span className="font-semibold text-white">Cím:</span> 1117
              Budapest, Irinyi József utca 4-20.
            </li>
            <li>
              <span className="font-semibold text-white">Telefon:</span>{" "}
              <a
                href="tel:+36201234567"
                className="hover:text-red-400 transition"
              >
                +36 20 123 4567
              </a>
            </li>
            <li>
              <span className="font-semibold text-white">Email:</span>{" "}
              <a
                href="mailto:info@nexttech.hu"
                className="hover:text-red-400 transition"
              >
                info@nexttech.hu
              </a>
            </li>
            <li>
              <span className="font-semibold text-white">Nyitvatartás:</span>{" "}
              H-P: 9:00 - 18:00
            </li>
            <li>
              <span className="font-semibold text-white">Adószám:</span>{" "}
              12345678-1-42
            </li>
          </ul>

          {/* Social icons */}
          <div className="flex gap-4 mt-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-gray-300 hover:text-blue-400 text-2xl transition"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.676 0h-21.352C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.676 0" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-300 hover:text-pink-400 text-2xl transition"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5C19.097 2 21 3.903 21 6.25v8.5C21 20.097 19.097 22 16.25 22h-8.5C4.903 22 3 20.097 3 17.25v-8.5C3 3.903 4.903 2 7.75 2zm8.5 2h-8.5C5.68 4 4 5.68 4 7.75v8.5C4 18.32 5.68 20 7.75 20h8.5c2.07 0 3.75-1.68 3.75-3.75v-8.5C20 5.68 18.32 4 16.25 4zm-4.25 2.5A5.5 5.5 0 1 1 6.5 12a5.507 5.507 0 0 1 5.5-5.5zm0 2A3.5 3.5 0 1 0 15.5 12a3.504 3.504 0 0 0-3.5-3.5zm6.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-gray-300 hover:text-blue-400 text-2xl transition"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557a9.89 9.89 0 0 1-2.828.775A4.93 4.93 0 0 0 23.337 3.1a9.864 9.864 0 0 1-3.127 1.195A4.918 4.918 0 0 0 16.616 2c-2.737 0-4.956 2.223-4.956 4.96 0 .39.043.767.127 1.13C7.728 7.885 4.1 5.92 1.671 2.903a4.822 4.822 0 0 0-.666 2.49c0 1.72.877 3.233 2.211 4.123a4.904 4.904 0 0 1-2.245-.619c-.054 2.3 1.582 4.47 3.949 4.96A4.935 4.935 0 0 1 .96 13.58a9.906 9.906 0 0 0 5.362 1.572c6.432 0 9.953-5.334 9.953-9.957 0-.152-.004-.304-.012-.454A7.13 7.13 0 0 0 24 4.557z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-300 hover:text-blue-300 text-2xl transition"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.23 0H1.77C.791 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.77 24h20.459C23.208 24 24 23.229 24 22.272V1.723C24 .771 23.208 0 22.23 0zm-13.538 20.452H3.775V9.048h4.917v11.404zM6.375 7.633A2.844 2.844 0 1 1 9.22 4.789c0 1.569-1.276 2.844-2.845 2.844zm14.077 12.819h-4.917v-5.569c0-1.328-.025-3.037-1.853-3.037-1.854 0-2.137 1.447-2.137 2.943v5.663h-4.917V9.048h4.721v1.561h.067c.659-1.248 2.266-2.563 4.664-2.563 4.993 0 5.917 3.285 5.917 7.557v5.849z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Google Maps / Térkép */}
        <div className="w-full h-64 md:h-52 rounded-2xl overflow-hidden shadow-lg flex items-center justify-center bg-gray-800">
          {/* Random hely: Budapest, Irinyi József utca */}
          <iframe
            title="Térkép"
            width="100%"
            height="100%"
            className="rounded-2xl border-0"
            style={{ minHeight: "210px" }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.openstreetmap.org/export/embed.html?bbox=19.05550312995911%2C47.4693990388702%2C19.061366319656376%2C47.47241300976459&amp;layer=mapnik&amp;marker=47.4709,19.0584"
          ></iframe>
        </div>

        {/* Rólunk, infók */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">
            NextTech Webshop
          </h3>
          <p className="text-gray-300 mb-3">
            A legújabb telefonok, tabletek és számítógépek egy helyen. Szakértői
            segítség, gyors szállítás, megbízható garancia. Csatlakozz a több
            ezer elégedett vásárlóhoz!
          </p>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} NextTech. Minden jog fenntartva.
          </p>
        </div>
      </div>

      {/* Alsó vékony sáv */}
      <div className="mt-14 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
        Made with <span className="text-red-500">♥</span> by Zoltán Kozma
      </div>
    </footer>
  );
};

export default Contact;
