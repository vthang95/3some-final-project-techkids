import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Task from '../../components/Task.component';

class ListOfTasks extends Component {
  renderTask() {
    return (
      this.props.lists.tasks.map(task => (
        <li>{task.name}</li>
      ));
    );
  }
  reder() {
    return (
      <div>
        {this.renderTask()}
      </div>
    );
  }
}

function mapStateToProps({ lists }) {
  return { lists };
}

export default connect(mapStateToProps)(ListOfTasks);
