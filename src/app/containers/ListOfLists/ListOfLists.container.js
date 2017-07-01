import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MdFormatListBulleted from 'react-icons/lib/md/format-list-bulleted';
import { Grid, Row, Col, Button, Collapse, Well, FormGroup, FormControl } from 'react-bootstrap';

import { fetchLists, fetchTasks, selectList, fetchUser, postList, deleteList } from '../../actions/index';

import List from '../../components/List/List.component';

class Lists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      value: ''
    }
  }

  renderList() {
    return this.props.lists.map(list => (
      <List {...list} key={list._id} />
    ))
  }

  handleInputChange(e) {
    this.setState({ value: e.target.value });
  }

  handleKeyPress(target) {
    if (target.charCode == 13) {
      postList({ name: this.state.value, owner: this.props.user.user_id }, this.props.fetchLists.bind(this, this.props.user.user_id));
      this.setState({ value: '', open: false });
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
                  Lists
                </Col>
                <Col xs={6}>
                  {typeof this.props.lists === 'undefined'
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
                        {typeof this.props.lists.length == 'undefined' ? <div>Loading...</div> : this.renderList()}
                    </tbody>
                </table>
            </div>
            <div className="footer">
                <hr />
                <div className="stats">
                    <i className="fa fa-history"></i> a hihi footer
                </div>
            </div>
          </div>
        </div>
      </Col>
    );
  }
}

const style = {
  taskNumber: {
    position: 'absolute',
    right: '7px',
    fontSize: '12px',
    fontWeight: 'light'
  },
  icon: {
    marginRight: '4px'
  },
  li: {
    display: 'inline-block',
    marginLeft: '15px',
    fontSize: '15px',
    paddingLeft: '5px',
    paddingTop: '8px',
    paddingBottom: '8px',
    cursor: 'pointer'
  },
  logo: {
    paddingTop: '10px',
    paddingBottom: '9px',
    backgroundColor: '#a48cd3',
    boxShadow: '0 0 3px rgba(0, 0, 0, 0.2)'
  },
  nav: {
    marginTop: '0px'
  },
  button: {
    position: 'absolute',
    right: '10px',
    top: '-1px',
    padding: '0 8px 0 8px'
  },
  list: {
    cursor: 'pointer'
  }
}

function mapStateToProps({ lists, user }) {
  return { lists, user }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchLists, fetchTasks, selectList, fetchUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
