// Lib
import React from 'react';
import { createRoot } from 'react-dom/client';

// Style
import 'antd/dist/antd.css';
import './index.css';

// Components
import App from './App';

// Create root container with failsafe for "this should never happen"
const container = document.getElementById('root');


if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  document.body.innerHTML = 'Failed to inject root container';
}
