import React, { Component } from 'react';
import { Col, Row, Button, Modal, Label } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';

import { getHostName } from '../../utils/helper';

class Notes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModalCreate: false,
      notes: [],
      note: {}
    }
  }

  componentDidMount() {
    this.fetchNotes();
  }

  fetchNotes() {
    let url = `${getHostName()}/api/notes/${this.props.user.user_id}`
    axios.get(url).then(res => this.setState({ notes: res.data }));
  }

  renderNotes() {
    let genLabel = color => {
      console.log(color);
      switch (color) {
        case 'brown':
          return '#777777'
          break;
        case 'blue':
          return '#4D90FC'
          break;
        case 'green':
          return '#60BF60'
          break;
        case 'littleblue':
          return '#5BC0DD'
          break;
        case 'orange':
          return '#FC9800'
          break;
        case 'red':
          return '#DE4B33'
          break;
        default:
          return '#d3d3d3'
      }
    };

    return this.state.notes.map(note => {
      return (
        <Col md={4} style={style.note} key={note._id}>
          <div className="card">
            <Row>
              <Col xs={2} style={{ backgroundColor: `${genLabel(note.labelColor)}`, height: '30px', width: '2px', borderRadius: '3px', paddingTop: '2px' }}>
              </Col>
              <Col xs={10}>
                <div className="header" style={style.header}>{note.title}</div>
                <div className="content">{note.content}</div>
              </Col>
            </Row>
          </div>
        </Col>
      )
    })
  }

  onInputChange(event) {
    this.setState({ note: { title: event.target.value, content: this.state.note.content } })
  }

  onTextareaChange(event) {
    this.setState({ note: { content: event.target.value, title: this.state.note.title } })
  }

  addNote() {
    let { title, content, labelColor } = this.state.note;
    let url = `${getHostName()}/api/notes`;
    axios.post(url, { owner: this.props.user.user_id, title, content, labelColor });
    this.setState({ showModalCreate: false });
    this.fetchNotes();
  }

  handleChooseLabel(what) {
    let { title, content } = this.state.note;
    switch (what) {
      case 'brown':
        this.setState({ note: { title, content, labelColor: what } });
        break;
      case 'blue':
        this.setState({ note: { title, content, labelColor: what } });
        break;
      case 'green':
        this.setState({ note: { title, content, labelColor: what } });
        break;
      case 'littleblue':
        this.setState({ note: { title, content, labelColor: what } });
        break;
      case 'orange':
        this.setState({ note: { title, content, labelColor: what } });
        break;
      case 'red':
        this.setState({ note: { title, content, labelColor: what } });
        break;
      default:

    }
  }

  render() {
    let closeCreateModal = () => this.setState({ showModalCreate: false });
    console.log(this.state.notes);
    return (
      <div>
        <Col md={12} style={style.note}>
          <div className="card">
            <div className="content">
              <Row>
                <Col md={6}>
                  <Button onClick={() => this.setState({ showModalCreate: true })} bsSize="xsmall" bsStyle="success">New</Button>
                    <Modal
                      show={this.state.showModalCreate}
                      onHide={closeCreateModal}
                      dialogClassName="custom-modal"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">New note </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Row>
                          <Col md={12} style={style.inputForm}>
                            <input
                              style={style.textarea}
                              value={this.state.title}
                              placeholder="Title"
                              onChange={this.onInputChange.bind(this)}
                              required />
                          </Col>
                          <Col md={12} style={style.inputForm}>
                            <textarea placeholder="Content" style={style.textarea} onChange={this.onTextareaChange.bind(this)} />
                          </Col>
                        </Row>
                        <Row>
                          <Col sm={2} xs={2}><Label style={{ cursor: 'pointer' }} onClick={this.handleChooseLabel.bind(this, 'brown')} bsStyle="default">Default</Label></Col>
                          <Col sm={2} xs={2}><Label style={{ cursor: 'pointer' }} onClick={this.handleChooseLabel.bind(this, 'blue')} bsStyle="primary">Default</Label></Col>
                          <Col sm={2} xs={2}><Label style={{ cursor: 'pointer' }} onClick={this.handleChooseLabel.bind(this, 'green')} bsStyle="success">Default</Label></Col>
                          <Col sm={2} xs={2}><Label style={{ cursor: 'pointer' }} onClick={this.handleChooseLabel.bind(this, 'littleblue')} bsStyle="info">Default</Label></Col>
                          <Col sm={2} xs={2}><Label style={{ cursor: 'pointer' }} onClick={this.handleChooseLabel.bind(this, 'orange')} bsStyle="warning">Default</Label></Col>
                          <Col sm={2} xs={2}><Label style={{ cursor: 'pointer' }} onClick={this.handleChooseLabel.bind(this, 'red')} bsStyle="danger">Default</Label></Col>
                        </Row>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button onClick={this.addNote.bind(this)}>Add</Button><Button onClick={closeCreateModal}>Close</Button>
                      </Modal.Footer>
                    </Modal>
                </Col>
                <Col md={6}>
                  <Row>
                    <Col sm={2} xs={2}><Label bsStyle="default">Default</Label></Col>
                    <Col sm={2} xs={2}><Label bsStyle="primary">Default</Label></Col>
                    <Col sm={2} xs={2}><Label bsStyle="success">Default</Label></Col>
                    <Col sm={2} xs={2}><Label bsStyle="info">Default</Label></Col>
                    <Col sm={2} xs={2}><Label bsStyle="warning">Default</Label></Col>
                    <Col sm={2} xs={2}><Label bsStyle="danger">Default</Label></Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
        {!(this.state.notes.length === 0) ? this.renderNotes() : null}
      </div>
    )
  }
}

const style = {
  header: { fontSize: '13px'},
  textarea: {
    resize: 'none',
    width: 'inherit',
    background: 'transparent',
    border: 'none',
    fontWeight: 'bold',
    fontSize: '20px',
    height: '28px'
  },
  inputForm: {
    borderBottom: '1px solid #d3d3d3',
    marginBottom: '8px'
  }
}

function mapStateToProps({ user }) {
  return { user }
}

export default connect(mapStateToProps)(Notes);
