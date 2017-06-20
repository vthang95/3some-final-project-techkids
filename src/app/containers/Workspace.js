import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import SidebarContainer from './SidebarContainer/Sidebar.container';
import Header from './Header/Header.container';

class Workspace extends Component {
  render() {
    return (
      <div style={style.wrap}>
        <Header />
        <SidebarContainer />
      </div>
    );
  }
}

const style = {
  wrap: {
    marginTop: '-60px'
  }
};

export default Workspace;
