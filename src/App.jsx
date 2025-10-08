import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import AlphaBanner from './components/AlphaBanner.jsx';
import FeedbackModal from './components/FeedbackModal.jsx';
import { Analytics } from '@vercel/analytics/react';
import './AppLayout.css';

function App() {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="app-layout">
      {showBanner && <AlphaBanner onDismiss={() => setShowBanner(false)} />}
      <Header />
      <main className="app-main-content">
        <Outlet />
      </main>
      <FeedbackModal />
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
