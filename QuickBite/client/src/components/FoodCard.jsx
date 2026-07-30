import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Plus, CheckCircle, Leaf, Drumstick } from 'lucide-react';
import useCartStore from '../store/cartStore';
import useUiStore from '../store/uiStore';

const FoodCard = ({ food, delay = 0 }) => {
  const { addItem, items } = useCartStore();
  const { addToast } = useUiStore();

  const inCart = items.find(i => i.id === food.id);
  const qty = inCart?.qty || 0;

  const handleAdd = () => {
    addItem(food);
    addToast(`${food.name} added to cart!`, 'cart');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`card-hover relative overflow-hidden group cursor-pointer ${food.isOutOfStock ? 'opacity-60' : ''}`}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {food.isSpecial && (
          <span className="px-2.5 py-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs font-bold rounded-full shadow-sm animate-pulse-slow">
            ⭐ Today's Special
          </span>
        )}
        {food.isPopular && !food.isSpecial && (
          <span className="px-2.5 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full shadow-sm">
            🔥 Popular
          </span>
        )}
        {food.isOutOfStock && (
          <span className="px-2.5 py-1 bg-gray-700 text-white text-xs font-bold rounded-full">
            Sold Out
          </span>
        )}
      </div>

      {/* Image */}
      <div className="relative h-44 overflow-hidden rounded-t-3xl">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Veg/Non-Veg indicator top right */}
        <div className="absolute top-3 right-3">
          <div className={`w-6 h-6 border-2 rounded-sm flex items-center justify-center ${food.isVeg ? 'border-green-600 bg-white' : 'border-red-600 bg-white'}`}>
            <div className={`w-3 h-3 rounded-full ${food.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-display font-semibold text-gray-900 dark:text-white text-base leading-tight line-clamp-1">{food.name}</h3>
          <span className={food.isVeg ? 'badge-veg' : 'badge-nonveg'}>
            {food.isVeg ? <Leaf className="w-3 h-3" /> : <Drumstick className="w-3 h-3" />}
            {food.isVeg ? 'Veg' : 'Non-Veg'}
          </span>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{food.description}</p>

        <div className="flex items-center gap-3 mb-3 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            <span className="font-medium text-gray-700 dark:text-gray-300">{food.rating}</span>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-primary-400" />
            {food.prepTime} min
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold gradient-text">₹{food.price}</span>
          </div>
          {food.isOutOfStock ? (
            <span className="text-xs text-gray-400 font-medium">Unavailable</span>
          ) : qty > 0 ? (
            <div className="flex items-center gap-2 bg-primary-50 dark:bg-primary-950/50 rounded-2xl px-1 py-0.5">
              <button onClick={() => useCartStore.getState().updateQty(food.id, qty - 1)} className="w-7 h-7 flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 shadow-sm text-primary-600 font-bold hover:bg-primary-100 transition-colors">−</button>
              <span className="w-5 text-center text-sm font-bold text-primary-600">{qty}</span>
              <button onClick={handleAdd} className="w-7 h-7 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-sm hover:shadow-card transition-all">+</button>
            </div>
          ) : (
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleAdd}
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold rounded-2xl shadow-card hover:shadow-card-lg transition-all duration-200"
            >
              <Plus className="w-4 h-4" /> Add
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;
