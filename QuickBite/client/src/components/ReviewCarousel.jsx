import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { REVIEWS } from '../data/mockData';

const ReviewCarousel = () => {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx(i => (i - 1 + REVIEWS.length) % REVIEWS.length);
  const next = () => setIdx(i => (i + 1) % REVIEWS.length);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, []);

  const visible = [
    REVIEWS[idx],
    REVIEWS[(idx + 1) % REVIEWS.length],
    REVIEWS[(idx + 2) % REVIEWS.length],
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-950" id="reviews">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">What Students <span className="gradient-text">Say</span></h2>
          <p className="section-subtitle">Real reviews from real canteen visitors</p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visible.map((r, i) => (
              <motion.div key={r.id + idx + i}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card p-6 flex flex-col gap-4"
              >
                <div className="flex items-start gap-3">
                  <img src={r.avatar} alt={r.name} className="w-12 h-12 rounded-2xl bg-primary-100" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{r.name}</p>
                    <p className="text-xs text-gray-400">{r.college}</p>
                    <div className="flex gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Star key={si} className={`w-3.5 h-3.5 ${si < r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-1">"{r.text}"</p>
                <p className="text-xs text-gray-400">{r.date}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} className="w-10 h-10 rounded-full border-2 border-primary-200 text-primary-500 flex items-center justify-center hover:bg-primary-50 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {REVIEWS.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)}
                  className={`transition-all duration-300 rounded-full ${i === idx ? 'w-6 h-2.5 bg-primary-500' : 'w-2.5 h-2.5 bg-gray-200 dark:bg-gray-700'}`} />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border-2 border-primary-200 text-primary-500 flex items-center justify-center hover:bg-primary-50 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewCarousel;
