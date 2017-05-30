import React from 'react';

const Login = () => {
  return (
    <div className="container">
      <div className="page-header">
        <h3>Login</h3>
      </div>
      <form className="form-horizontal" action="/users/login" method="POST">
        <input type="hidden" name="_csrf"/>
        <div className="form-group">
          <label className="col-sm-3 control-label" for="email">Email</label>
          <div className="col-sm-7">
            <input className="form-control" type="email" name="email" id="email" placeholder="Email" autofocus="autofocus" />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label" for="password">Password</label>
          <div className="col-sm-7">
            <input className="form-control" type="password" name="password" id="password" placeholder="Password" required="required"/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-3 col-sm-7">
            <button className="col-sm-3 btn btn-primary" type="submit"><i className="fa fa-user"></i>Login</button><a className="btn btn-link" href="/forgot">Forgot your password?</a>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-3 col-sm-7">
            <hr/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-3 col-sm-7">
            <a className="btn btn-block btn-facebook btn-social" href="/auth/facebook">
              <i className="fa fa-facebook"></i>
              Sign in with Facebook
            </a>
            <a className="btn btn-block btn-google btn-social" href="/auth/google">
              <i className="fa fa-google-plus"></i>
              Sign in with Google
            </a>
            <a className="btn btn-block btn-github btn-social" href="/auth/github">
              <i className="fa fa-github"></i>
              Sign in with GitHub
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
