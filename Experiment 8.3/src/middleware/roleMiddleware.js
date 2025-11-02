// Middleware to check if user has one of the allowed roles
const allowRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. This route is restricted to roles: ${allowedRoles.join(", ")}`
      });
    }
    next();
  };
};

module.exports = allowRoles;
