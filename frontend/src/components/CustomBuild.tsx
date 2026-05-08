import { motion } from "motion/react";
import { Cpu, ArrowRight } from "lucide-react";

export function CustomBuild() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(37,99,235,0.05),transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-br from-[#071B3B] to-[#0A2647] rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1658262530868-f7460e2f071f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071B3B] via-transparent to-[#071B3B]/80" />

          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[150px] opacity-20" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[150px] opacity-20" />

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
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl blur-3xl opacity-30" />
              <img
                src="https://images.unsplash.com/photo-1658673934023-6005e1ff7ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Custom PC Build"
                className="relative rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
