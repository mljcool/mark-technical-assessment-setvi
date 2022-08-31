import React from 'react';

import { Link, Route } from 'react-router-dom';
import ThemeWrapper from './theme';
import './App.css';
import AppBarPage from './components/AppBar';

// const renderRoutes = (routes: typeof appRoutes | any) =>
//   routes.map((route) => (
//     <Route
//       key={route.path}
//       exact={route.exact}
//       path={route.path}
//       component={route.component}
//     />
//   ));

const App = () => {
  return (
    <ThemeWrapper>
      <AppBarPage />
      <div className='App'>
        {/* <Switch>{renderRoutes(appRoutes)}</Switch> */}
      </div>
    </ThemeWrapper>
  );
};

export default App;
