"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const experience = [
  {
    title: "Professional Skipper",
    company: "Navigate Travel",
    location: "London, UK",
    period: "Jun 2024 - Sep 2024",
    description: "Skippered sailing yachts for flotilla charters, ensuring safe navigation and an exceptional experience for all guests.",
    highlights: [
      "Managed daily operations including route planning and weather assessments",
      "Ensured vessel maintenance and safety protocols",
      "Prepared and served meals catering to diverse dietary preferences"
    ]
  },
  {
    title: "Data Analyst",
    company: "MSC PSA European Terminal",
    location: "Antwerp, Belgium",
    period: "Sep 2021 - Oct 2023",
    description: "Analyzed operational data to optimize cargo flow, equipment use, and terminal efficiency.",
    highlights: [
      "Built and managed dashboards for real-time monitoring of KPIs including crane productivity and berth occupancy",
      "Used data analytics to forecast demand and improve resource allocation",
      "Delivered actionable insights to senior management, directly influencing operational decisions"
    ]
  },
];

const education = [
  {
    degree: "Professional Yachtmaster Offshore",
    field: "Navigation, Crew Management & Maritime Safety",
    institution: "United Kingdom Sailing Academy, Cowes",
    period: "Nov 2023 - Mar 2024",
  },
  {
    degree: "Master of Science",
    field: "Business Administration - Global Logistics & Port Management",
    institution: "Catholic University of Leuven",
    period: "Sep 2020 - Sep 2021",
  },
  {
    degree: "Bachelor of Science",
    field: "Business Administration",
    institution: "Catholic University of Leuven",
    period: "Sep 2016 - Sep 2021",
  },
];

const certifications = [
  "STCW Basic Safety Training (Nov 2023) - Firefighting, First Aid, Survival Techniques",
  "Professional Yachtmaster Offshore - Vessels up to 200 GT",
  "Statistical Analysis & Predictive Modeling",
  "Power BI & Data Visualization Expert",
  "Multilingual: Dutch & English (Fluent), French (Proficient), Spanish (Basic)",
];

export default function Resume() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="resume" className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Resume
          </h2>
          <div className="w-20 h-1 bg-brand-orange-500 mx-auto mb-8" />
          <a
            href="/cv.pdf"
            download
            className="inline-flex items-center px-6 py-3 bg-brand-orange-500 hover:bg-brand-orange-600 text-white rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Full CV
          </a>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Experience Timeline */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white">Experience</h3>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative pl-8 border-l-2 border-brand-orange-500"
                >
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-brand-orange-500" />

                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex flex-wrap items-start justify-between mb-2">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">{exp.title}</h4>
                      <span className="text-sm font-medium text-brand-orange-700 dark:text-brand-orange-400 bg-brand-orange-50 dark:bg-brand-orange-900/30 px-3 py-1 rounded-full">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">
                      {exp.company} • {exp.location}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {exp.description}
                    </p>
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start text-gray-600 dark:text-gray-300 text-sm">
                          <svg
                            className="w-4 h-4 mr-2 mt-0.5 text-brand-orange-500 flex-shrink-0"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="space-y-8">
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Education</h3>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">{edu.degree}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{edu.field}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">{edu.institution}</p>
                    <p className="text-xs text-brand-orange-600 dark:text-brand-orange-400 mt-2">{edu.period}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Certifications</h3>
              <div className="space-y-2">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-50 dark:bg-gray-900 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 mr-3 text-brand-orange-500 flex-shrink-0"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{cert}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
