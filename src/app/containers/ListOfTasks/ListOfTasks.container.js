import React, { Component } from 'react';
import { connect } from 'react-redux';

class ListOfTasks extends Component {
  componentDidMount() {
    console.log(this.props)
  }
  renderTask() {
    return this.props.tasks.map(task => (
      <tr key={task._id}>
          <td>
            <input type="checkbox" value="" data-toggle="checkbox" />
          </td>
          <td>{task.name}</td>
          <td className="td-actions text-right">
              <button type="button" rel="tooltip" title="Edit Task" className="btn btn-info btn-simple btn-xs">
                  <i className="fa fa-edit"></i>
              </button>
              <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-simple btn-xs">
                  <i className="fa fa-times"></i>
              </button>
          </td>
      </tr>
    ));
  }
  render() {
    return (
      <div className="col-md-4">
        <div className="card">
          <div className="header">
            <h4 className="title">Tasks</h4>
          </div>
          <div className="content">
            <div className="table-full-width">
                <table className="table">
                    <tbody>
                        {this.props.tasks.length === 0 ? <tr><td style={{ paddingLeft: '20px' }}>Oops! There is no task to show!</td></tr> : this.renderTask()}
                    </tbody>
                </table>
            </div>
            <div className="footer">
                <hr />
                <div className="stats">
                    <i className="fa fa-history"></i> Updated 3 minutes ago
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ tasks, lists }) {
  return { tasks, lists };
}

export default connect(mapStateToProps)(ListOfTasks);
