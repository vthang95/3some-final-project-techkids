import React from 'react';

const Signup = () => {
  return (
    <div className="container">
      <div className="page-header">
        <h3>Sign up</h3>
      </div>
      <form className="form-horizontal" id="signup-form" action ="/users/signup" method="POST">
        <input type="hidden" name="_csrf"/>
        <div className="form-group">
          <label className="col-sm-3 control-label" for="username">Username</label>
          <div className="col-sm-7">
            <input className="form-control" type="username" name="username" id="username" placeholder="Username" autofocus="autofocus"/>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label" for="email">Email</label>
          <div className="col-sm-7">
            <input className="form-control" type="email" name="email" id="email" placeholder="Email" autofocus="autofocus"/>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label" for="password">Password</label>
          <div className="col-sm-7">
            <input className="form-control" type="password" name="password" id="password" placeholder="Password"/>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label" for="confirmPassword">Confirm Password</label>
          <div className="col-sm-7">
            <input className="form-control" type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password"/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-3 col-sm-7">
            <button className="btn btn-success" type="submit"><i className="fa fa-user-plus"></i>Signup</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
