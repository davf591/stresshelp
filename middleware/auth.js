module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.cookies['auth']) {
      return next ();
    }
    res.redirect('/')
    // if (req.isAuthenticated()) {
    //   return next()
    // } else {
    //   res.redirect('/')
    // }
    // return next();
  },
  ensureGuest: function (req, res, next) {
    // if (!req.isAuthenticated()) {
    //   return next();
    // } else {
    //   res.redirect('/dashboard');
    // }
    return next();
  },
};
