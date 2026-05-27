import { motion } from "motion/react";
import { ArrowRight, Cpu, HardDrive, Zap } from "lucide-react";
import productBlue from "../assets/images/banners/Gaming-Computer-Virtual-Reality-Compatibility-PNG-removebg-preview.png";
import productPink from "../assets/images/banners/vecteezy_modern-gaming-pc-isolated-on-transparent_48412781-removebg-preview.png";
import productRed from "../assets/images/banners/hero-photo-4.png";
import productGreen from "../assets/images/banners/hero-photo-6.png";

const products = [
  {
    id: 1,
    name: "APEX Gaming Pro",
    cpu: "Intel i9-14900K",
    gpu: "RTX 4090",
    ram: "64GB DDR5",
    price: "149,999 ₴",
    image: productBlue,
    badge: "TOP SELLER"
  },
  {
    id: 2,
    name: "TITAN Elite X",
    cpu: "Intel i7-14700K",
    gpu: "RTX 4080",
    ram: "32GB DDR5",
    price: "119,999 ₴",
    image: productPink
  },
  {
    id: 3,
    name: "NEXUS Performance",
    cpu: "Ryzen 9 7950X",
    gpu: "RTX 4070 Ti",
    ram: "32GB DDR5",
    price: "99,999 ₴",
    image: productRed
  },
  {
    id: 4,
    name: "STORM Gaming",
    cpu: "Intel i5-14600K",
    gpu: "RTX 4060 Ti",
    ram: "16GB DDR5",
    price: "69,999 ₴",
    image: productGreen,
    badge: "BEST VALUE"
  }
];

type PopularProductsProps = {
  onNavigateCatalog: () => void;
};

export function PopularProducts({ onNavigateCatalog }: PopularProductsProps) {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.03),transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Популярні
            <span className="block bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              збірки
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Обирай найкращі gaming PC від провідних брендів
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500"
            >
              {product.badge && (
                <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full shadow-lg">
                  {product.badge}
                </div>
              )}

              <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-[#08204a] to-sky-900 aspect-square">
                <div className="absolute inset-8 rounded-full bg-sky-400/42 opacity-90 blur-[44px] transition-opacity duration-300 group-hover:opacity-100" />
                <img
                  src={product.image}
                  alt={product.name}
                  className="relative z-10 h-full w-full object-contain p-5 drop-shadow-[0_0_34px_rgba(56,189,248,0.48)] transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Cpu className="w-4 h-4 text-blue-600" />
                    <span>{product.cpu}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <span>{product.gpu}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <HardDrive className="w-4 h-4 text-blue-600" />
                    <span>{product.ram}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Ціна</div>
                    <div className="text-2xl font-bold text-gray-900">{product.price}</div>
                  </div>
                  <motion.button
                    type="button"
                    onClick={onNavigateCatalog}
                    aria-label={`Переглянути ${product.name} у каталозі`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg shadow-blue-600/50"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            type="button"
            onClick={onNavigateCatalog}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl font-medium transition-all duration-300"
          >
            Переглянути всі збірки
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
