import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//import { matchRoutes, createRoutesFromChildren, Routes, useLocation, useNavigationType } from 'react-router-dom';
//import { matchRoutes,  } from 'react-router-dom';
//import { initializeFaro, createReactRouterV6DataOptions, ReactIntegration, getWebInstrumentations } from '@grafana/faro-react';
import { createRoutesFromChildren, matchRoutes, Routes, useLocation, useNavigationType } from 'react-router-dom';

import {
  createReactRouterV6Options,
  getWebInstrumentations,
  initializeFaro,
  ReactIntegration,
} from '@grafana/faro-react';
import { TracingInstrumentation } from '@grafana/faro-web-tracing'

initializeFaro({
  url: '<<Replace with Grafana collector with app key>>',
  app: {
    name: 'faro-demo',
    version: '1.0.0',
    environment: 'production'
  },
  
  instrumentations: [
    // Mandatory, omits default instrumentations otherwise.
    ...getWebInstrumentations(),

    // Tracing package to get end-to-end visibility for HTTP requests.
    new TracingInstrumentation(),

    // React integration for React applications.
    new ReactIntegration({
      router: createReactRouterV6Options({
        createRoutesFromChildren,
        matchRoutes,
        Routes,
        useLocation,
        useNavigationType,
      }),
    }),
  ],
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);