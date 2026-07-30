'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { MENU_ITEMS } from '@/lib/data';
import { MessageSquare, Send, Sparkles, Zap, Clock, RefreshCw } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  time: string;
}

const QUICK_PROMPTS = [
  "What's the fastest item?",
  "What is my queue position?",
  "When will my food be ready?",
  "What's available right now?",
  "Show today's popular items",
  "Is the canteen crowded?",
];

function getAIResponse(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes('fast') || lower.includes('quick')) {
    const fast = [...MENU_ITEMS].sort((a, b) => a.prepTime - b.prepTime).slice(0, 3);
    return `⚡ Fastest items right now:\n\n${fast.map(i => `${i.emoji} **${i.name}** — ${i.prepTime} min (₹${i.price})`).join('\n')}\n\nSamosa is the absolute fastest at just 2 minutes!`;
  }
  if (lower.includes('queue') || lower.includes('position')) {
    return '🎫 Your current token is **A-124**. There are **6 orders ahead** of you. Based on current prep speed, estimated wait is **~12 minutes**. You\'ll receive a notification when your order is ready!';
  }
  if (lower.includes('ready') || lower.includes('when')) {
    return '⏱️ Your order **A-124** is currently being **Prepared**. Estimated ready time: **12:43 PM** (about 12 minutes from now). I\'ll notify you the moment it\'s ready at Counter 2!';
  }
  if (lower.includes('available') || lower.includes('stock')) {
    const available = MENU_ITEMS.filter(i => i.available).slice(0, 5);
    return `✅ Currently available (${MENU_ITEMS.filter(i => i.available).length} items):\n\n${available.map(i => `${i.emoji} ${i.name} — ₹${i.price}`).join('\n')}\n\n...and ${MENU_ITEMS.filter(i => i.available).length - 5} more. Use the menu page to see all!`;
  }
  if (lower.includes('popular') || lower.includes('best')) {
    return `🔥 Today\'s most ordered items:\n\n1. ☕ Cold Coffee — 210 orders\n2. 🍟 French Fries — 180 orders\n3. 🍔 Classic Burger — 148 orders\n4. 🍕 Margherita Pizza — 104 orders\n\nCold Coffee is today\'s star! 🌟`;
  }
  if (lower.includes('crowd') || lower.includes('busy') || lower.includes('wait')) {
    return '📊 Current canteen status:\n\n• **18 pending orders** in queue\n• **Estimated wait: ~14 minutes**\n• Peak hours are 12:30–1:00 PM\n• Slot 1:15 PM has plenty of space!\n\nPro tip: Order for the **1:00 PM slot** to avoid the rush! 🕐';
  }
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return '👋 Hello! I\'m QuickBite AI, your smart canteen assistant!\n\nI can help you with:\n• 🍽️ Finding available food\n• ⏱️ Wait time estimates\n• 🎫 Queue position\n• 📊 Popular items\n• 💡 Smart ordering tips\n\nWhat can I help you with today?';
  }
  if (lower.includes('slot') || lower.includes('time')) {
    return '📅 Available pickup slots:\n\n• 12:30 PM — ❌ FULL\n• 12:45 PM — 🟡 8 slots left\n• 1:00 PM — 🟢 15 slots left\n• 1:15 PM — 🟢 22 slots left\n• 1:30 PM — 🟢 27 slots left\n\nI recommend the **1:00 PM slot** for a smooth experience!';
  }
  if (lower.includes('veg') || lower.includes('vegetarian')) {
    const veg = MENU_ITEMS.filter(i => i.isVeg && i.available);
    return `🥦 Vegetarian options available (${veg.length} items):\n\n${veg.slice(0, 5).map(i => `${i.emoji} ${i.name} — ₹${i.price}`).join('\n')}\n\nAll items are freshly prepared!`;
  }
  return `🤖 I understand you're asking about "${msg}". Here's what I can tell you:\n\n• Current wait time is **~14 minutes**\n• **18 orders** pending in queue\n• Canteen is moderately busy right now\n\nFor specific queries, try asking about menu items, your queue position, or available slots! 😊`;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0', role: 'ai',
      text: '👋 Hi Harsh! I\'m your QuickBite AI Assistant.\n\nI can help you find food, check wait times, track your order, and more. What would you like to know?',
      time: 'now',
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text, time: 'now' };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 900 + Math.random() * 600));
    const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'ai', text: getAIResponse(text), time: 'now' };
    setMessages(m => [...m, aiMsg]);
    setLoading(false);
  };

  const clearChat = () => {
    setMessages([{
      id: '0', role: 'ai',
      text: '🔄 Chat cleared! How can I help you?',
      time: 'now',
    }]);
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col h-[calc(100vh-10rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 btn-gradient rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-black text-white">QuickBite AI</h1>
            <div className="flex items-center gap-1.5 text-xs text-green-400">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              Online · Instant responses
            </div>
          </div>
        </div>
        <button onClick={clearChat} className="glass rounded-xl p-2.5 text-white/40 hover:text-white transition-colors">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 no-scrollbar">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-3`}
            >
              {msg.role === 'ai' && (
                <div className="w-8 h-8 btn-gradient rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <Zap className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === 'user' ? 'chat-user text-white rounded-tr-sm' : 'chat-ai text-white/80 rounded-tl-sm'
                }`}
              >
                {msg.text.split('**').map((part, i) =>
                  i % 2 === 0 ? part : <strong key={i} className="text-white font-bold">{part}</strong>
                )}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1 text-sm font-bold text-purple-400">
                  H
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading indicator */}
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="w-8 h-8 btn-gradient rounded-xl flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div className="chat-ai rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1.5 items-center h-5">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-purple-400 rounded-full"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick prompts */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-3">
        {QUICK_PROMPTS.map(prompt => (
          <button
            key={prompt}
            onClick={() => sendMessage(prompt)}
            className="flex-shrink-0 glass rounded-xl px-3 py-2 text-xs text-white/60 hover:text-white hover:border-purple-500/30 transition-all"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-3 mt-2">
        <div className="flex-1 relative">
          <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
            placeholder="Ask anything about menu, queue, wait time..."
            className="w-full glass rounded-2xl py-4 pl-11 pr-4 text-white text-sm placeholder-white/20 outline-none focus:border-purple-500/50 transition-all"
          />
        </div>
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || loading}
          className="w-14 btn-gradient rounded-2xl flex items-center justify-center disabled:opacity-40"
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}
