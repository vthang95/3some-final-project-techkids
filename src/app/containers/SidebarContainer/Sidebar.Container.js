import React from 'react';

const SidebarContainer = (props) => {
  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        Hello {props.username}
      </div>
    </div>
  )
};

export default SidebarContainer;
