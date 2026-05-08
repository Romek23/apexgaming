import { motion } from "motion/react";
import { Globe, Share2, MessageCircle, Video, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#071B3B] via-[#0A2647] to-[#071B3B] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(37,99,235,0.1),transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl mb-4 cursor-pointer"
            >
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent font-bold">APEX</span>
              <span className="text-white font-light">GAMING</span>
            </motion.div>
            <p className="text-blue-200/70 leading-relaxed mb-6">
              Преміальні ігрові комп'ютери та комплектуючі для справжніх геймерів
            </p>
            <div className="flex gap-3">
              {[Globe, Share2, MessageCircle, Video].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-blue-500/10 hover:bg-blue-500 rounded-xl transition-all duration-300 backdrop-blur-sm border border-blue-500/20"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Навігація</h4>
            <ul className="space-y-3">
              {['Головна', 'Каталог', 'Збірки', 'Комплектуючі', 'Про нас'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-blue-200/70 hover:text-blue-400 transition-colors inline-block hover:translate-x-1 duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Підтримка</h4>
            <ul className="space-y-3">
              {['Доставка та оплата', 'Гарантія', 'Повернення', 'FAQ', 'Контакти'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-blue-200/70 hover:text-blue-400 transition-colors inline-block hover:translate-x-1 duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Розсилка</h4>
            <p className="text-blue-200/70 mb-4 text-sm">
              Отримуй новини про акції та нові продукти
            </p>
            <div className="flex gap-2 mb-6">
              <input
                type="email"
                placeholder="Твій email"
                className="flex-1 px-4 py-3 bg-white/5 border border-blue-500/20 rounded-xl text-white placeholder:text-blue-200/40 focus:outline-none focus:border-blue-400 transition-colors backdrop-blur-sm"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/50"
              >
                <Mail className="w-5 h-5" />
              </motion.button>
            </div>
            <p className="text-blue-200/50 text-xs">
              Підписуючись, ти погоджуєшся з нашою політикою конфіденційності
            </p>
          </div>
        </div>

        <div className="border-t border-blue-500/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-blue-200/70">
              © 2026 APEX GAMING. Всі права захищені.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-blue-200/70 hover:text-blue-400 transition-colors">
                Політика конфіденційності
              </a>
              <a href="#" className="text-blue-200/70 hover:text-blue-400 transition-colors">
                Умови використання
              </a>
              <a href="#" className="text-blue-200/70 hover:text-blue-400 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
