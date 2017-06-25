import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchTasks, deleteTask } from '../../actions/index';

class Task extends Component {
  handleDeleteTask(task) {
    deleteTask(task, this.props.fetchTasks.bind(this, { _id: task.listIn }));
  }

  render() {
    let task = {_id: this.props._id ,listIn: this.props.listIn};
    return (
      <tr>
          <td>
            <input type="checkbox" value="" data-toggle="checkbox" />
          </td>
          <td>{this.props.name}</td>
          <td className="td-actions text-right">
              <button type="button" rel="tooltip" title="Edit Task" className="btn btn-info btn-simple btn-xs">
                  <i className="fa fa-edit"></i>
              </button>
              <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-simple btn-xs" onClick={this.handleDeleteTask.bind(this, task)}>
                  <i className="fa fa-times"></i>
              </button>
          </td>
      </tr>
    )
  }
}

function mapStateToProps({ tasks, activeList }) {
  return { tasks, activeList };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchTasks, deleteTask }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);
