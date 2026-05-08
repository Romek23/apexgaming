import { motion } from "motion/react";
import { Monitor, ArrowRight } from "lucide-react";

export function SetupBanner() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#071B3B] via-[#0A2647] to-[#071B3B] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1694919123854-24b74b376da1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600')] bg-cover bg-center opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071B3B] via-transparent to-[#071B3B]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.1),transparent_70%)]" />
      </div>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[150px] opacity-30 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[150px] opacity-20 animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/30 mb-6"
            >
              <Monitor className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300 font-medium">Gaming Setup</span>
            </motion.div>

            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Створи свій ідеальний
              <span className="block mt-2 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                gaming setup
              </span>
            </h2>

            <p className="text-lg text-blue-100/80 mb-8 leading-relaxed max-w-xl">
              Повний gaming setup з преміальними комплектуючими, моніторами, периферією та RGB освітленням
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                "Gaming монітори",
                "Механічні клавіатури",
                "RGB периферія",
                "Streaming обладнання"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 opacity-90">
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
              Переглянути setup
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl blur-3xl opacity-30" />
            <div className="relative rounded-3xl overflow-hidden border border-blue-500/30 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1694919123854-24b74b376da1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
                alt="Gaming Setup"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071B3B]/50 to-transparent" />
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500 rounded-full blur-3xl opacity-50"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-50"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
