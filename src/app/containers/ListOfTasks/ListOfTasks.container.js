import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col, Button, Collapse, Well, FormGroup, FormControl, Modal } from 'react-bootstrap';

import { postTask, fetchTasks, deleteTask } from '../../actions/index';

import Task from '../../components/Task/Task.component';

class ListOfTasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      value: ''
    }
  }
  renderTask() {
    return this.props.tasks.map(task => (
        <Task {...task} key={task._id} />
    ));
  }

  handleInputChange(e) {
    this.setState({ value: e.target.value });
  }

  handleKeyPress(target) {
    if (target.charCode == 13) {
      postTask({ name: this.state.value, listIn: this.props.activeList._id }, this.props.fetchTasks.bind(this, { _id: this.props.activeList._id }));
      this.setState({ value: '', open: false })
    }
  }

  handleClickCheckBox() {
    console.log('hehehhhhhhhhhhhhhhhhh');
  }

  render() {
    return (
      <Col md={8}>
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
          <div className="content" style={style.content}>
            <div className="table-full-width">
                <table className="table">
                    <tbody>
                        {this.props.tasks.length === 0 ? <tr><td style={{ paddingLeft: '20px' }}>Oops! There is no task to show!</td></tr> : this.renderTask()}
                    </tbody>
                </table>
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
  },
  content: {
    paddingBottom: '0px'
  }
}

function mapStateToProps({ tasks, activeList }) {
  return { tasks, activeList };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchTasks, deleteTask }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOfTasks);
