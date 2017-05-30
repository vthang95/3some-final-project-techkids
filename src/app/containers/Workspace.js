import React, { Component } from 'react';
import axios from 'axios';

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
      <div>
        Hello {this.state.name}
      </div>
    );
  }
}

export default Workspace;
