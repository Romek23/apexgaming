import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Олександр Петренко",
    role: "Pro Gamer",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
    rating: 5,
    text: "Найкращий gaming PC який я коли-небудь мав! Продуктивність на максимумі, дизайн неймовірний. Команда професіоналів!"
  },
  {
    name: "Марія Коваленко",
    role: "Content Creator",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    rating: 5,
    text: "Ідеальна збірка для стрімінгу та відеомонтажу. Швидка доставка, професійна підтримка. Рекомендую всім!"
  },
  {
    name: "Дмитро Шевченко",
    role: "Esports Player",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop",
    rating: 5,
    text: "Потужність RTX 4090 в цій збірці дає мені перевагу в змаганнях. Стабільні 240+ FPS у всіх іграх!"
  }
];

export function Reviews() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(37,99,235,0.03),transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Що кажуть наші
            <span className="block bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              клієнти
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Понад 500+ задоволених геймерів довіряють нам
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
              className="relative bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl hover:border-blue-500/30 transition-all duration-500 group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500" />

              <div className="relative z-10">
                <Quote className="w-10 h-10 text-blue-600/20 mb-4" />

                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{review.text}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-50" />
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="relative w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{review.name}</div>
                    <div className="text-sm text-blue-600">{review.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 rounded-full border border-blue-200">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-gray-900">4.9/5.0</span>
            <span className="text-gray-600">• Середній рейтинг з 500+ відгуків</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
