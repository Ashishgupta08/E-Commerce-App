import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, ProductsProvider, UserProvider } from "./Contexts/index";
import SnackbarProvider from 'react-simple-snackbar'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <SnackbarProvider>
        <ProductsProvider>
          <AuthProvider>
            <UserProvider>
              <App />
            </UserProvider>
          </AuthProvider>
        </ProductsProvider>
      </SnackbarProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);