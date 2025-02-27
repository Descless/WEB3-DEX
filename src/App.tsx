// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import FollowPage from './pages/FollowPage.tsx';
import PreviousTradesPage from './pages/PreviousTradesPage.tsx';
import SwapPage from './pages/SwapPage.tsx';
import TradePage from './pages/TradePage.tsx';
import WalletConnect from './components/WalletConnect.tsx';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/follow" element={<FollowPage />} />
        <Route path="/previous-trades" element={<PreviousTradesPage />} />
        <Route path="/swap" element={<SwapPage />} />
        <Route path="/trade" element={<TradePage />} />
        <Route path="/wallet-connect" element={<WalletConnect />} />
      </Routes>
    </Router>
  );
}

export default App;
