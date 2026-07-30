import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, X, CheckCircle, AlertCircle } from 'lucide-react';
import useBookingStore from '../../store/bookingStore';
import useUiStore from '../../store/uiStore';

const AdminTables = () => {
  const { slots, bookings, cancelBooking } = useBookingStore();
  const { addToast } = useUiStore();

  const handleCancel = (id) => {
    cancelBooking(id);
    addToast('Booking cancelled', 'warning');
  };

  const confirmedBookings = bookings.filter(b => b.status === 'Confirmed');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-gray-900 dark:text-white">Table Booking Management</h1>
        <p className="text-gray-500 text-sm mt-1">{confirmedBookings.length} active bookings</p>
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-sm">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-green-500" /> Available</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-400" /> Booked</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-gray-300" /> Expired</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Slot Overview */}
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Today's Slots</h3>
          <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
            {slots.map(slot => (
              <div key={slot.id} className={`p-2.5 rounded-xl border-2 text-xs font-medium ${
                slot.isExpired  ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-400' :
                slot.isBooked   ? 'border-red-200 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400' :
                                  'border-green-200 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400'
              }`}>
                <p className="font-bold">{slot.start} – {slot.end}</p>
                <p className="mt-0.5 opacity-75">{slot.isExpired ? 'Expired' : slot.isBooked ? 'Booked' : 'Available'}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Active Bookings */}
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Active Bookings</h3>
          {confirmedBookings.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <CalendarDays className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No active bookings</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {confirmedBookings.map(b => (
                <motion.div key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                  <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-accent-400 rounded-xl flex items-center justify-center text-white text-sm font-bold">
                    T{b.tableNo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 dark:text-white">{b.customer}</p>
                    <p className="text-xs text-gray-400">{b.slotTime} · {b.date}</p>
                  </div>
                  <button onClick={() => handleCancel(b.id)}
                    className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* All bookings history */}
      {bookings.length > 0 && (
        <div className="card overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-white">All Bookings</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Booking ID</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Customer</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Date</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Slot</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Table</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {bookings.map(b => (
                  <tr key={b.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">{b.id}</td>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{b.customer}</td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{b.date}</td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{b.slotTime}</td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">Table {b.tableNo}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${b.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{b.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      {b.status === 'Confirmed' && (
                        <button onClick={() => handleCancel(b.id)} className="text-xs text-red-500 hover:text-red-700 font-medium">Cancel</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTables;
