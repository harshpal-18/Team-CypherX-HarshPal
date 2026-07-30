// ─── Mock Data Store for QuickBite ───────────────────────────────────────────

export type Category = 'All' | 'Burgers' | 'Pizza' | 'Beverages' | 'Chinese' | 'Snacks' | 'Desserts';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  emoji: string;
  available: boolean;
  prepTime: number; // minutes
  rating: number;
  orderCount: number;
  stock: number;
  isVeg: boolean;
  description: string;
  calories: number;
  tag?: 'Popular' | 'New' | 'Offer' | 'Low Stock';
}

export interface Order {
  id: string;
  tokenId: string;
  studentName: string;
  studentId: string;
  items: { item: MenuItem; qty: number }[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'collected' | 'cancelled';
  slot: string;
  placedAt: string;
  estimatedTime: number;
  counter: number;
}

export interface Slot {
  id: string;
  time: string;
  capacity: number;
  booked: number;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1', name: 'Classic Burger', price: 80, category: 'Burgers',
    image: '/food/burger.jpg', emoji: '🍔', available: true, prepTime: 8,
    rating: 4.5, orderCount: 148, stock: 25, isVeg: false,
    description: 'Juicy beef patty with fresh lettuce, tomato, and our secret sauce',
    calories: 520, tag: 'Popular',
  },
  {
    id: 'm2', name: 'Veg Burger', price: 65, category: 'Burgers',
    image: '/food/vegburger.jpg', emoji: '🥦', available: true, prepTime: 6,
    rating: 4.2, orderCount: 89, stock: 30, isVeg: true,
    description: 'Crispy veg patty with fresh vegetables and mint chutney',
    calories: 380,
  },
  {
    id: 'm3', name: 'Margherita Pizza', price: 120, category: 'Pizza',
    image: '/food/pizza.jpg', emoji: '🍕', available: true, prepTime: 15,
    rating: 4.7, orderCount: 104, stock: 15, isVeg: true,
    description: 'Classic Italian pizza with mozzarella and fresh basil',
    calories: 680, tag: 'Popular',
  },
  {
    id: 'm4', name: 'Pepperoni Pizza', price: 150, category: 'Pizza',
    image: '/food/pepperoni.jpg', emoji: '🍕', available: true, prepTime: 15,
    rating: 4.6, orderCount: 76, stock: 10, isVeg: false,
    description: 'Loaded with premium pepperoni and extra cheese',
    calories: 820, tag: 'Low Stock',
  },
  {
    id: 'm5', name: 'Cold Coffee', price: 60, category: 'Beverages',
    image: '/food/coldcoffee.jpg', emoji: '☕', available: true, prepTime: 3,
    rating: 4.3, orderCount: 210, stock: 50, isVeg: true,
    description: 'Chilled blended coffee with milk and ice cream',
    calories: 280, tag: 'Popular',
  },
  {
    id: 'm6', name: 'Mango Shake', price: 70, category: 'Beverages',
    image: '/food/mango.jpg', emoji: '🥭', available: true, prepTime: 4,
    rating: 4.4, orderCount: 95, stock: 35, isVeg: true,
    description: 'Fresh Alphonso mango blended into a creamy shake',
    calories: 320,
  },
  {
    id: 'm7', name: 'Veg Noodles', price: 90, category: 'Chinese',
    image: '/food/noodles.jpg', emoji: '🍜', available: true, prepTime: 12,
    rating: 4.1, orderCount: 88, stock: 20, isVeg: true,
    description: 'Stir-fried noodles with fresh vegetables and soy sauce',
    calories: 450,
  },
  {
    id: 'm8', name: 'Chicken Noodles', price: 110, category: 'Chinese',
    image: '/food/chickennoodles.jpg', emoji: '🍝', available: true, prepTime: 14,
    rating: 4.3, orderCount: 65, stock: 18, isVeg: false,
    description: 'Wok-tossed noodles with tender chicken strips',
    calories: 580, tag: 'New',
  },
  {
    id: 'm9', name: 'Samosa (2 pcs)', price: 25, category: 'Snacks',
    image: '/food/samosa.jpg', emoji: '🥟', available: true, prepTime: 2,
    rating: 4.0, orderCount: 320, stock: 60, isVeg: true,
    description: 'Crispy fried pastry filled with spiced potatoes and peas',
    calories: 180,
  },
  {
    id: 'm10', name: 'French Fries', price: 55, category: 'Snacks',
    image: '/food/fries.jpg', emoji: '🍟', available: true, prepTime: 5,
    rating: 4.4, orderCount: 180, stock: 40, isVeg: true,
    description: 'Golden crispy fries with your choice of dipping sauce',
    calories: 360, tag: 'Popular',
  },
  {
    id: 'm11', name: 'Chocolate Brownie', price: 45, category: 'Desserts',
    image: '/food/brownie.jpg', emoji: '🍫', available: true, prepTime: 1,
    rating: 4.6, orderCount: 130, stock: 22, isVeg: true,
    description: 'Warm fudgy brownie served with vanilla ice cream',
    calories: 420, tag: 'New',
  },
  {
    id: 'm12', name: 'Paneer Tikka', price: 130, category: 'Snacks',
    image: '/food/paneertikka.jpg', emoji: '🧆', available: false, prepTime: 10,
    rating: 4.5, orderCount: 72, stock: 0, isVeg: true,
    description: 'Grilled cottage cheese marinated in tandoori spices',
    calories: 480,
  },
];

