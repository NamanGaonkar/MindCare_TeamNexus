
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header'; // Assuming your Header component is in the same directory

const MainLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <main className="pt-20"> {/* Added padding-top to push content below the header */}
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
