import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import SidebarContainer from './Sidebar/Sidebar.container';
import Header from './Header/Header.container';
import ListOfTasks from './ListOfTasks/ListOfTasks.container';

class Workspace extends Component {
  render() {
    return (
      <div className="container-fluid" style={style.wrap}>
        <Header />
        <div className="row">
          <SidebarContainer style={style.sidebar} />
          <ListOfTasks />
        </div>
      </div>
    );
  }
}

const style = {
  wrap: {
    marginTop: '-60px'
  },
  sidebar: {
    position: 'fixed'
  }
};

export default Workspace;
