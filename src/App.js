import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import Router from './route/index';

const App = ({ store }) => (
  <Provider store={store}>
    <Router />
  </Provider>
);
App.propTypes = {
  store: PropTypes.objectOf(PropTypes.object()).isRequired,
};
export default hot(module)(App);
