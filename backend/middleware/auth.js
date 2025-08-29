const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
// In this example, we have a middleware function that checks for a token in the request header. If the token is not present, the function returns a 401 status code with a message. If the token is present, it verifies the token using the JWT_SECRET from the environment variables. If the token is valid, it decodes the token and sets the decoded user object in the request object. Finally, it calls the next() function to pass control to the next middleware function in the stack.
