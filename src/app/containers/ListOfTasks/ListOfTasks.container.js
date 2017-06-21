import React, { Component } from 'react';
import { connect } from 'react-redux';

class ListOfTasks extends Component {
  renderTask() {
    return this.props.tasks.map(task => (
      <li key={task._id} style={style.task}>{task.name}</li>
    ));
  }
  render() {
    console.log(this.props);
    if (this.props.tasks.length === 0) return (<div>Loading...</div>);
    console.log(this.props);
    return (
      <div className="col-md-3" style={style.div}>
        <ul>
          Hello
          {this.renderTask()}
        </ul>
      </div>
    );
  }
}

const style = {
  task: {
    color: '#000',
    marginTop: '30px',
    marginLeft: '300px'
  },
  div: {
  }
}

function mapStateToProps({ tasks }) {
  return { tasks };
}

export default connect(mapStateToProps)(ListOfTasks);