export const SLOTS: Slot[] = [
  { id: 's1', time: '12:30 PM', capacity: 30, booked: 30 },
  { id: 's2', time: '12:45 PM', capacity: 30, booked: 22 },
  { id: 's3', time: '01:00 PM', capacity: 30, booked: 15 },
  { id: 's4', time: '01:15 PM', capacity: 30, booked: 8 },
  { id: 's5', time: '01:30 PM', capacity: 30, booked: 3 },
  { id: 's6', time: '01:45 PM', capacity: 30, booked: 0 },
  { id: 's7', time: '02:00 PM', capacity: 30, booked: 0 },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-121', tokenId: 'A-121', studentName: 'Harsh Pal', studentId: 'STU001',
    items: [{ item: MENU_ITEMS[2], qty: 1 }, { item: MENU_ITEMS[4], qty: 2 }],
    total: 240, status: 'preparing', slot: '12:45 PM',
    placedAt: '2026-07-30T07:10:00Z', estimatedTime: 12, counter: 1,
  },
  {
    id: 'ORD-118', tokenId: 'A-118', studentName: 'Priya Sharma', studentId: 'STU002',
    items: [{ item: MENU_ITEMS[0], qty: 2 }],
    total: 160, status: 'ready', slot: '12:30 PM',
    placedAt: '2026-07-30T07:00:00Z', estimatedTime: 0, counter: 2,
  },
  {
    id: 'ORD-125', tokenId: 'A-125', studentName: 'Rahul Verma', studentId: 'STU003',
    items: [{ item: MENU_ITEMS[8], qty: 2 }, { item: MENU_ITEMS[5], qty: 1 }],
    total: 120, status: 'pending', slot: '01:00 PM',
    placedAt: '2026-07-30T07:20:00Z', estimatedTime: 18, counter: 1,
  },
];

export const CATEGORIES: Category[] = ['All', 'Burgers', 'Pizza', 'Beverages', 'Chinese', 'Snacks', 'Desserts'];

export const CATEGORY_EMOJIS: Record<Category, string> = {
  All: '🍽️', Burgers: '🍔', Pizza: '🍕', Beverages: '☕',
  Chinese: '🍜', Snacks: '🥟', Desserts: '🍫',
};

// AI Wait-Time Estimation
export function estimateWaitTime(pendingOrders: number, avgPrepTime = 10, chefs = 3): number {
  const hour = new Date().getHours();
  const isPeak = hour >= 12 && hour <= 14;
  const workloadMultiplier = isPeak ? 1.4 : 1.0;
  return Math.round((pendingOrders * avgPrepTime) / chefs * workloadMultiplier / pendingOrders || avgPrepTime);
}

// Token generator
export function generateToken(): string {
  const letters = ['A', 'B', 'C'];
  const letter = letters[Math.floor(Math.random() * letters.length)];
  const num = Math.floor(Math.random() * 50) + 100;
  return `${letter}-${num}`;
}

// Vendor analytics
export const ANALYTICS_DATA = {
  dailyOrders: [
    { day: 'Mon', orders: 145, revenue: 12400 },
    { day: 'Tue', orders: 162, revenue: 14200 },
    { day: 'Wed', orders: 178, revenue: 15800 },
    { day: 'Thu', orders: 155, revenue: 13600 },
    { day: 'Fri', orders: 210, revenue: 18750 },
    { day: 'Sat', orders: 95, revenue: 8200 },
    { day: 'Sun', orders: 68, revenue: 5900 },
  ],
  popularItems: [
    { name: 'Burger', orders: 148, color: '#8B5CF6' },
    { name: 'Pizza', orders: 104, color: '#3B82F6' },
    { name: 'Noodles', orders: 88, color: '#10B981' },
    { name: 'Fries', orders: 180, color: '#F59E0B' },
    { name: 'Coffee', orders: 210, color: '#EF4444' },
  ],
  waitTimeByHour: [
    { hour: '10 AM', wait: 4 },
    { hour: '11 AM', wait: 6 },
    { hour: '12 PM', wait: 18 },
    { hour: '1 PM', wait: 22 },
    { hour: '2 PM', wait: 14 },
    { hour: '3 PM', wait: 8 },
    { hour: '4 PM', wait: 5 },
  ],
  peakHourForecast: [
    { time: '12:00', load: 60 },
    { time: '12:15', load: 75 },
    { time: '12:30', load: 95 },
    { time: '12:45', load: 100 },
    { time: '01:00', load: 88 },
    { time: '01:15', load: 72 },
    { time: '01:30', load: 55 },
    { time: '01:45', load: 38 },
    { time: '02:00', load: 22 },
  ],
};
