import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#FFF',
      main: '#FFF'
    },
    secondary: {
      main: '#273547',
      light: '#273547'
    }
  },
  typography: {
    useNextVariants: true
  },
  status: {
    error: {
      color: '#721c24',
      backgroundColor: '#f8d7da',
      borderColor: '#f5c6cb'
    },
    success: {
      color: '#155724',
      backgroundColor: '#d4edda',
      borderColor: '#c3e6cb'
    },
    warning: {
      color: '#856404',
      backgroundColor: '#fff3cd',
      borderColor: '#ffeeba'
    },
    info: {
      color: '#0c5460',
      backgroundColor: '#d1ecf1',
      borderColor: '#bee5eb'
    }
  }
});

export default class App extends Component {
  static get propTypes() {
    return {
      children: PropTypes.any,
      classes: PropTypes.object,
      theme: PropTypes.object
    };
  }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="app">{this.props.children}</div>
      </MuiThemeProvider>
    );
  }
}
