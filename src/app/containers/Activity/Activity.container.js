import React, { Component } from 'react';

import style from './Activity.style.css'

class Activity extends Component {
  render() {
    return (
      <div className="col-md-8">
        <div className="card">
          <div className="header">
            <h4 className="title">Activities</h4>
          </div>
          <div className="content">
            <div className="table-full-width">
                <table className="table">
                    <tbody>
                      <tr><td style={{ paddingLeft: '20px' }}>Oops! There is no activity to show!</td></tr>
                    </tbody>
                </table>
            </div>
            <div className="footer">
                <hr />
                <div className="stats">
                    <i className="fa fa-history"></i> Updated 3 minutes ago
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Activity;
