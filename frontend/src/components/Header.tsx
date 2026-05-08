import { motion } from "motion/react";
import { ShoppingCart, User, Search } from "lucide-react";

export function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-gray-200/30 shadow-sm"
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl tracking-tight cursor-pointer"
          >
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent font-bold">APEX</span>
            <span className="text-gray-900 font-light">GAMING</span>
          </motion.div>

          <div className="hidden lg:flex items-center gap-8">
            {['Головна', 'Каталог', 'Збірки', 'Комплектуючі', 'Про нас', 'Контакти'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm text-gray-700 hover:text-blue-600 transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-300"
          >
            <Search className="w-5 h-5 text-gray-700" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-300"
          >
            <ShoppingCart className="w-5 h-5 text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-300"
          >
            <User className="w-5 h-5 text-gray-700" />
          </motion.button>
        </div>
      </nav>
    </motion.header>
  );
}
