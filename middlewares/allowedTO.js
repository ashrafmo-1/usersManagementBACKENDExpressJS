const ERROR = require("../utils/ERROR");

module.exports = (...roles) => {
    // admins managers
    console.log('cureent roles', roles);
    return (req, res, next) => {
        if(!roles.includes(req.currentUser.role)) {
            return next(ERROR.create("this role not Auth", 403, 'x'));
        }
        next();
    }
}