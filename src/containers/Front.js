import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Switch, Redirect } from 'react-router';
import { Route, Link } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import * as scrollActions from '../actions/scroll';
import Home from '../pages/Home';
import Typography from '@material-ui/core/Typography';
import Footer from '../components/Footer/Footer';
import { connect } from 'react-redux';

class Front extends Component {
  static propTypes = {
    scrollTo: PropTypes.func
  };
  state = {
    contentMargin: '89px',
    topBarClass: 'topBar'
  };
  componentDidMount() {
    window.onmousewheel = e => {
      if (e.deltaY > 0) {
        this.setState({
          contentMargin: '56px',
          topBarClass: 'topBar collapsed'
        });
      } else {
        this.setState({
          contentMargin: '89px',
          topBarClass: 'topBar'
        });
      }
    };
  }
  render() {
    const { scrollTo } = this.props;
    return (
      <div className="front">
        <AppBar className="appBar" position="fixed">
          <Toolbar className="toolbar">
            <div ref="topBar" className={this.state.topBarClass}>
              <div className="toolbarWrapper">
                <div className="expander" />
                <nav className="topNavigation">
                  <Link to="/blog" className="navItem">
                    Blog
                  </Link>
                </nav>
              </div>
            </div>
            <div className="bottomBar">
              <div className="toolbarWrapper">
                {/* <div className="expander" /> */}
                <nav className="bottomNavigation">
                  <Link
                    className="navItem"
                    to="/home"
                    onClick={e => {
                      e.preventDefault();
                      scrollTo('home');
                    }}>
                    Home
                  </Link>
                  <Link
                    className="navItem"
                    to="/home"
                    onClick={e => {
                      e.preventDefault();
                      scrollTo('about');
                    }}>
                    About
                  </Link>
                  <Link
                    className="navItem"
                    to="#education"
                    onClick={e => {
                      e.preventDefault();
                      scrollTo('education');
                    }}>
                    Education
                  </Link>
                  <Link
                    className="navItem"
                    to="#experience"
                    onClick={e => {
                      e.preventDefault();
                      scrollTo('experience');
                    }}>
                    Experience
                  </Link>
                  <Link
                    className="navItem"
                    to="#portofolio"
                    onClick={e => {
                      e.preventDefault();
                      scrollTo('portofolio');
                    }}>
                    Portofolio
                  </Link>
                </nav>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <main className="main" style={{ marginTop: this.state.contentMargin }}>
          <Switch>
            <Route to="/home" component={Home} />
            <Redirect to="/home" />
          </Switch>
        </main>
        <Footer />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(scrollActions, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(Front);
