import { motion } from "motion/react";
import { Truck, Shield, Cpu, Headphones } from "lucide-react";

const advantages = [
  {
    icon: Truck,
    title: "Швидка доставка",
    description: "Доставимо ваше замовлення протягом 1-2 днів по всій Україні",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: Shield,
    title: "Гарантія якості",
    description: "Офіційна гарантія на всі комплектуючі до 3 років",
    color: "from-green-500 to-green-600"
  },
  {
    icon: Cpu,
    title: "Потужне залізо",
    description: "Тільки найновіші та найпродуктивніші компоненти",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: Headphones,
    title: "Підтримка 24/7",
    description: "Завжди готові відповісти на ваші питання",
    color: "from-orange-500 to-orange-600"
  }
];

export function Advantages() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.03),transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
              className="relative p-8 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl hover:border-blue-500/30 transition-all duration-500 group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500" />

              <div className="relative">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${advantage.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-transform duration-300 group-hover:scale-105`}
                >
                  <advantage.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{advantage.title}</h3>
                <p className="text-gray-600 leading-relaxed">{advantage.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
