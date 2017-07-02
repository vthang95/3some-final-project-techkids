import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { MdSearch, MdNotificationsNone } from 'react-icons/lib/md';
import TiMessages from 'react-icons/lib/ti/messages';
import { Modal } from 'react-bootstrap';

import { fetchUser } from '../../actions/index';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };
  }
  componentDidMount(){
    this.props.fetchUser();
  }

  onClickToggle() {
    this.setState({ showModal: true })
  }

  onCloseModal() {
    this.setState({ showModal: false })
  }

  render() {
    return (
      <div className="navbar navbar-default" style={style.navbar}>
        <div className="container-fluid">
          <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target="#navigation-example-2"
                onClick={this.onClickToggle.bind(this)}
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Modal show={this.state.showModal} onHide={this.onCloseModal.bind(this)}>
                <Modal.Header>
                  <Link to='/workspace/dashboard'>Dashboard</Link>
                </Modal.Header>
                <Modal.Body>
                  <Link to='/workspace/note'>Note</Link>
                </Modal.Body>
                <Modal.Footer>
                  <a href="/api/users/logout">Logout</a>
                </Modal.Footer>
              </Modal>
          </div>
          <div className='col-sm-10 collapse navbar-collapse id="navigation-example-2"' style={style.align}>
            <ul className='nav navbar-nav navbar-right'>
              <li style={style.notification}>
                <MdNotificationsNone size={22} />
              </li>
              <li style={style.notification}>
                <TiMessages size={22} />
              </li>
              <li className='dropdown' style={style.username}>
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
      </div>
    )
  }
}

const style = {
  notification: {
    paddingTop: '14px',
    marginLeft: '15px'
  },
  img: {
    borderRadius: '50%'
  },
  a: {
    textTransform: 'none',
    cursor: 'pointer',
    paddingTop: '15px',
    margin: '0px'
  },
  align: {
    position: 'absolute',
    right: '30px',
  },
  username: {
    fontSize: '15px',
  },
  navbar: {
    position: 'absolute',
    width: '100%',
    height: '61px',
    right: 0,
    top: 0,
  }
}

function mapStateToProps({ user }) {
  return { user };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
