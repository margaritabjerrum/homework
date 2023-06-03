import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userInputData from './features/user-data';

const store = configureStore({
  reducer: {
    userData: userInputData,    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload.selectedDate'],
        ignoredPaths: ['userData.value.userInputData.selectedDate'],
      },
    }),
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


