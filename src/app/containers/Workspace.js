import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Workspace extends Component {
  constructor(props) {
    super(props);

    this.state = { name: '' }
  }
  componentWillMount() {
    let _this = this;
    axios.get('http://localhost:3000/api/workspace').then(res => _this.setState({ name: res.data.name }));
  }
  render() {
    return (
      <div style={style}>
        Hello {this.state.name}
      </div>
    );
  }
}

const style = {
  marginTop: '-60px'
}

export default Workspace;
