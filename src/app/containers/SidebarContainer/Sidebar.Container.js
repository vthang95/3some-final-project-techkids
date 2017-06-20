import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchLists } from '../../actions/index';

class SidebarContainer extends Component {
  componentWillMount() {
    this.props.fetchLists();
  }

  renderList() {
    return this.props.lists.map(list => (<li key={list._id} style={style.li}>{list.name}</li>))
  }

  render() {
    if (typeof this.props.lists.length == 'undefined') return (<div>Loading...</div>)
    return (
      <div className="sidebar" style={{ marginTop: '53px' }}>
        <div className="sidebar-wrapper">
          <ul>
            {this.renderList()}
          </ul>
        </div>
      </div>
    )
  }
}

const style = {
  li: {
    borderBottom: '1px outset',
    textAlign: 'center',
    paddingTop: '5px',
    paddingBottom: '5px'
  }
}

function mapStateToProps({ lists }) {
  return { lists }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchLists }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);
