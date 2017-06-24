exports.getHome = (req, res) => {
  if (!req.user) return res.render('home', { title: 'Oh!List' });
  return res.redirect('/workspace');
};

exports.getLoginPage = (req, res) => {
  if (req.user) return res.redirect('/');
  return res.render('account/login', {
    title: 'Login'
  });
};

exports.getSignupPage = (req, res) => {
  if (req.user) return res.redirect('/');
  return res.render('account/signup', {
    title: 'Create Account'
  });
};

exports.getWorkspacePage = (req, res) => {
  if (!req.user) return res.redirect('/login');
  return res.render('workspace', { title: 'Workspace' });
};
