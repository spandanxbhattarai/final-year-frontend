import { Routes, Route, Navigate } from 'react-router-dom';
import { PageShell } from '@/components/layout/PageShell';
import { ProtectedRoute, AdminRoute } from '@/components/layout/ProtectedRoute';
import { LandingLayout } from '@/components/landing/LandingLayout';
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { TablesPage } from '@/pages/TablesPage';
import { ReservationsPage } from '@/pages/ReservationsPage';
import { MenuPage } from '@/pages/MenuPage';
import { OrdersPage } from '@/pages/OrdersPage';
import { CallLogsPage } from '@/pages/CallLogsPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { KitchenPage } from '@/pages/KitchenPage';
import { LandingHomePage } from '@/pages/landing/LandingHomePage';
import { LandingAboutPage } from '@/pages/landing/LandingAboutPage';
import { LandingContactPage } from '@/pages/landing/LandingContactPage';
import { RestaurantTestPage } from '@/pages/landing/RestaurantTestPage';

const App = () => {
  return (
    <Routes>
      {/* Public landing pages */}
      <Route element={<LandingLayout />}>
        <Route path="/" element={<LandingHomePage />} />
        <Route path="/about" element={<LandingAboutPage />} />
        <Route path="/contact" element={<LandingContactPage />} />
        <Route path="/testing" element={<RestaurantTestPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />

      {/* Protected routes — all logged-in users */}
      <Route
        element={
          <ProtectedRoute>
            <PageShell />
          </ProtectedRoute>
        }
      >
        {/* Staff + Admin: kitchen, menu, reservations */}
        <Route path="/kitchen" element={<KitchenPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/reservations" element={<ReservationsPage />} />

        {/* Admin only */}
        <Route path="/dashboard" element={<AdminRoute><DashboardPage /></AdminRoute>} />
        <Route path="/tables" element={<AdminRoute><TablesPage /></AdminRoute>} />
        <Route path="/orders" element={<AdminRoute><OrdersPage /></AdminRoute>} />
        <Route path="/call-logs" element={<AdminRoute><CallLogsPage /></AdminRoute>} />
        <Route path="/settings" element={<AdminRoute><SettingsPage /></AdminRoute>} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
