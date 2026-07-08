import React from 'react';

import ReactDOM from 'react-dom/client';

import App from './App.jsx';

import { Provider } from 'react-redux';

import { store } from './redux/store';

import { BrowserRouter } from 'react-router-dom';

import { GoogleOAuthProvider } from '@react-oauth/google';

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './styles/app.scss';

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>

    <Provider store={store}>

      <BrowserRouter>

        {/* Thay YOUR_CLIENT_ID bằng Client ID Google thực tế của bạn */}

        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>

          <App />

        </GoogleOAuthProvider>

      </BrowserRouter>

    </Provider>

  </React.StrictMode>,

);