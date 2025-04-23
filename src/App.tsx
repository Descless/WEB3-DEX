// App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import FollowPage from './pages/FollowPage.tsx';
import PreviousTradesPage from './pages/PreviousTradesPage.tsx';

import WalletConnect from './components/WalletConnect.tsx';
const App: React.FC = () => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/follow" element={<FollowPage />} />

        {isLoggedIn &&
        <Route path="/previous-trades" element={<PreviousTradesPage />} /> 
        }
        
        <Route path="/wallet-connect" element={<WalletConnect />} />
      </Routes>
    </Router>
  );
}

export default App;
