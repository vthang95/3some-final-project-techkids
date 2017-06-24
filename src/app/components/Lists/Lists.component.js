import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MdFormatListBulleted from 'react-icons/lib/md/format-list-bulleted';

import { fetchLists, fetchTasks, activeList } from '../../actions/index';

class Lists extends Component {
  componentDidMount() {
    console.log('props of List: ', this.props);
    this.props.fetchLists(this.props.user.id);
  }

  handleClickList(list) {
    this.props.fetchTasks(list);
    this.props.activeList(list);
  }

  renderList() {
    return this.props.lists.map(list => (
      <td key={list._id} style={style.li} onClick={this.handleClickList.bind(this, list)}>
        <MdFormatListBulleted style={style.icon} />
        {list.name}
        <span style={style.taskNumber}>
        </span>
      </td>
    ))
  }

  render() {
    console.log('hehehe', this.props.user.id);
    console.log('lists: ', this.props.lists);
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
                      <tr className="nav" style={style.nav} >
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
  return bindActionCreators({ fetchLists, fetchTasks, activeList }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
