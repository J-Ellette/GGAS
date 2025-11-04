import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
// Import USWDS styles - using pre-compiled CSS
import '@uswds/uswds/css/uswds.min.css';
// Import custom GGAS USWDS styles
import './styles/ggas-uswds.css';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
