import React from 'react';
import { ANNOUNCEMENT_ITEMS, isCafeOpen } from '../data/mockData';

const AnnouncementBar = () => {
  const open = isCafeOpen();
  const items = open
    ? ANNOUNCEMENT_ITEMS
    : ['🔴 Cafe Closed – Opens at 9:00 AM', '😴 We\'re resting, see you soon!', '📅 Timings: Mon–Sat 9AM–9PM'];

  const repeatedItems = [...items, ...items]; // double for seamless loop

  return (
    <div className={`w-full py-2 overflow-hidden text-sm font-medium ${
      open
        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
        : 'bg-gray-800 text-gray-200'
    }`}>
      <div className="flex">
        <div className="animate-marquee flex items-center gap-0">
          {repeatedItems.map((item, idx) => (
            <span key={idx} className="inline-flex items-center gap-2 mx-8 whitespace-nowrap">
              {item}
              <span className="opacity-50 mx-4">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
