import { Outlet } from 'react-router-dom';
import { LandingNavbar } from './LandingNavbar';
import { LandingFooter } from './LandingFooter';

export const LandingLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <LandingNavbar />
      <main className="flex-1 pt-32">
        <Outlet />
      </main>
      <LandingFooter />
    </div>
  );
};
