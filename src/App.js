import React from 'react';
import {Home, Products, Cart, Wishlist, Profile} from './Pages';
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/products' element={<Products />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/wishlist' element={<Wishlist />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
      </Routes>
    </div>
  );
}

export default App;
