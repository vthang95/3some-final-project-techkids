import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MdFormatListBulleted from 'react-icons/lib/md/format-list-bulleted';

import { fetchLists, fetchTasks, selectList, deleteList } from '../../actions/index';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      isHoverOn: false,
    }
  }

  componentWillMount() {
    this.setState({ name: this.props.name })
  }

  handleOnMouseEnter() {
    this.setState({ isHoverOn: true });
  }

  handleOnMouseLeave() {
    this.setState({ isHoverOn: false });
  }

  handleDeleteList(list) {
    deleteList(list, this.props.fetchLists.bind(this, list.owner._id));
  }

  handleEditList(list) {

  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props._id);
    console.log(nextProps.activeList._id);
  }

  render() {
    return (
      <tr
        style={this.state.isHoverOn || this.props.activeList._id === this.props._id ? style.tr : null}
        onMouseEnter={this.handleOnMouseEnter.bind(this)}
        onMouseLeave={this.handleOnMouseLeave.bind(this)}
      >
        <td onClick={this.props.onClickList}><MdFormatListBulleted style={style.icon} /></td>
        <td onClick={this.props.onClickList}>{this.state.name}</td>

        {this.props.activeList._id === this.props._id ? <td className="td-actions text-right">
          <div>
            <button type="button" rel="tooltip" title="Edit List" className="btn btn-info btn-simple btn-xs" onClick={this.handleEditList.bind(this, this.props)}>
                <i className="fa fa-edit"></i>
            </button>
            <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-simple btn-xs" onClick={this.props.onDeleteList}>
                <i className="fa fa-times"></i>
            </button>
          </div>
        </td> : <td onClick={this.props.onClickList}></td>}
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
