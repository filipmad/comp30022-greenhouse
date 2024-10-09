// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './home';
import LoginPage from './login';
import SignUpPage from './signUp'

function App() {
  function homeElement() {
    const isSignedIn = false;
    if (!isSignedIn) {
      return <LoginPage/>
    } else {
      return <HomePage/>
    }
  }
  return (
    <Router>
      <Routes>
          <Route path="/" element={homeElement()} />
          <Route path="/home" element={<HomePage/>} />    
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignUpPage/>} />
      </Routes>
    </Router>
  );
}

export default App;