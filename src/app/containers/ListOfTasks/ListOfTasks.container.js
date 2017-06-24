import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col, Button, Collapse, Well, FormGroup, FormControl } from 'react-bootstrap';

import { postTask, fetchTasks, deleteTask } from '../../actions/index';

class ListOfTasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      value: ''
    }
  }
  componentDidMount() {

  }
  handleDeleteTask(task) {
    deleteTask(task);
    this.props.fetchTasks({ _id: task.listIn });
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
              <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-simple btn-xs" onClick={this.handleDeleteTask.bind(this, task)}>
                  <i className="fa fa-times"></i>
              </button>
          </td>
      </tr>
    ));
  }

  handleInputChange(e) {
    this.setState({ value: e.target.value });
  }

  handleKeyPress(target) {
    if (target.charCode == 13) {
      postTask({ name: this.state.value, listIn: this.props.activeList._id })
      this.setState({ value: '', open: false })
      this.props.fetchTasks({ _id: this.props.activeList._id })
    }
  }

  render() {
    return (
      <Col md={4}>
        <div className="card">
          <div className="header">
            <Grid style={{ width: 'inherit', height: '100%' }}>
              <Row>
                <Col xs={6}>
                  Tasks
                </Col>
                <Col xs={6}>
                  {typeof this.props.tasks === 'undefined'
                    ? null
                    : <Button onClick={() => this.setState({ open: !this.state.open })} bsStyle="primary" bsSize="xsmall" style={style.button}>+</Button>}
                </Col>
              </Row>
            </Grid>
            <Collapse in={this.state.open}>
              <div>
                <FormGroup bsSize="small" style={{ marginBottom: '0px', paddingTop: '5px', borderTop: '1px solid #ddd', marginTop: '10px' }}>
                  <FormControl
                    type="text"
                    value={this.state.value}
                    placeholder="Enter text"
                    onChange={this.handleInputChange.bind(this)}
                    onKeyPress={this.handleKeyPress.bind(this)}
                    bsSize="sm"
                    />
                </FormGroup>
              </div>
            </Collapse>
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
      </Col>
    );
  }
}

const style = {
  button: {
    position: 'absolute',
    right: '10px',
    top: '-1px',
    padding: '0 8px 0 8px'
  }
}

function mapStateToProps({ tasks, activeList }) {
  return { tasks, activeList };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchTasks, deleteTask }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOfTasks);
