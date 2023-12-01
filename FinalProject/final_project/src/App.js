import React, { useState } from 'react';
import Login from './components/Login';
import MainView from './components/MainView';
import SubView from './components/SubView';
import About from './components/About';

function App() {
    const [currentView, setCurrentView] = useState('login');
    const [userName, setUserName] = useState('');

  const handleLoginSuccess = (name) => {
    setUserName(name);
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

  const navToAbout = () => {
    setCurrentView('about');
  }

    return (
        <div>
      {currentView === 'login' && <Login onLoginSuccess={handleLoginSuccess} />}
      {currentView === 'main' && (
        <MainView
        userName = {userName}
          onMainToSubView={handleMainToSubView}
          onLogout={handleLogout}
          onAbout = {navToAbout}
        />
      )}
      {currentView === 'sub' && (
        <SubView
        userName = {userName}
          onSubViewToMain={handleSubViewToMain}
          onLogout={handleLogout}
          onAbout = {navToAbout}
        />
      )}
      {
        currentView === 'about' && (
          <About
          userName = {userName}
            onSubViewToMain={handleSubViewToMain}
            onLogout={handleLogout}
          />
        )}
      
    </div>
    );
}

export default App;
