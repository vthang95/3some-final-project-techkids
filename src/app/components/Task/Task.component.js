import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Button, Col, Row } from 'react-bootstrap';
import { FaStar, FaStarO, FaTrash, FaTrashO } from 'react-icons/lib/fa';
import axios from 'axios';

import { fetchTasks, deleteTask } from '../../actions/index';
import { getHostName } from '../../utils/helper';

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHover: false,
      showModal: false,
      isStarred: false,
      isDeleteHover: false,
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

  onHandleMouseEnter(what) {
    switch (what) {
      case 'tr':
        this.setState({ isHover: true });
        break;
      case 'delete':
        this.setState({ isDeleteHover: true });
        break;
    }
  }

  onHandleMouseLeave(what) {
    switch (what) {
      case 'tr':
        this.setState({ isHover: false });
        break;
      case 'delete':
        this.setState({ isDeleteHover: false });
        break;
    }
  }

  onOpenModal() {
    this.setState({ showModal: true });
  }

  onCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    let { name, updatedAt, _id, listIn } = this.props;
    let lengthOfName = name.length;
    let [date, time] = updatedAt.slice(0, 19).split('T');

    return (
      <tr
        style={this.state.isHover ? style.task : null}
        onMouseEnter={this.onHandleMouseEnter.bind(this, 'tr')}
        onMouseLeave={this.onHandleMouseLeave.bind(this, 'tr')}
      >
        <td>
          <input type="checkbox" value="" data-toggle="checkbox" />
        </td>
        <td
          onClick={this.onOpenModal.bind(this)}
        >
          {lengthOfName < 80 ? name : `${name.slice(0, 80)}...`}
        </td>
        <td className="td-actions text-right">
          <span onClick={this.onHandleStar.bind(this, this.props)}>{this.state.isStarred ? <FaStar /> : <FaStarO />}</span>
        </td>
        <Modal show={this.state.showModal} onHide={this.onCloseModal.bind(this)}>
          <Modal.Header>
            <Row>
              <Col md={11}>
                {name}
              </Col>
              <Col md={1}>
                <span style={style.star} onClick={this.onHandleStar.bind(this, this.props)}>{this.state.isStarred ? <FaStar size={25} /> : <FaStarO size={25} />}</span>
              </Col>
            </Row>
          </Modal.Header>
          <Modal.Body>
            <p style={style.dateTime}>{date} {time}</p>
            <h4>Description</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
          </Modal.Body>
          <Modal.Footer>
            <Row>
              <Col style={style.colInTheLeft} md={6}>
                <span
                  style={style.span}
                  onClick={this.handleDeleteTask.bind(this, { _id, listIn })}
                  onMouseEnter={this.onHandleMouseEnter.bind(this, 'delete')}
                  onMouseLeave={this.onHandleMouseLeave.bind(this, 'delete')}
                >
                  {this.state.isDeleteHover ? <FaTrash size={30} /> : <FaTrashO size={30} />}
                </span>
              </Col>
              <Col md={6}>
                <Button onClick={this.onCloseModal.bind(this)}>Close</Button>
              </Col>
            </Row>
          </Modal.Footer>
        </Modal>
      </tr>
    )
  }
}

const style = {
  task: { cursor: 'pointer', backgroundColor: '#90f6a3' },
  star: { position: 'absolute', top: '-3px', right: '15px' },
  dateTime: { fontSize: 12 },
  colInTheLeft: { textAlign: 'left' },
  span: { cursor: 'pointer' }
}

function mapStateToProps({ tasks, activeList }) {
  return { tasks, activeList };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchTasks, deleteTask }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);
