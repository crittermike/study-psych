import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { UnitProvider } from './context/UnitContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UnitProvider>
      <App />
    </UnitProvider>
  </StrictMode>
);
