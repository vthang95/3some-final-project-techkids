import React, { Component } from 'react';
import { Col, Row, Button, Modal, Label } from 'react-bootstrap';

class Notes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModalCreate: false
    }
  }

  componentWillMount() {

  }

  render() {
    let closeCreateModal = () => this.setState({ showModalCreate: false });
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
                        <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <h4>Wrapped Text</h4>
                        <p>Vl</p>
                        <Row>
                          <Col sm={2} xs={2}><Label bsStyle="default">Default</Label></Col>
                          <Col sm={2} xs={2}><Label bsStyle="primary">Default</Label></Col>
                          <Col sm={2} xs={2}><Label bsStyle="success">Default</Label></Col>
                          <Col sm={2} xs={2}><Label bsStyle="info">Default</Label></Col>
                          <Col sm={2} xs={2}><Label bsStyle="warning">Default</Label></Col>
                          <Col sm={2} xs={2}><Label bsStyle="danger">Default</Label></Col>
                        </Row>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button onClick={closeCreateModal}>Close</Button>
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
        <Col md={4} style={style.note}>
          <div className="card">
            <div className="header" style={style.header}>header</div>
            <div className="content">Content</div>
          </div>
        </Col>
        <Col md={4} style={style.note}>
          <div className="card">
            <div className="header" style={style.header}>header</div>
            <div className="content">Content</div>
          </div>
        </Col>
        <Col md={4} style={style.note}>
          <div className="card">
            <div className="header" style={style.header}>header</div>
            <div className="content">Content</div>
          </div>
        </Col>
      </div>
    )
  }
}

const style = {
  header: { fontSize: '12px' }
}

export default Notes;
