import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import SidebarContainer from './SidebarContainer/Sidebar.Container';

class Workspace extends Component {
  constructor(props) {
    super(props);

    this.state = { name: '' }
  }
  componentWillMount() {
    let _this = this;
    axios.get('http://localhost:7000/api/workspace').then(res => _this.setState({ name: res.data.name }));
  }
  render() {
    return (
      <div className="wrapper" style={style}>
        <SidebarContainer username={this.state.name}/>

      </div>
    );
  }
}

const style = {
  marginTop: '-60px'
};

export default Workspace;
