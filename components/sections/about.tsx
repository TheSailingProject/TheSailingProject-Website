"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const skills = [
  { category: "Data & Analytics", items: ["Statistical Analysis", "Predictive Models", "Power BI", "Microsoft Excel", "Python", "SQL"] },
  { category: "Maritime", items: ["Professional Yachtmaster Offshore", "Navigation & Safety", "Crew Management", "STCW Certified"] },
  { category: "Languages", items: ["Dutch (Native)", "English (Fluent)", "French (Proficient)", "Spanish (Basic)"] },
  { category: "Hobbies & Interests", items: ["Sailing", "Tennis", "Hiking"] },
];

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            About Me
          </h2>
          <div className="w-20 h-1 bg-brand-orange-500 mx-auto mb-8" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                I'm a <strong>Data Analyst</strong> with a Master's degree in Business Administration specializing in
                <strong> Global Logistics & Port Management</strong> from Catholic University of Leuven. Currently based in Brussels,
                I combine analytical expertise with maritime passion.
              </p>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                My professional experience includes working as a <strong>Data Analyst at MSC PSA European Terminal</strong> in Antwerp,
                where I analyzed operational data to optimize cargo flow, built dashboards for real-time KPI monitoring, and
                delivered actionable insights that directly influenced operational decisions.
              </p>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Beyond the world of data, I'm a <strong>Professional Yachtmaster Offshore</strong>, having completed intensive training
                at the United Kingdom Sailing Academy. I've skippered sailing yachts for Navigate Travel, combining my leadership
                skills with my passion for the sea. The same principles that guide good data analysis—attention to detail,
                strategic planning, and decisive action—are essential for successful navigation.
              </p>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                I'm multilingual, speaking Dutch and English fluently, with strong French and basic Spanish. This linguistic
                versatility, combined with my analytical skills and maritime expertise, allows me to work effectively across
                diverse international environments.
              </p>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-brand-orange-500 dark:hover:border-brand-orange-400 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
