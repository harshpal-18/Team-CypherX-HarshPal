/**
 * Seed script — populates MongoDB with menu items and demo accounts
 * Run: npm run seed
 */
require('dotenv').config();
const mongoose = require('mongoose');
const User     = require('../models/User');
const MenuItem = require('../models/MenuItem');

const MENU_ITEMS = [
  // Breakfast
  { name: 'Masala Dosa',        category: 'Breakfast', price: 60,  rating: 4.6, prepTime: 10, isVeg: true,  isPopular: true,  isSpecial: false, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80', description: 'Crispy dosa with spicy potato filling and chutneys.' },
  { name: 'Poha',               category: 'Breakfast', price: 35,  rating: 4.3, prepTime: 8,  isVeg: true,  isPopular: false, isSpecial: false, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80', description: 'Light flattened rice with peas, peanuts and spices.' },
  { name: 'Upma',               category: 'Breakfast', price: 30,  rating: 4.1, prepTime: 7,  isVeg: true,  isPopular: false, isSpecial: false, image: 'https://images.unsplash.com/photo-1630409346824-4f1a6a72d23e?w=400&q=80', description: 'Semolina porridge with vegetables and tempering.' },
  { name: 'Bread Omelette',     category: 'Breakfast', price: 45,  rating: 4.4, prepTime: 5,  isVeg: false, isPopular: true,  isSpecial: false, image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&q=80', description: 'Fluffy omelette with buttered toast.' },
  { name: 'Idli Sambar',        category: 'Breakfast', price: 40,  rating: 4.5, prepTime: 8,  isVeg: true,  isPopular: true,  isSpecial: false, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80', description: 'Soft steamed rice cakes with lentil soup.' },
  // Lunch
  { name: 'Veg Thali',          category: 'Lunch',     price: 90,  rating: 4.7, prepTime: 15, isVeg: true,  isPopular: true,  isSpecial: true,  image: 'https://images.unsplash.com/photo-1626132647523-66e5bf30888d?w=400&q=80', description: 'Complete meal – dal, sabzi, roti, rice, salad & dessert.' },
  { name: 'Chicken Biryani',    category: 'Lunch',     price: 130, rating: 4.8, prepTime: 20, isVeg: false, isPopular: true,  isSpecial: true,  image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80', description: 'Aromatic basmati rice with tender spiced chicken.' },
  { name: 'Paneer Butter Masala', category: 'Lunch',   price: 110, rating: 4.6, prepTime: 15, isVeg: true,  isPopular: true,  isSpecial: false, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80', description: 'Creamy tomato-based gravy with soft paneer cubes.' },
  { name: 'Dal Rice',           category: 'Lunch',     price: 70,  rating: 4.2, prepTime: 10, isVeg: true,  isPopular: false, isSpecial: false, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80', description: 'Comforting yellow dal with steamed basmati rice.' },
  { name: 'Egg Fried Rice',     category: 'Lunch',     price: 80,  rating: 4.4, prepTime: 12, isVeg: false, isPopular: false, isSpecial: false, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80', description: 'Wok-tossed rice with scrambled eggs and veggies.' },
  { name: 'Rajma Chawal',       category: 'Lunch',     price: 75,  rating: 4.5, prepTime: 12, isVeg: true,  isPopular: false, isSpecial: false, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80', description: 'Classic kidney bean curry with steamed rice.' },
  // Snacks
  { name: 'Samosa (2 pcs)',     category: 'Snacks',    price: 25,  rating: 4.5, prepTime: 5,  isVeg: true,  isPopular: true,  isSpecial: false, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80', description: 'Crispy pastry stuffed with spiced potatoes and peas.' },
  { name: 'Paneer Burger',      category: 'Snacks',    price: 85,  rating: 4.7, prepTime: 10, isVeg: true,  isPopular: true,  isSpecial: true,  image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80', description: "Today's Special! Grilled paneer patty with fresh veggies." },
  { name: 'Chicken Sandwich',   category: 'Snacks',    price: 90,  rating: 4.4, prepTime: 8,  isVeg: false, isPopular: false, isSpecial: false, image: 'https://images.unsplash.com/photo-1481070414801-51fd732d7184?w=400&q=80', description: 'Toasted sandwich with grilled chicken and fresh greens.' },
  { name: 'Vada Pav',           category: 'Snacks',    price: 30,  rating: 4.6, prepTime: 5,  isVeg: true,  isPopular: true,  isSpecial: false, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80', description: 'Mumbai-style spiced potato fritter in a soft bun.' },
  { name: 'French Fries',       category: 'Snacks',    price: 60,  rating: 4.3, prepTime: 8,  isVeg: true,  isPopular: false, isSpecial: false, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80', description: 'Golden crispy fries with dipping sauce.' },
  { name: 'Spring Rolls (3 pcs)', category: 'Snacks',  price: 70,  rating: 4.2, prepTime: 10, isVeg: true,  isPopular: false, isSpecial: false, image: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400&q=80', description: 'Crispy vegetable spring rolls with sweet chili sauce.' },
  // Beverages
  { name: 'Masala Chai',        category: 'Beverages', price: 20,  rating: 4.8, prepTime: 4,  isVeg: true,  isPopular: true,  isSpecial: false, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80', description: 'Aromatic spiced tea brewed with milk.' },
  { name: 'Cold Coffee',        category: 'Beverages', price: 55,  rating: 4.6, prepTime: 5,  isVeg: true,  isPopular: true,  isSpecial: false, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80', description: 'Chilled blended coffee with vanilla ice cream.' },
  { name: 'Mango Lassi',        category: 'Beverages', price: 50,  rating: 4.7, prepTime: 4,  isVeg: true,  isPopular: false, isSpecial: true,  image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80', description: 'Thick yogurt-based mango smoothie.' },
  { name: 'Fresh Lime Soda',    category: 'Beverages', price: 35,  rating: 4.4, prepTime: 3,  isVeg: true,  isPopular: false, isSpecial: false, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80', description: 'Refreshing lime soda with a hint of mint.' },
  { name: 'Watermelon Juice',   category: 'Beverages', price: 45,  rating: 4.3, prepTime: 4,  isVeg: true,  isPopular: false, isSpecial: false, image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80', description: 'Chilled fresh watermelon juice.' },
  // Combos
  { name: 'Burger + Fries + Cold Coffee', category: 'Combos', price: 180, rating: 4.8, prepTime: 15, isVeg: true,  isPopular: true,  isSpecial: true,  image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80', description: 'Perfect trio – paneer burger, fries & cold coffee. Save ₹20!' },
  { name: 'Thali + Lassi',      category: 'Combos',    price: 125, rating: 4.6, prepTime: 18, isVeg: true,  isPopular: true,  isSpecial: false, image: 'https://images.unsplash.com/photo-1626132647523-66e5bf30888d?w=400&q=80', description: 'Complete lunch thali with refreshing mango lassi.' },
  { name: 'Snack Box',          category: 'Combos',    price: 95,  rating: 4.5, prepTime: 12, isVeg: true,  isPopular: false, isSpecial: false, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80', description: 'Samosa (2), Vada Pav, Spring Roll (1) & Masala Chai.' },
  { name: 'Chicken Biryani + Raita', category: 'Combos', price: 155, rating: 4.9, prepTime: 22, isVeg: false, isPopular: true,  isSpecial: true,  image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80', description: 'Aromatic biryani with cooling raita. Save ₹15!' },
  // Desserts
  { name: 'Gulab Jamun (2 pcs)',category: 'Desserts',  price: 40,  rating: 4.7, prepTime: 3,  isVeg: true,  isPopular: true,  isSpecial: false, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80', description: 'Soft milk solids dumplings in rose-flavored syrup.' },
  { name: 'Kheer',              category: 'Desserts',  price: 35,  rating: 4.5, prepTime: 5,  isVeg: true,  isPopular: false, isSpecial: false, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80', description: 'Creamy rice pudding garnished with dry fruits.' },
  { name: 'Chocolate Brownie',  category: 'Desserts',  price: 55,  rating: 4.8, prepTime: 4,  isVeg: true,  isPopular: true,  isSpecial: false, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80', description: 'Fudgy warm chocolate brownie with vanilla ice cream.' },
  { name: 'Ice Cream Sundae',   category: 'Desserts',  price: 70,  rating: 4.6, prepTime: 5,  isVeg: true,  isPopular: false, isSpecial: false, image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&q=80', description: 'Two scoops of ice cream with chocolate sauce and nuts.' },
];

const DEMO_USERS = [
  { name: 'Arjun Sharma', email: 'student@college.edu', phone: '9876543210', password: 'student123', role: 'customer' },
  { name: 'Admin',        email: 'admin@quickbite.cafe', phone: '9876540000', password: 'admin123',   role: 'admin'    },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing
    await MenuItem.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert menu
    const items = await MenuItem.insertMany(MENU_ITEMS);
    console.log(`🍛 Seeded ${items.length} menu items`);

    // Insert users (passwords auto-hashed by model pre-save)
    for (const u of DEMO_USERS) {
      await User.create(u);
      console.log(`👤 Created ${u.role}: ${u.email} / ${u.phone}`);
    }

    console.log('\n✅ Seed complete!\n');
    console.log('Demo accounts:');
    console.log('  Customer → email: student@college.edu  | phone: 9876543210  | pass: student123');
    console.log('  Admin    → email: admin@quickbite.cafe | phone: 9876540000  | pass: admin123\n');
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
  } finally {
    mongoose.disconnect();
  }
}

seed();
