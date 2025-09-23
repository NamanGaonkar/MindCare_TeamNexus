
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header'; // Assuming your Header component is in the same directory

const MainLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
