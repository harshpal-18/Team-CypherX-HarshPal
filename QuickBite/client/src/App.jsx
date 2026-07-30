import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Stores
import useUiStore from './store/uiStore';
import useAuthStore from './store/authStore';

// Components
import ToastContainer from './components/ToastContainer';

// Pages - Landing & Auth
import LandingPage   from './pages/LandingPage';
import LoginPage     from './pages/LoginPage';
import SignupPage    from './pages/SignupPage';

// Pages - Customer
import MenuPage          from './pages/customer/MenuPage';
import PaymentPage       from './pages/customer/PaymentPage';
import OrderTrackingPage from './pages/customer/OrderTrackingPage';
import OrdersPage        from './pages/customer/OrdersPage';
import TableBookingPage  from './pages/customer/TableBookingPage';
import NotificationsPage from './pages/customer/NotificationsPage';
import ProfilePage       from './pages/customer/ProfilePage';

// Pages - Admin
import AdminLayout    from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrders    from './pages/admin/AdminOrders';
import AdminMenu      from './pages/admin/AdminMenu';
import AdminTables    from './pages/admin/AdminTables';
import AdminCustomers from './pages/admin/AdminCustomers';

// Route Guards
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, role } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (requiredRole && role !== requiredRole) return <Navigate to="/" replace />;
  return children;
};

const GuestRoute = ({ children }) => {
  const { isAuthenticated, role } = useAuthStore();
  if (isAuthenticated) return <Navigate to={role === 'admin' ? '/admin' : '/customer/menu'} replace />;
  return children;
};

function App() {
  const { initDarkMode } = useUiStore();

  useEffect(() => {
    initDarkMode();
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login"  element={<GuestRoute><LoginPage  /></GuestRoute>} />
        <Route path="/signup" element={<GuestRoute><SignupPage /></GuestRoute>} />

        {/* Customer Routes */}
        <Route path="/customer/menu"          element={<ProtectedRoute requiredRole="customer"><MenuPage          /></ProtectedRoute>} />
        <Route path="/customer/cart"          element={<ProtectedRoute requiredRole="customer"><MenuPage          /></ProtectedRoute>} />
        <Route path="/customer/payment"       element={<ProtectedRoute requiredRole="customer"><PaymentPage       /></ProtectedRoute>} />
        <Route path="/customer/order-tracking"element={<ProtectedRoute requiredRole="customer"><OrderTrackingPage /></ProtectedRoute>} />
        <Route path="/customer/orders"        element={<ProtectedRoute requiredRole="customer"><OrdersPage        /></ProtectedRoute>} />
        <Route path="/customer/table-booking" element={<ProtectedRoute requiredRole="customer"><TableBookingPage  /></ProtectedRoute>} />
        <Route path="/customer/notifications" element={<ProtectedRoute requiredRole="customer"><NotificationsPage /></ProtectedRoute>} />
        <Route path="/customer/profile"       element={<ProtectedRoute requiredRole="customer"><ProfilePage       /></ProtectedRoute>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminLayout /></ProtectedRoute>}>
          <Route index             element={<AdminDashboard />} />
          <Route path="orders"    element={<AdminOrders    />} />
          <Route path="menu"      element={<AdminMenu      />} />
          <Route path="tables"    element={<AdminTables    />} />
          <Route path="customers" element={<AdminCustomers />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
