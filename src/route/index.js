import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from './renderRouter';
import routes from './router.config';

function AppRouter() {
  return (
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  );
}

export default AppRouter;
