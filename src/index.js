import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import history from './components/history';
import { AuthContextProvider } from './context/auth-context';



ReactDOM.render(<Router history={history}>
  <AuthContextProvider>

        <App />
 
    
  </AuthContextProvider></Router>,
  document.getElementById('root')
);


reportWebVitals();
