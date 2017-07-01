import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MdFormatListBulleted from 'react-icons/lib/md/format-list-bulleted';

import { fetchLists, fetchTasks, selectList, deleteList } from '../../actions/index';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHoverOn: false,
    }
  }
  handleClickList(list) {
    this.props.fetchTasks(list);
    this.props.selectList(list);
  }
  handleOnMouseOver() {
    this.setState({ isHoverOn: true });
  }
  handleOnMouseOut() {
    this.setState({ isHoverOn: false });
  }
  handleDeleteList(list) {
<<<<<<< HEAD
    deleteList(list, this.props.fetchLists.bind(this, list.owner._id));
=======
    deleteList(list, this.props.fetchLists.bind(this, list.owner._id))
>>>>>>> 4cb266dc66dcfcfd33724bde012246898f214d0c
  }
  render() {
    return (
      <tr
        style={this.state.isHoverOn || this.props.activeList._id === this.props._id ? style.tr : null}
        onMouseOver={this.handleOnMouseOver.bind(this)}
        onClick={this.handleClickList.bind(this, this.props)}
        onMouseOut={this.handleOnMouseOut.bind(this)}
      >
        <td><MdFormatListBulleted style={style.icon} /></td>
        <td>{this.props.name}</td>
        <td className="td-actions text-right">
        {this.props.activeList._id === this.props._id ? <div>
            <button type="button" rel="tooltip" title="Edit List" className="btn btn-info btn-simple btn-xs">
                <i className="fa fa-edit"></i>
            </button>
            <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-simple btn-xs" onClick={this.handleDeleteList.bind(this, this.props)}>
                <i className="fa fa-times"></i>
            </button>
          </div> : null}
        </td>
      </tr>
    );
  }
}

const style = {
  tr: {
    backgroundColor: "#e0eefa",
    cursor: 'pointer'
  }
}

function mapStateToProps({ activeList }) {
  return { activeList }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchLists, fetchTasks, selectList }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
