import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../data/mockData';

const FAQAccordion = () => {
  const [open, setOpen] = useState(null);
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900" id="faq">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Frequently Asked <span className="gradient-text">Questions</span></h2>
          <p className="section-subtitle">Everything you need to know about Quick Bite</p>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="card overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left">
                <span className="font-semibold text-gray-900 dark:text-white pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-primary-500 flex-shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                    <p className="px-5 pb-5 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
