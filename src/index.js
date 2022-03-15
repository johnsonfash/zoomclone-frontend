import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/bootstrap.css';
import './styles/global.css';
import './styles/app.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import App from './App';
import { App as CapacitorApp } from '@capacitor/app';
import reportWebVitals from './reportWebVitals';
config.autoAddCss = false;

CapacitorApp.addListener('backButton', ({ canGoBack }) => {
  if (!canGoBack) {
    CapacitorApp.exitApp();
  } else {
    window.history.back();
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
