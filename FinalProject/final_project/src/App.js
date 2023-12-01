import React, { useState } from "react";
// const React = require("react");
// const {useState} = require("react");
import Login from "./components/Login";
import MainView from "./components/MainView";
import SubView from "./components/SubView";
import About from "./components/About";
import Company from "./components/Company";

function App() {
  const [currentView, setCurrentView] = useState("login");
  const [userName, setUserName] = useState("");

  const handleLoginSuccess = (name) => {
    setUserName(name);
    setCurrentView("main");
  };

  const handleMainToSubView = () => {
    setCurrentView("sub");
  };

  const handleSubViewToMain = () => {
    setCurrentView("main");
  };

  const handleLogout = () => {
    setCurrentView("login");
  };

  const navToAbout = () => {
    setCurrentView("about");
  };

  const navToCompany = () => {
    setCurrentView("company");
  };

  return (
    <div>
      {currentView === "login" && <Login onLoginSuccess={handleLoginSuccess} />}
      {currentView === "main" && (
        <MainView
          userName={userName}
          onMainToSubView={handleMainToSubView}
          onLogout={handleLogout}
          onAbout={navToAbout}
          onCompany={navToCompany}
        />
      )}
      {currentView === "sub" && (
        <SubView
          userName={userName}
          onSubViewToMain={handleSubViewToMain}
          onLogout={handleLogout}
          onAbout={navToAbout}
          onCompany={navToCompany}
        />
      )}
      {currentView === "about" && (
        <About
          userName={userName}
          onSubViewToMain={handleSubViewToMain}
          onLogout={handleLogout}
          onCompany={navToCompany}
        />
      )}
      {currentView === "company" && (
        <Company
          userName={userName}
          onSubViewToMain={handleSubViewToMain}
          onLogout={handleLogout}
          onAbout={navToAbout}
        />
      )}
    </div>
  );
}

export default App;
