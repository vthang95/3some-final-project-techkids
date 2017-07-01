import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Button, Col, Row } from 'react-bootstrap';
import { FaStar, FaStarO } from 'react-icons/lib/fa';
import axios from 'axios';

import { fetchTasks, deleteTask } from '../../actions/index';
import { getHostName } from '../../utils/helper';

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHover: false,
      showModal: false,
      isStarred: false
    }
  }

  componentWillMount() {
    this.setState({ isStarred: this.props.isStarred })
  }

  handleDeleteTask(task) {
    deleteTask(task, this.props.fetchTasks.bind(this, { _id: task.listIn }));
  }

  onHandleStar(task) {
    let url = `${getHostName()}/api/tasks/${task._id}`;
    
    this.setState({ isStarred: !this.state.isStarred })
    axios.put(url, { isStarred: !this.state.isStarred });
  }

  onHandleMouseEnter() {
    this.setState({ isHover: true });
  }

  onHandleMouseLeave() {
    this.setState({ isHover: false });
  }

  onOpenModal() {
    this.setState({ showModal: true });
  }

  onCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    let task = {_id: this.props._id ,listIn: this.props.listIn};
    return (
      <tr
        onClick={this.onOpenModal.bind(this)}
        style={this.state.isHover ? style.task : null}
        onMouseEnter={this.onHandleMouseEnter.bind(this)}
        onMouseLeave={this.onHandleMouseLeave.bind(this)}
      >
        <td>
          <input type="checkbox" value="" data-toggle="checkbox" />
        </td>
        <td>{this.props.name}</td>
        <td className="td-actions text-right">
            {this.state.isStarred ? <FaStar /> : <FaStarO />}
        </td>
        <Modal show={this.state.showModal} onHide={this.onCloseModal.bind(this)}>
          <Modal.Header>
            <Row>
              <Col md={6}>
                {this.props.name}
              </Col>
              <Col md={6}>
                <span style={style.star} onClick={this.onHandleStar.bind(this, this.props)}>{this.state.isStarred ? <FaStar size={25} /> : <FaStarO size={25} />}</span>
              </Col>
            </Row>
          </Modal.Header>
          <Modal.Body>
            <h6>{this.props.updatedAt}</h6>
            <h4>Description</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.onCloseModal.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </tr>
    )
  }
}

const style = {
  task: { cursor: 'pointer', backgroundColor: '#90f6a3' },
  star: { position: 'absolute', top: '-3px', right: '15px' }
}

function mapStateToProps({ tasks, activeList }) {
  return { tasks, activeList };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchTasks, deleteTask }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);
