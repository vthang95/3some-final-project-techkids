import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MdFormatListBulleted from 'react-icons/lib/md/format-list-bulleted';

import { fetchLists, fetchTasks, activeList, deleteList } from '../../actions/index';

class List extends Component {
  handleClickList(list) {
    this.props.fetchTasks(list);
    this.props.activeList(list);
  }
  handleDeleteList(list) {
    deleteList(list);
    this.props.fetchLists(list.owner._id);
  }
  render() {
    let list = this.props;
    return (
      <tr style={style.li} onClick={this.handleClickList.bind(this, this.props)}>
        <td><MdFormatListBulleted style={style.icon} /></td>
        <td>{list.name}</td>
        <td className="td-actions text-right">
            <button type="button" rel="tooltip" title="Edit List" className="btn btn-info btn-simple btn-xs">
                <i className="fa fa-edit"></i>
            </button>
            <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-simple btn-xs" onClick={this.handleDeleteList.bind(this, this.props)}>
                <i className="fa fa-times"></i>
            </button>
        </td>
      </tr>
    );
  }
}

const style = {
  taskNumber: {
    // position: 'absolute',
    // right: '7px',
    // fontSize: '12px',
    // fontWeight: 'light'
  },
  icon: {
    // marginRight: '4px'
  },
  li: {
    // display: 'inline-block',
    // marginLeft: '15px',
    // fontSize: '15px',
    // paddingLeft: '5px',
    // paddingTop: '8px',
    // paddingBottom: '8px',
    // cursor: 'pointer'
  },
  logo: {
    // paddingTop: '10px',
    // paddingBottom: '9px',
    // backgroundColor: '#a48cd3',
    // boxShadow: '0 0 3px rgba(0, 0, 0, 0.2)'
  },
  nav: {
    // marginTop: '0px'
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchLists, fetchTasks, activeList }, dispatch)
}

export default connect(null, mapDispatchToProps)(List);
