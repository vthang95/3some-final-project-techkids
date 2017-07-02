import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, Switch, Route } from 'react-router-dom';

import SidebarContainer from './Sidebar/Sidebar.container';
import Header from './Header/Header.container';
import ListOfTasks from './ListOfTasks/ListOfTasks.container';
import ListOfLists from './ListOfLists/ListOfLists.container';
import Dashboard from './Dashboard/Dashboard.container';

import { fetchUser } from '../actions/index';

const Note = () => (<div>note</div>)

class Workspace extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    if((typeof this.props.user.user_id) == 'undefined') return <div></div>;
    return (
      <div className="wrapper">
        <SidebarContainer style={style.sidebar} />
        <div className="main-panel">
          <div className="content" style={style.content}>
            <div className="container-fluid">
              <div className="row">
                <Switch>
                  <Route path='/workspace/dashboard' component={Dashboard} />
                  <Route path='/workspace/note' component={Note} />
                  <Route path='*' component={Note} />
                </Switch>
              </div>
            </div>
          </div>
          <Header />
        </div>
      </div>
    );
  }
}

const style = {
  sidebar: {
    position: 'fixed'
  },
  content: {
    marginTop: '60px'
  }
};

function mapStateToProps({ user }) {
  return { user }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
