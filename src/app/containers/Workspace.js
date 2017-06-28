import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

import SidebarContainer from './Sidebar/Sidebar.container';
import Header from './Header/Header.container';
import ListOfTasks from './ListOfTasks/ListOfTasks.container';
import ListOfLists from './ListOfLists/ListOfLists.container';
import Activity from './Activity/Activity.container';

import { fetchUser } from '../actions/index';

class Workspace extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    if((typeof this.props.user.user_id) == 'undefined') return <div></div>;
    return (
      <div className="wrapper">
      <Header />
        <SidebarContainer style={style.sidebar} />
        <div className="main-panel">
          <div className="content row row-offcanvas row-offcanvas-right" style={style.content}>
            <div className="container-fluid">
              <div className="row">
                <ListOfTasks />
                <ListOfLists />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const style = {
  sidebar: {
    position: 'fixed'
  },
  content: {
    marginTop: '60px'
  }
};

function mapStateToProps({ user }) {
  return { user }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
