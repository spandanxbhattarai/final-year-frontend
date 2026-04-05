import { Routes, Route, Navigate } from 'react-router-dom';
import { PageShell } from '@/components/layout/PageShell';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
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
        <Route path="/test" element={<RestaurantTestPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/kitchen" element={<PageShell />}>
        <Route index element={<KitchenPage />} />
      </Route>
      <Route
        element={
          <ProtectedRoute>
            <PageShell />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tables" element={<TablesPage />} />
        <Route path="/reservations" element={<ReservationsPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/call-logs" element={<CallLogsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
