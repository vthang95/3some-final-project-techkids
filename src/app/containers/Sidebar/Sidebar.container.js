import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdSpeakerNotes, MdGroupWork } from 'react-icons/lib/md';

import { fetchLists, fetchTasks, selectList, fetchUser } from '../../actions/index';

class SidebarContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      choose: 'dashboard'
    }
  }

  handleChoose(what) {
    switch (what) {
      case 'dashboard':
        this.setState({ choose: what });
        break;
      case 'note':
        this.setState({ choose: what });
      default:

    }
  }

  render() {
    console.log(this.props);
    return (
      <div className="sidebar">
        <div className="sidebar-wrapper">
          <div className="logo" style={style.logo}>
                <a href="/" className="simple-text">
                    oh!List
                </a>
            </div>
          <ul className="nav" style={style.nav}>
            <li>
              <Link onClick={this.handleChoose.bind(this, 'dashboard')} style={this.state.choose === 'dashboard' ? style.liChoose : style.li} to='/workspace/dashboard'>
                <MdGroupWork size={20} style={style.icon} />
                Dashboard
              </Link>
            </li>
            <li>
              <Link onClick={this.handleChoose.bind(this, 'note')} style={this.state.choose === 'note' ? style.liChoose : style.li} to='/workspace/note'>
                <MdSpeakerNotes size={20} style={style.icon} />
                Note
              </Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

const style = {
  taskNumber: {
    position: 'absolute',
    right: '7px',
    fontSize: '12px',
    fontWeight: 'light'
  },
  icon: {
    marginRight: '10px'
  },
  li: {
    color: '#fff',
    fontSize: '15px',
    paddingLeft: '5px',
    paddingTop: '8px',
    paddingBottom: '8px',
    cursor: 'pointer'
  },
  liChoose: {
    color: '#fff',
    fontSize: '15px',
    paddingLeft: '5px',
    paddingTop: '8px',
    paddingBottom: '8px',
    cursor: 'pointer',
    backgroundColor: 'rgba(250, 234, 245, 0.4)'
  },
  logo: {
    paddingTop: '10px',
    paddingBottom: '9px',
    backgroundColor: '#a48cd3',
    boxShadow: '0 0 3px rgba(255, 255, 255, 0.2)'
  },
  nav: {
    marginTop: '0px',
  }
}

function mapStateToProps({ lists, user }) {
  return { lists, user }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchLists, fetchTasks, selectList, fetchUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);
