import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MdFormatListBulleted from 'react-icons/lib/md/format-list-bulleted';

import { fetchLists, fetchTasks, activeList } from '../../actions/index';

class SidebarContainer extends Component {
  componentWillMount() {
    this.props.fetchLists();
  }

  handleClickList(list) {
    this.props.fetchTasks(list);
    this.props.activeList(list);
  }

  renderList() {
    return this.props.lists.map(list => (
      <li key={list._id} style={style.li} onClick={this.handleClickList.bind(this, list)}>
        <MdFormatListBulleted style={style.icon} />
        {list.name}
        <span style={style.taskNumber}>
          {list.tasks.length}
        </span>
      </li>
    ))
  }

  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-wrapper">
          <div className="logo" style={style.logo}>
                <a href="/" className="simple-text">
                    oh!List
                </a>
            </div>
          <ul className="nav" style={style.nav}>
            {typeof this.props.lists.length == 'undefined' ? <div>Loading...</div> : this.renderList()}
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
    fontWeight: 'light'
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
  },
  logo: {
    paddingTop: '10px',
    paddingBottom: '9px',
    backgroundColor: '#a48cd3',
    boxShadow: '0 0 3px rgba(0, 0, 0, 0.2)'
  },
  nav: {
    marginTop: '0px'
  }
}

function mapStateToProps({ lists }) {
  return { lists }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchLists, fetchTasks, activeList }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);
