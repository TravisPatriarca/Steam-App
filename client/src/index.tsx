import React from 'react';
import { createRoot } from 'react-dom/client'
import { App } from './app';

const container = document.getElementById(`root`);
if (container === null) throw new Error(`Root container missing in index.html`)
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
