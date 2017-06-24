import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MdFormatListBulleted from 'react-icons/lib/md/format-list-bulleted';

import { fetchLists, fetchTasks, activeList, fetchUser } from '../../actions/index';

import List from '../../components/List/List.component';

class Lists extends Component {
  componentDidMount() {
    this.props.fetchLists(this.props.user.id);
  }

  renderList() {
    return this.props.lists.map(list => (
      <List {...list} key={list._id} />
    ))
  }

  render() {
    return (
      <div className="col-md-4">
        <div className="card">
          <div className="header">
            <h4 className="title">Your lists</h4>
          </div>
          <div className="content">
            <div className="table-full-width">
                <table className="table">
                    <tbody>
                      <tr className="nav" >
                        {typeof this.props.lists.length == 'undefined' ? <div>Loading...</div> : this.renderList()}
                      </tr>
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
      </div>
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
  }
}

function mapStateToProps({ lists, user }) {
  return { lists, user }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchLists, fetchTasks, activeList, fetchUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
