import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MdFormatListBulleted from 'react-icons/lib/md/format-list-bulleted';

import { fetchLists } from '../../actions/index';

class SidebarContainer extends Component {
  componentWillMount() {
    this.props.fetchLists();
  }

  renderList() {
    return this.props.lists.map(list => (
      <li key={list._id} style={style.li} onClick={() => console.log('Click')}>
        <MdFormatListBulleted style={style.icon} />
          {list.name}
          <span style={style.taskNumber}>
            {list.tasks.length}
          </span>
      </li>
    ))
  }

  render() {
    if (typeof this.props.lists.length == 'undefined') return (<div>Loading...</div>)
    console.log(this.props.lists);
    return (
      <div className="col-md-2 sidebar">
        <div className="" style={{ marginTop: '53px' }}>
          <ul style={{ paddingLeft: '-10px' }}>
            {this.renderList()}
          </ul>
        </div>
      </div>
    )
  }
}

const style = {
  taskNumber: {
    position: 'absolute',
    right: '7px',
    fontSize: '12px',
    fontWeight: 'lighter'
  },
  icon: {
    marginRight: '4px'
  },
  li: {
    color: '#fff',
    fontSize: '15px',
    paddingLeft: '5px',
    paddingTop: '8px',
    paddingBottom: '8px',
    cursor: 'pointer'
  }
}

function mapStateToProps({ lists }) {
  return { lists }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchLists }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);
