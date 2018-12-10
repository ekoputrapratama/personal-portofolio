import React from 'react';
import Loadable from 'react-loadable';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Route, Switch, Redirect } from 'react-router';
import App from './containers/App';
import Front from './containers/Front';

const Loading = () => (
  <CircularProgress
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translateX(-50%) translateY(-50%)'
    }}
  />
);

const Admin = Loadable({
  loader: () => import('./containers/Admin'),
  loading: Loading
});

// const Login = Loadable({
//   loader: () => import('./pages/Login'),
//   loading: Loading
// });

function Routes() {
  return (
    <App>
      <Switch>
        {/* <Route path="/login" component={Login} /> */}
        <Route path="/admin" component={Admin} />
        <Route path="/" component={Front} />
        <Redirect to="/" />
      </Switch>
    </App>
  );
}

export default Routes;
