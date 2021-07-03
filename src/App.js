import React from 'react';
import { Home, Products, Cart, Wishlist, Profile, ProductDescription, Login, Signup } from './Pages';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/products' element={<Products />}></Route>
        <Route path='/view/:id' element={<ProductDescription />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <PrivateRoute path='/cart' element={<Cart />}></PrivateRoute>
        <PrivateRoute path='/wishlist' element={<Wishlist />}></PrivateRoute>
        <PrivateRoute path='/profile' element={<Profile />}></PrivateRoute>
      </Routes>
    </div>
  );
}
export default App;