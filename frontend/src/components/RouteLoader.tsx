import { motion } from "motion/react";

export function RouteLoader({ label = "Завантаження..." }: { label?: string }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex flex-col items-center gap-4"
      >
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-700/30 border border-blue-500/30 backdrop-blur-xl shadow-[0_0_60px_rgba(37,99,235,0.25)] flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.9, ease: "linear", repeat: Infinity }}
            className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg"
          />
        </div>
        <div className="text-slate-800 font-semibold">{label}</div>
        <div className="w-64 max-w-[80vw] h-2 rounded-full bg-blue-100 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-700"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 0.9, ease: "easeInOut", repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
}

