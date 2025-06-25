import { motion } from "framer-motion";
import { BeatLoader } from "react-spinners";

const Generating = ({ className = "" }) => {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className={`flex items-center gap-3 h-14 px-6 rounded-full bg-white/10 dark:bg-n-9/40 backdrop-blur-md border border-white/20 dark:border-n-1/20 shadow-lg text-sm font-medium text-n-1 dark:text-n-12 ${className}`}
    >
      <BeatLoader
        color="#ffffff"
        size={8}
        cssOverride={{}}
        speedMultiplier={0.5}
      />
      <span className="animate-pulse">Running Automation...</span>
      

    </motion.div>
  );
};

export default Generating;
