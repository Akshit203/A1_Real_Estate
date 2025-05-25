const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  // Check if the Authorization header is present
  if (!req.headers.authorization) {
    return res.status(403).json({ msg: 'Not authorized. No token' });
  }

  // Check if the token starts with 'Bearer '
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    const token = req.headers.authorization.split(' ')[1]; // Extract the token

    // Verify the token using jwt.verify
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        return res.status(403).json({ msg: 'Wrong or expired token' }); // Invalid token
      } else {
        console.log('Decoded token data:', data);
        req.user = data; // Attach user data to the request object (user's id)
        next(); // Proceed to the next middleware or route handler
      }
    });
  } else {
    return res.status(403).json({ msg: 'Token is not in the correct format. It should start with "Bearer "' });
  }
};

module.exports = verifyToken;
