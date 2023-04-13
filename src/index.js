// The 'index.js' file acts as the starting point of the application and
// sets up the foundation for the rest of the application to build upon.

import React from 'react';
import ReactDOM from 'react-dom/client';
import router from './router';
import { RouterProvider } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Routing system of react-router-dom.
  <RouterProvider router={router} />
);