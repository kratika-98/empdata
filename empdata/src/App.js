import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import AuthPage from './components/loginsignup';
import Product from './components/product';
import AddProduct from './components/addproducts';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <AuthPage onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <Product />
         
        </div>
      )}
    </div>
  );
}

export default App;
