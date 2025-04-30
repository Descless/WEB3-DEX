// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SwapPage from './pages/SwapPage.tsx';
import FollowPage from './pages/FollowPage.tsx';
import PreviousTradesPage from './pages/PreviousTradesPage.tsx';

import WalletConnect from './components/WalletConnect.tsx';
const App: React.FC = () => {

  //const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SwapPage />} />
        <Route path="/follow" element={<FollowPage />} />

        <Route path="/previous-trades" element={<PreviousTradesPage />} /> 
        
        <Route path="/wallet-connect" element={<WalletConnect />} />
      </Routes>
    </Router>
  );
}

export default App;
