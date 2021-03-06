import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContext'
import { TranslateContextProvider } from './contexts/TranslateContext'
import { CalendarContextProvider } from './contexts/CalendarContext'
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <TranslateContextProvider>
          <CalendarContextProvider>
            <App />
          </CalendarContextProvider>
        </TranslateContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();