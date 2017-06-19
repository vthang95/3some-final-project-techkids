import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import SidebarContainer from './SidebarContainer/Sidebar.Container';

class Workspace extends Component {
  render() {
    return (
      <div className="wrapper" style={style}>
        <SidebarContainer />

      </div>
    );
  }
}

const style = {
  marginTop: '-60px'
};

export default Workspace;
