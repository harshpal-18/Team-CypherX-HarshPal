import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateTimeSlots } from '../data/mockData';

const useBookingStore = create(
  persist(
    (set, get) => ({
      slots: generateTimeSlots(),
      bookings: [],
      selectedDate: new Date().toISOString().split('T')[0],

      setSelectedDate: (date) => {
        set({ selectedDate: date, slots: generateTimeSlots(new Date(date)) });
      },

      bookSlot: (slotId, user, tableNo = 1) => {
        const slot = get().slots.find(s => s.id === slotId);
        if (!slot || slot.isBooked || slot.isExpired) return null;
        const booking = {
          id: `BK-${Date.now()}`,
          slotId,
          slotTime: `${slot.start} – ${slot.end}`,
          date: get().selectedDate,
          customer: user?.name || 'Guest',
          tableNo,
          status: 'Confirmed',
        };
        set(s => ({
          slots: s.slots.map(sl => sl.id === slotId ? { ...sl, isBooked: true } : sl),
          bookings: [booking, ...s.bookings],
        }));
        return booking;
      },

      cancelBooking: (bookingId) => {
        const booking = get().bookings.find(b => b.id === bookingId);
        if (!booking) return;
        set(s => ({
          bookings: s.bookings.map(b => b.id === bookingId ? { ...b, status: 'Cancelled' } : b),
          slots: s.slots.map(sl => sl.id === booking.slotId ? { ...sl, isBooked: false } : sl),
        }));
      },
    }),
    { name: 'quickbite-bookings', partialize: s => ({ bookings: s.bookings }) }
  )
);

export default useBookingStore;
