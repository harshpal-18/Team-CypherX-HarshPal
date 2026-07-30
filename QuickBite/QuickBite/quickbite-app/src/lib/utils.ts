import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function formatTime(minutes: number): string {
  if (minutes < 1) return 'Ready now';
  if (minutes === 1) return '1 min';
  return `${minutes} mins`;
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'pending': return 'text-yellow-400 bg-yellow-400/10';
    case 'preparing': return 'text-blue-400 bg-blue-400/10';
    case 'ready': return 'text-green-400 bg-green-400/10';
    case 'collected': return 'text-gray-400 bg-gray-400/10';
    case 'cancelled': return 'text-red-400 bg-red-400/10';
    default: return 'text-gray-400 bg-gray-400/10';
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case 'pending': return 'Received';
    case 'preparing': return 'Preparing';
    case 'ready': return 'Ready!';
    case 'collected': return 'Collected';
    case 'cancelled': return 'Cancelled';
    default: return status;
  }
}
