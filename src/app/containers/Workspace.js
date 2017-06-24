import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import SidebarContainer from './Sidebar/Sidebar.container';
import Header from './Header/Header.container';
import ListOfTasks from './ListOfTasks/ListOfTasks.container';
import Activity from './Activity/Activity.container';

class Workspace extends Component {
  render() {
    console.log('aaaaaaaaaa');
    return (
      <div className="wrapper">
        <SidebarContainer style={style.sidebar} />
        <div className="main-panel">
          <div className="content" style={style.content}>
            <div className="container-fluid">
              <div className="row">
                <ListOfTasks />
                <Activity />
              </div>
            </div>
          </div>
          <Header />
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

export default Workspace;
