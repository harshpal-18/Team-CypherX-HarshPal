import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, CheckCircle, Info } from 'lucide-react';
import Navbar from '../../components/Navbar';
import useBookingStore from '../../store/bookingStore';
import useAuthStore from '../../store/authStore';
import useUiStore from '../../store/uiStore';

const TABLES = [1, 2, 3, 4, 5, 6];

const TableBookingPage = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedTable, setSelectedTable] = useState(1);
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(null);
  const { slots, bookings, bookSlot, selectedDate, setSelectedDate } = useBookingStore();
  const { user } = useAuthStore();
  const { addToast } = useUiStore();

  const handleBook = async () => {
    if (!selectedSlot) { addToast('Please select a time slot', 'warning'); return; }
    setConfirming(true);
    await new Promise(r => setTimeout(r, 800));
    const booking = bookSlot(selectedSlot.id, user, selectedTable);
    if (booking) {
      setConfirmed(booking);
      addToast(`Table ${selectedTable} booked for ${selectedSlot.start}–${selectedSlot.end} 🎉`, 'success');
    } else {
      addToast('Slot no longer available', 'error');
    }
    setConfirming(false);
  };

  const myBookings = bookings.filter(b => b.customer === user?.name);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display font-bold text-3xl text-gray-900 dark:text-white mb-2">Book a Table 🪑</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Reserve your dining slot — 45 minutes per booking</p>
        </motion.div>

        {/* Info bar */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 px-4 py-2 rounded-2xl border border-gray-200 dark:border-gray-700">
            <Clock className="w-4 h-4 text-primary-500" /> Cafe: 9:00 AM – 9:00 PM
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 px-4 py-2 rounded-2xl border border-gray-200 dark:border-gray-700">
            <Clock className="w-4 h-4 text-primary-500" /> 45 min per slot
          </div>
          <div className="flex gap-3 items-center text-sm">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-green-500" /> Available</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-400" /> Booked</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-gray-300" /> Expired</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Slot Grid + Booking */}
          <div className="lg:col-span-2 space-y-6">
            {/* Date Picker */}
            <div className="card p-5">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary-500" /> Select Date
              </label>
              <input type="date" value={selectedDate} onChange={e => { setSelectedDate(e.target.value); setSelectedSlot(null); setConfirmed(null); }}
                min={new Date().toISOString().split('T')[0]}
                className="input max-w-xs" />
            </div>

            {/* Table selector */}
            <div className="card p-5">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-primary-500" /> Select Table
              </label>
              <div className="flex flex-wrap gap-2">
                {TABLES.map(t => (
                  <button key={t} onClick={() => setSelectedTable(t)}
                    className={`w-12 h-12 rounded-2xl font-bold text-sm border-2 transition-all ${
                      selectedTable === t
                        ? 'border-primary-500 bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-card'
                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-primary-300'
                    }`}>T{t}</button>
                ))}
              </div>
            </div>

            {/* Time Slot Grid */}
            <div className="card p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary-500" /> Available Slots
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {slots.map(slot => {
                  const isSelected = selectedSlot?.id === slot.id;
                  let cls = 'border-2 rounded-2xl p-3 text-center text-sm font-medium transition-all duration-200 ';
                  if (slot.isExpired)        cls += 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-300 cursor-not-allowed';
                  else if (slot.isBooked)    cls += 'border-red-200 bg-red-50 dark:bg-red-950/20 text-red-400 cursor-not-allowed';
                  else if (isSelected)       cls += 'border-primary-500 bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-card';
                  else                       cls += 'border-green-200 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 hover:border-green-400 cursor-pointer hover:shadow-sm';

                  return (
                    <motion.button key={slot.id} whileTap={(!slot.isBooked && !slot.isExpired) ? { scale: 0.95 } : {}}
                      onClick={() => !slot.isBooked && !slot.isExpired && setSelectedSlot(slot)}
                      className={cls}
                      disabled={slot.isBooked || slot.isExpired}>
                      <p className="font-bold">{slot.start}</p>
                      <p className="text-xs opacity-75">to {slot.end}</p>
                      <p className="text-[10px] mt-1 font-semibold">
                        {slot.isExpired ? 'Expired' : slot.isBooked ? 'Booked' : 'Available'}
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Booking Summary */}
          <div className="space-y-4">
            {confirmed ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card p-6 text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-950/40 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">Table Booked! 🎉</h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mt-4 text-left bg-gray-50 dark:bg-gray-900 rounded-2xl p-4">
                  <div className="flex justify-between"><span>Booking ID</span><span className="font-semibold text-gray-900 dark:text-white">{confirmed.id}</span></div>
                  <div className="flex justify-between"><span>Date</span><span className="font-semibold text-gray-900 dark:text-white">{confirmed.date}</span></div>
                  <div className="flex justify-between"><span>Time</span><span className="font-semibold text-gray-900 dark:text-white">{confirmed.slotTime}</span></div>
                  <div className="flex justify-between"><span>Table</span><span className="font-semibold text-gray-900 dark:text-white">T{confirmed.tableNo}</span></div>
                </div>
                <button onClick={() => { setConfirmed(null); setSelectedSlot(null); }} className="btn-outline w-full mt-4 text-sm py-2.5">Book Another</button>
              </motion.div>
            ) : (
              <div className="card p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Booking Summary</h3>
                {selectedSlot ? (
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Date</span><span className="font-semibold text-gray-900 dark:text-white">{selectedDate}</span></div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Time</span><span className="font-semibold text-gray-900 dark:text-white">{selectedSlot.start} – {selectedSlot.end}</span></div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Table</span><span className="font-semibold text-gray-900 dark:text-white">Table {selectedTable}</span></div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Duration</span><span className="font-semibold text-gray-900 dark:text-white">45 minutes</span></div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Name</span><span className="font-semibold text-gray-900 dark:text-white">{user?.name || 'Guest'}</span></div>
                    <div className="border-t border-gray-100 dark:border-gray-800 pt-3">
                      <div className="flex justify-between font-bold text-gray-900 dark:text-white">
                        <span>Booking Fee</span><span className="text-green-600">FREE</span>
                      </div>
                    </div>
                    <motion.button onClick={handleBook} disabled={confirming} whileTap={{ scale: 0.97 }}
                      className="btn-primary w-full justify-center py-3.5 mt-2">
                      {confirming ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Booking...</span> : 'Confirm Booking'}
                    </motion.button>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <Calendar className="w-10 h-10 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">Select a time slot to proceed</p>
                  </div>
                )}
              </div>
            )}

            {/* My Bookings */}
            {myBookings.length > 0 && (
              <div className="card p-5">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">My Bookings</h3>
                <div className="space-y-2">
                  {myBookings.slice(0, 3).map(b => (
                    <div key={b.id} className="flex items-center justify-between text-xs p-2 bg-gray-50 dark:bg-gray-900 rounded-xl">
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-gray-200">{b.slotTime}</p>
                        <p className="text-gray-400">{b.date} · Table {b.tableNo}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        b.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>{b.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableBookingPage;
