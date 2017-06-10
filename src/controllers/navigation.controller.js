exports.getLoginPage = (req, res) => {
  if (req.user) return res.redirect('/');
  return res.render('account/login', {
    title: 'Login'
  });
};

exports.getSignupPage = (req, res) => {
  if (req.user) return res.redirect('/');
  return res.render('account/signup', {
    title: 'signup'
  });
};
