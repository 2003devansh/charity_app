import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <>
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="text-white max-w-4xl text-center font-karla">
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-semibold leading-tight"
          >
            Start where you are.
            <br />
            Help with what you have.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.6, ease: "easeOut", delay: 0.2 }}
            className="mt-8 text-xl md:text-2xl text-gray-300 leading-relaxed"
          >
            It doesn't take much—one item, one task, one moment of care.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 70, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.8, ease: "easeOut", delay: 0.4 }}
            className="mt-4 text-lg md:text-xl text-gray-400"
          >
            Let's take the next step together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }}
            className="mt-12 flex flex-col md:flex-row gap-4 justify-center"
          >
            <button className="px-8 py-3 bg-white text-black text-lg rounded-md hover:bg-gray-200 transition-all">
              Start Helping
            </button>

            <button className="px-8 py-3 border border-white text-white text-lg rounded-md hover:bg-white hover:text-black transition-all">
              View Dashboard
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
