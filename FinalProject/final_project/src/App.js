import React, { useState } from 'react';
import Login from './components/Login';
import MainView from './components/MainView';
import SubView from './components/SubView';

function App() {
    const [currentView, setCurrentView] = useState('login');

  const handleLoginSuccess = () => {
    setCurrentView('main');
  };

  const handleMainToSubView = () => {
    setCurrentView('sub');
  };

  const handleSubViewToMain = () => {
    setCurrentView('main');
  };

  const handleLogout = () => {
    setCurrentView('login');
  };

    return (
        <div>
      {currentView === 'login' && <Login onLoginSuccess={handleLoginSuccess} />}
      {currentView === 'main' && (
        <MainView
          onMainToSubView={handleMainToSubView}
          onLogout={handleLogout}
        />
      )}
      {currentView === 'sub' && (
        <SubView
          onSubViewToMain={handleSubViewToMain}
          onLogout={handleLogout}
        />
      )}
    </div>
    );
}

export default App;
