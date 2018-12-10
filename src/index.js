import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import { store } from './stores';
import './app.global.scss';

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Routes />
      </Router>
    </Provider>,
    document.getElementById('app')
  );
}
render();
