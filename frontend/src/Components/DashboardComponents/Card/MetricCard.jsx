import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const MetricCard = ({ title, value, unit, color = "bg-orange-500", border = "border-orange-700" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`rounded-2xl shadow-xl p-6 text-white ${color} ${border} border`}
    >
      <h3 className="text-sm font-semibold text-orange-100">{title}</h3>
      <p className="text-2xl font-bold mt-1">
        {value}
        {unit && <span className="text-lg font-medium ml-1">{unit}</span>}
      </p>
    </motion.div>
  );
};

export default MetricCard;
