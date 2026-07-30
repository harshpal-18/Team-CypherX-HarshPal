// ─── Mock Food Data ───────────────────────────────────────────────────────────
export const FOODS = [
  // Breakfast
  { id: 'f1',  name: 'Masala Dosa',        category: 'Breakfast', price: 60,  rating: 4.6, prepTime: 10, isVeg: true,  isPopular: true,  isSpecial: false, isOutOfStock: false, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80', description: 'Crispy dosa with spicy potato filling and chutneys.' },
  { id: 'f2',  name: 'Poha',               category: 'Breakfast', price: 35,  rating: 4.3, prepTime: 8,  isVeg: true,  isPopular: false, isSpecial: false, isOutOfStock: false, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80', description: 'Light flattened rice with peas, peanuts and spices.' },
  { id: 'f3',  name: 'Upma',               category: 'Breakfast', price: 30,  rating: 4.1, prepTime: 7,  isVeg: true,  isPopular: false, isSpecial: false, isOutOfStock: false, image: 'https://images.unsplash.com/photo-1630409346824-4f1a6a72d23e?w=400&q=80', description: 'Semolina porridge with vegetables and tempering.' },
  { id: 'f4',  name: 'Bread Omelette',     category: 'Breakfast', price: 45,  rating: 4.4, prepTime: 5,  isVeg: false, isPopular: true,  isSpecial: false, isOutOfStock: false, image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&q=80', description: 'Fluffy omelette with buttered toast.' },
  { id: 'f5',  name: 'Idli Sambar',        category: 'Breakfast', price: 40,  rating: 4.5, prepTime: 8,  isVeg: true,  isPopular: true,  isSpecial: false, isOutOfStock: false, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80', description: 'Soft steamed rice cakes with lentil soup.' },

  // Lunch
  { id: 'f6',  name: 'Veg Thali',          category: 'Lunch',     price: 90,  rating: 4.7, prepTime: 15, isVeg: true,  isPopular: true,  isSpecial: true,  isOutOfStock: false, image: 'https://images.unsplash.com/photo-1626132647523-66e5bf30888d?w=400&q=80', description: 'Complete meal – dal, sabzi, roti, rice, salad & dessert.' },
  { id: 'f7',  name: 'Chicken Biryani',    category: 'Lunch',     price: 130, rating: 4.8, prepTime: 20, isVeg: false, isPopular: true,  isSpecial: true,  isOutOfStock: false, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80', description: 'Aromatic basmati rice with tender spiced chicken.' },
  { id: 'f8',  name: 'Paneer Butter Masala', category: 'Lunch',   price: 110, rating: 4.6, prepTime: 15, isVeg: true,  isPopular: true,  isSpecial: false, isOutOfStock: false, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80', description: 'Creamy tomato-based gravy with soft paneer cubes.' },
  { id: 'f9',  name: 'Dal Rice',           category: 'Lunch',     price: 70,  rating: 4.2, prepTime: 10, isVeg: true,  isPopular: false, isSpecial: false, isOutOfStock: false, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80', description: 'Comforting yellow dal with steamed basmati rice.' },
  { id: 'f10', name: 'Egg Fried Rice',     category: 'Lunch',     price: 80,  rating: 4.4, prepTime: 12, isVeg: false, isPopular: false, isSpecial: false, isOutOfStock: false, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80', description: 'Wok-tossed rice with scrambled eggs and veggies.' },
  { id: 'f11', name: 'Rajma Chawal',       category: 'Lunch',     price: 75,  rating: 4.5, prepTime: 12, isVeg: true,  isPopular: false, isSpecial: false, isOutOfStock: false, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80', description: 'Classic kidney bean curry with steamed rice.' },

  // Snacks
  { id: 'f12', name: 'Samosa (2 pcs)',     category: 'Snacks',    price: 25,  rating: 4.5, prepTime: 5,  isVeg: true,  isPopular: true,  isSpecial: false, isOutOfStock: false, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80', description: 'Crispy pastry stuffed with spiced potatoes and peas.' },
  { id: 'f13', name: 'Paneer Burger',      category: 'Snacks',    price: 85,  rating: 4.7, prepTime: 10, isVeg: true,  isPopular: true,  isSpecial: true,  isOutOfStock: false, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80', description: "Today's Special! Grilled paneer patty with fresh veggies." },
  { id: 'f14', name: 'Chicken Sandwich',   category: 'Snacks',    price: 90,  rating: 4.4, prepTime: 8,  isVeg: false, isPopular: false, isSpecial: false, isOutOfStock: false, image: 'https://images.unsplash.com/photo-1481070414801-51fd732d7184?w=400&q=80', description: 'Toasted sandwich with grilled chicken and fresh greens.' },
  { id: 'f15', name: 'Vada Pav',          category: 'Snacks',    price: 30,  rating: 4.6, prepTime: 5,  isVeg: true,  isPopular: true,  isSpecial: false, isOutOfStock: false, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80', description: 'Mumbai-style spiced potato fritter in a soft bun.' },
  { id: 'f16', name: 'French Fries',      category: 'Snacks',    price: 60,  rating: 4.3, prepTime: 8,  isVeg: true,  isPopular: false, isSpecial: false, isOutOfStock: false, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80', description: 'Golden crispy fries with dipping sauce.' },
  { id: 'f17', name: 'Spring Rolls (3 pcs)', category: 'Snacks', price: 70,  rating: 4.2, prepTime: 10, isVeg: true,  isPopular: false, isSpecial: false, isOutOfStock: false, image: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400&q=80', description: 'Crispy vegetable spring rolls with sweet chili sauce.' },

  // Beverages
  { id: 'f18', name: 'Masala Chai',        category: 'Beverages', price: 20,  rating: 4.8, prepTime: 4,  isVeg: true,  isPopular: true,  isSpecial: false, isOutOfStock: false, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80', description: 'Aromatic spiced tea brewed with milk.' },
  { id: 'f19', name: 'Cold Coffee',        category: 'Beverages', price: 55,  rating: 4.6, prepTime: 5,  isVeg: true,  isPopular: true,  isSpecial: false, isOutOfStock: false, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80', description: 'Chilled blended coffee with vanilla ice cream.' },
  { id: 'f20', name: 'Mango Lassi',        category: 'Beverages', price: 50,  rating: 4.7, prepTime: 4,  isVeg: true,  isPopular: false, isSpecial: true,  isOutOfStock: false, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80', description: 'Thick yogurt-based mango smoothie.' },
  { id: 'f21', name: 'Fresh Lime Soda',    category: 'Beverages', price: 35,  rating: 4.4, prepTime: 3,  isVeg: true,  isPopular: false, isSpecial: false, isOutOfStock: false, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80', description: 'Refreshing lime soda with a hint of mint.' },
  { id: 'f22', name: 'Watermelon Juice',   category: 'Beverages', price: 45,  rating: 4.3, prepTime: 4,  isVeg: true,  isPopular: false, isSpecial: false, isOutOfStock: false, image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80', description: 'Chilled fresh watermelon juice.' },

  // Combos
  { id: 'f23', name: 'Burger + Fries + Cold Coffee', category: 'Combos', price: 180, rating: 4.8, prepTime: 15, isVeg: true,  isPopular: true,  isSpecial: true,  isOutOfStock: false, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80', description: 'Perfect trio – paneer burger, fries & cold coffee. Save ₹20!' },
  { id: 'f24', name: 'Thali + Lassi',      category: 'Combos',    price: 125, rating: 4.6, prepTime: 18, isVeg: true,  isPopular: true,  isSpecial: false, isOutOfStock: false, image: 'https://images.unsplash.com/photo-1626132647523-66e5bf30888d?w=400&q=80', description: 'Complete lunch thali with refreshing mango lassi.' },
  { id: 'f25', name: 'Snack Box',          category: 'Combos',    price: 95,  rating: 4.5, prepTime: 12, isVeg: true,  isPopular: false, isSpecial: false, isOutOfStock: false, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80', description: 'Samosa (2), Vada Pav, Spring Roll (1) & Masala Chai.' },
  { id: 'f26', name: 'Chicken Biryani + Raita', category: 'Combos', price: 155, rating: 4.9, prepTime: 22, isVeg: false, isPopular: true,  isSpecial: true,  isOutOfStock: false, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80', description: 'Aromatic biryani with cooling raita. Save ₹15!' },

  // Desserts
  { id: 'f27', name: 'Gulab Jamun (2 pcs)',category: 'Desserts',  price: 40,  rating: 4.7, prepTime: 3,  isVeg: true,  isPopular: true,  isSpecial: false, isOutOfStock: false, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80', description: 'Soft milk solids dumplings in rose-flavored syrup.' },
  { id: 'f28', name: 'Kheer',             category: 'Desserts',  price: 35,  rating: 4.5, prepTime: 5,  isVeg: true,  isPopular: false, isSpecial: false, isOutOfStock: false, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80', description: 'Creamy rice pudding garnished with dry fruits.' },
  { id: 'f29', name: 'Chocolate Brownie', category: 'Desserts',  price: 55,  rating: 4.8, prepTime: 4,  isVeg: true,  isPopular: true,  isSpecial: false, isOutOfStock: false, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80', description: 'Fudgy warm chocolate brownie with vanilla ice cream.' },
  { id: 'f30', name: 'Ice Cream Sundae',  category: 'Desserts',  price: 70,  rating: 4.6, prepTime: 5,  isVeg: true,  isPopular: false, isSpecial: false, isOutOfStock: false, image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&q=80', description: 'Two scoops of ice cream with chocolate sauce and nuts.' },
];

export const CATEGORIES = ['All', 'Breakfast', 'Lunch', 'Snacks', 'Beverages', 'Combos', 'Desserts'];

export const REVIEWS = [
  { id: 'r1', name: 'Arjun Sharma',    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun',    rating: 5, text: 'Amazing food quality and the token system is genius! No more standing in queues. The paneer burger is a must-try.',   date: '2 days ago',   college: 'CSE - 3rd Year' },
  { id: 'r2', name: 'Priya Patel',     avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',    rating: 5, text: 'The QR code pickup is so convenient. I ordered from my hostel and picked up right on time. Love the app!',           date: '5 days ago',   college: 'ECE - 2nd Year' },
  { id: 'r3', name: 'Rahul Singh',     avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahul',    rating: 4, text: 'Chicken Biryani is absolutely fantastic. Real-time order tracking is a great feature. Saves so much time!',         date: '1 week ago',   college: 'MBA - 1st Year' },
  { id: 'r4', name: 'Ananya Verma',    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ananya',   rating: 5, text: 'Table booking feature is brilliant. Booked a table for group study lunch and the slot system worked perfectly.',   date: '1 week ago',   college: 'IT - 4th Year' },
  { id: 'r5', name: 'Kiran Mehta',     avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kiran',    rating: 4, text: 'Best canteen app ever! The combo meals are great value and the dark mode looks super cool.',                        date: '2 weeks ago',  college: 'Mechanical - 3rd Year' },
  { id: 'r6', name: 'Sneha Joshi',     avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sneha',    rating: 5, text: 'The live waiting time display is so helpful. I know exactly when my food will be ready. 10/10 experience!',       date: '2 weeks ago',  college: 'Civil - 2nd Year' },
];

export const FAQS = [
  { q: 'How does the token system work?',                    a: 'After placing your order and completing payment, you receive a unique token number and QR code. Show this at the counter when your token is called.' },
  { q: 'Can I cancel my order?',                            a: 'Orders can be cancelled only before preparation begins. Once cooking starts, cancellation is not possible. You can cancel from the Order Tracking page.' },
  { q: 'What payment methods are accepted?',                a: 'We accept Cash, UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, and Net Banking.' },
  { q: 'How does table booking work?',                      a: 'You can book a 45-minute dining slot from 9 AM to 9 PM. Select your preferred time slot from the grid and confirm the booking with your name.' },
  { q: 'What are the cafe timings?',                        a: 'Quick Bite Cafe is open from 9:00 AM to 9:00 PM, Monday to Saturday. We are closed on Sundays.' },
  { q: 'How accurate is the live wait time?',               a: 'Our smart algorithm calculates real-time wait based on active orders and kitchen capacity. It is accurate to within ±2 minutes.' },
  { q: 'Can I pre-order food for a specific time?',         a: 'Currently, orders are placed in real-time. We are working on a pre-order scheduling feature coming soon!' },
  { q: 'What happens if my ordered item is unavailable?',   a: 'The admin will notify you and you can choose a replacement or get a full refund to your original payment method.' },
];

// Generate time slots from 9 AM to 9 PM, each 45 minutes
export const generateTimeSlots = (date = new Date()) => {
  const slots = [];
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  let hour = 9, min = 0;
  while (hour < 21 || (hour === 21 && min === 0)) {
    const start = `${String(hour).padStart(2,'0')}:${String(min).padStart(2,'0')}`;
    let endH = hour, endM = min + 45;
    if (endM >= 60) { endH++; endM -= 60; }
    const end = `${String(endH).padStart(2,'0')}:${String(endM).padStart(2,'0')}`;
    const slotTime = new Date(date);
    slotTime.setHours(hour, min, 0, 0);
    const isExpired  = isToday && slotTime < now;
    const isBooked   = Math.random() < 0.3 && !isExpired;
    slots.push({ id: `slot-${start}`, start, end, isBooked, isExpired });
    min += 45;
    if (min >= 60) { hour++; min -= 60; }
    if (endH > 21) break;
  }
  return slots;
};

export const ADMIN_STATS = {
  todayRevenue:    8240,
  todayOrders:     87,
  pendingOrders:   12,
  completedOrders: 68,
  cancelledOrders: 7,
  avgWaitTime:     8,
  popularFood:     'Chicken Biryani',
  totalCustomers:  342,
};

export const DAILY_SALES = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  revenue: [5200, 6800, 7400, 5900, 8240, 9100],
  orders:  [54, 72, 78, 61, 87, 95],
};

export const WEEKLY_SALES = {
  labels:  ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  revenue: [32000, 41000, 38500, 47800],
  orders:  [340, 430, 410, 495],
};

export const MONTHLY_SALES = {
  labels:  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  revenue: [120000, 135000, 128000, 142000, 158000, 165000, 172000],
  orders:  [1200, 1350, 1280, 1420, 1580, 1650, 1720],
};

export const POPULAR_FOODS_DATA = {
  labels:  ['Chicken Biryani', 'Paneer Burger', 'Veg Thali', 'Masala Chai', 'Combo Box', 'Cold Coffee'],
  values:  [245, 198, 176, 312, 134, 167],
};

export const PEAK_HOURS_DATA = {
  labels: ['8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM'],
  values: [12, 45, 38, 67, 132, 148, 120, 85, 72, 95, 78, 52, 31],
};

export const CUSTOMER_GROWTH = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  values: [180, 210, 245, 278, 305, 330, 342],
};

export const MOCK_ORDERS = [
  { id: 'QB-2024-001', customer: 'Arjun Sharma',  items: [{ name: 'Paneer Burger', qty: 1, price: 85 }, { name: 'Cold Coffee', qty: 1, price: 55 }], total: 140, status: 'Completed',  orderType: 'Dine In',  token: 'T-001', time: '09:15 AM', paymentMethod: 'UPI' },
  { id: 'QB-2024-002', customer: 'Priya Patel',   items: [{ name: 'Veg Thali', qty: 2, price: 90 }],                                                  total: 180, status: 'Preparing',  orderType: 'Take Away', token: 'T-002', time: '09:22 AM', paymentMethod: 'Cash' },
  { id: 'QB-2024-003', customer: 'Rahul Singh',   items: [{ name: 'Chicken Biryani', qty: 1, price: 130 }, { name: 'Mango Lassi', qty: 1, price: 50 }], total: 180, status: 'Received',   orderType: 'Parcel',    token: 'T-003', time: '09:35 AM', paymentMethod: 'Card' },
  { id: 'QB-2024-004', customer: 'Ananya Verma',  items: [{ name: 'Masala Dosa', qty: 2, price: 60 }, { name: 'Masala Chai', qty: 2, price: 20 }],    total: 160, status: 'Ready',      orderType: 'Dine In',  token: 'T-004', time: '09:40 AM', paymentMethod: 'UPI' },
  { id: 'QB-2024-005', customer: 'Kiran Mehta',   items: [{ name: 'Samosa', qty: 4, price: 25 }, { name: 'Cold Coffee', qty: 1, price: 55 }],           total: 155, status: 'Cancelled',  orderType: 'Take Away', token: 'T-005', time: '09:50 AM', paymentMethod: 'Cash' },
  { id: 'QB-2024-006', customer: 'Sneha Joshi',   items: [{ name: 'Burger + Fries + Cold Coffee', qty: 1, price: 180 }],                               total: 180, status: 'Cooking',    orderType: 'Take Away', token: 'T-006', time: '10:00 AM', paymentMethod: 'UPI' },
];

export const MOCK_CUSTOMERS = [
  { id: 'c1', name: 'Arjun Sharma',  email: 'arjun@college.edu',  phone: '9876543210', orders: 12, totalSpent: 1840, isBlocked: false, joinDate: '2024-01-15', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun' },
  { id: 'c2', name: 'Priya Patel',   email: 'priya@college.edu',  phone: '9876543211', orders: 18, totalSpent: 2650, isBlocked: false, joinDate: '2024-01-20', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya' },
  { id: 'c3', name: 'Rahul Singh',   email: 'rahul@college.edu',  phone: '9876543212', orders: 8,  totalSpent: 980,  isBlocked: false, joinDate: '2024-02-01', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahul' },
  { id: 'c4', name: 'Ananya Verma',  email: 'ananya@college.edu', phone: '9876543213', orders: 25, totalSpent: 3450, isBlocked: false, joinDate: '2024-01-10', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ananya' },
  { id: 'c5', name: 'Kiran Mehta',   email: 'kiran@college.edu',  phone: '9876543214', orders: 5,  totalSpent: 620,  isBlocked: true,  joinDate: '2024-02-15', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kiran' },
];

export const ANNOUNCEMENT_ITEMS = [
  '🍔 Cafe is Open',
  '🎉 Today\'s Special: Paneer Burger',
  '🔥 Flat 10% off on Combo Meals',
  '⏳ Average Waiting Time: 8 Minutes',
  '🌟 New Item: Chocolate Brownie',
  '📱 Order Online & Skip the Queue!',
  '🎓 Student Special: Extra Chutney Free with Dosa',
  '⚡ Quick Pickup in Under 10 Minutes',
];

export const CAFE_HOURS = { open: 9, close: 21 }; // 9 AM to 9 PM

export const isCafeOpen = () => {
  const now = new Date();
  const h = now.getHours();
  return h >= CAFE_HOURS.open && h < CAFE_HOURS.close;
};
