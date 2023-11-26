import React, { useState } from 'react';
import Login from './components/Login';
import MainView from './components/MainView';
import SubView from './components/SubView';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        setLoggedIn(true);
    };

    return (
        <div>
            {!loggedIn ? (
                <Login onLogin={handleLogin} />
            ) : (
                <MainView />
            )}
        </div>
    );
}

export default App;
