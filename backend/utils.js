// JWT Verification Middleware
const verifyToken = (req, res, next) => {
    // Get the token from the cookies (or from the Authorization header)
    const token = req.cookies.token || req.headers['authorization'];
  
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }
  
    // Verify the token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;
      next();
    } catch (error) {
      res.status(401).json({ msg: 'Token is not valid' });
    }
  };