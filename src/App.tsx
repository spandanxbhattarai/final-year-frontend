import { Routes, Route, Navigate } from 'react-router-dom';
import { PageShell } from '@/components/layout/PageShell';
import { ProtectedRoute, SuperAdminRoute, AdminOrAboveRoute, StaffOrAboveRoute, AdminOrCookRoute } from '@/components/layout/ProtectedRoute';
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
import { UsersPage } from '@/pages/UsersPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { LandingHomePage } from '@/pages/landing/LandingHomePage';
import { LandingAboutPage } from '@/pages/landing/LandingAboutPage';
import { LandingContactPage } from '@/pages/landing/LandingContactPage';
import { RestaurantTestPage } from '@/pages/landing/RestaurantTestPage';
import { ContactMessagesPage } from '@/pages/ContactMessagesPage';

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
        {/* Admin and Cook only */}
        <Route path="/kitchen" element={<AdminOrCookRoute><KitchenPage /></AdminOrCookRoute>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<StaffOrAboveRoute><SettingsPage /></StaffOrAboveRoute>} />

        {/* Staff and above */}
        <Route path="/menu" element={<StaffOrAboveRoute><MenuPage /></StaffOrAboveRoute>} />
        <Route path="/reservations" element={<StaffOrAboveRoute><ReservationsPage /></StaffOrAboveRoute>} />
        <Route path="/tables" element={<StaffOrAboveRoute><TablesPage /></StaffOrAboveRoute>} />
        <Route path="/orders" element={<StaffOrAboveRoute><OrdersPage /></StaffOrAboveRoute>} />

        {/* Admin and above */}
        <Route path="/dashboard" element={<AdminOrAboveRoute><DashboardPage /></AdminOrAboveRoute>} />
        <Route path="/call-logs" element={<AdminOrAboveRoute><CallLogsPage /></AdminOrAboveRoute>} />
        <Route path="/contact-messages" element={<AdminOrAboveRoute><ContactMessagesPage /></AdminOrAboveRoute>} />


        {/* Super Admin only */}
        <Route path="/users" element={<SuperAdminRoute><UsersPage /></SuperAdminRoute>} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
