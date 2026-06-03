import { motion } from "motion/react";
import { Cpu, ArrowRight } from "lucide-react";
import customBuildPc from "../assets/images/banners/vecteezy_modern-gaming-pc-isolated-on-transparent_48412781-removebg-preview.png";

type CustomBuildProps = {
  onNavigateBuilder: () => void;
};

export function CustomBuild({ onNavigateBuilder }: CustomBuildProps) {
  return (
    <section className="dark-gradient-section py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(37,99,235,0.05),transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-br from-[#071B3B] to-[#0A2647] rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(56,189,248,0.16),transparent_42%)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071B3B] via-transparent to-[#071B3B]/80" />

          <div className="absolute right-1/4 top-0 h-96 w-96 rounded-full bg-blue-500 opacity-[0.18] blur-[96px]" />
          <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-purple-500 opacity-[0.18] blur-[96px]" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center p-12 lg:p-16">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/30 mb-6"
              >
                <Cpu className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-300 font-medium">Custom Build</span>
              </motion.div>

              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Збери свій
                <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  ідеальний ПК
                </span>
              </h2>

              <p className="text-lg text-blue-100/70 mb-8 leading-relaxed">
                Підбери комплектуючі під свої потреби та бюджет. Наші експерти допоможуть створити оптимальну конфігурацію.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Професійна консультація",
                  "Гарантія сумісності",
                  "Безкоштовна збірка",
                  "Тестування перед відправкою"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 opacity-90">
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    <span className="text-blue-100/80">{item}</span>
                  </div>
                ))}
              </div>

              <motion.button
                type="button"
                onClick={onNavigateBuilder}
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(37,99,235,0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl font-medium flex items-center gap-2 transition-all duration-300 shadow-lg shadow-blue-600/50"
              >
                Почати збірку
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl blur-3xl opacity-45" />
              <img
                src={customBuildPc}
                alt="Custom PC Build"
                className="relative mx-auto max-h-[480px] w-full object-contain drop-shadow-[0_0_52px_rgba(217,70,239,0.54)]"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
