import React from 'react';
import { Home, Products, Cart, Wishlist, Profile, ProductDescription } from './Pages';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/products' element={<Products />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/wishlist' element={<Wishlist />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/view/:id' element={<ProductDescription />}></Route>
      </Routes>
    </div>
  );
}
export default App;