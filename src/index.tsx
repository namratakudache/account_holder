import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers'; // Import your combined reducers
import reportWebVitals from './reportWebVitals';

// Check if 'root' is not null before using it
const rootElement = document.getElementById('root');

if (rootElement) {
  // Create a Redux store
  const store = createStore(rootReducer);

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}

// Optional: You can keep reportWebVitals if you want to measure performance
reportWebVitals();
