import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchUser } from '../../actions/index';

class SidebarContainer extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-wrapper">
          Hello {this.props.user.name}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ user }) {
  return { user }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);
