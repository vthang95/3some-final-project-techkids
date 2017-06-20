import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { fetchUser } from '../../actions/index';

class Header extends Component {
  componentDidMount(){
    this.props.fetchUser();
  }

  render() {
    return (
      <div className='col-md-12 navbar navbar-default navbar-fixed-top navbar-fix'>
        <div className='col-md-2 nav navbar-nav header-logo'>
          Oh!List
        </div>
        <div className='col-sm-10 collapse navbar-collapse' style={style.align}>
          <ul className='nav navbar-nav navbar-right'>
            <li className='dropdown' style={style.li}>
              <a className='dropdown-toggle' data-toggle='dropdown' style={style.a}>
                <img style={style.img} src='http://img1.ak.crunchyroll.com/i/spire4/2f6ab456b03afbe0b3c6b97c7560d8e01486165341_large.png' />
                {this.props.user.name}
                <i className='caret'></i>
              </a>
              <ul className='dropdown-menu'>
                <li><Link to='/profile'>My Account</Link></li>
                <li className='divider'></li>
                <li><a href='/api/users/logout'>Logout</a></li>
              </ul>
            </li>
          </ul>
          </div>
      </div>
    )
  }
}

const style = {
  img: {
    borderRadius: '50%'
  },
  a: {
    textTransform: 'none',
    cursor: 'pointer'
  },
  align: {
    position: 'absolute',
    right: '25px',

  }
}

function mapStateToProps({ user }) {
  return { user };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
