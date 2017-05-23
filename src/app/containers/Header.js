import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button className="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">
              <i className="fa fa-cube"></i>
              Oh!List
            </Link>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Create Account</Link></li>
          </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
