import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ListOfTasks from '../ListOfTasks/ListOfTasks.container';
import ListOfLists from '../ListOfLists/ListOfLists.container';
import { fetchLists } from '../../actions/index';

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchLists(this.props.user.user_id);
  }
  render() {
    console.log(this.props.lists);
    return (
      <div>
        <ListOfTasks />
        <ListOfLists />
      </div>
    )
  }
}

function mapStateToProps({ user, lists }) {
  return { user, lists };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchLists }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
