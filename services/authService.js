const authRepo = require('../repository/authRepo');

const loginUser = (body) => {
    const userLoggedIn = authRepo.loginUser(body);
    return userLoggedIn;
};

const registerUser = (body) => {
    const userRegistered = authRepo.registerUser(body);
    return userRegistered;
};

const changePassword = (body) => {
    const userPasswdChanged = authRepo.changePassword(body);
    return userPasswdChanged;
};

const deleteUser = (body) => {
    const userDeleted = authRepo.deleteUser(body);
    return userDeleted;
};

module.exports = {
    loginUser,
    registerUser,
    changePassword,
    deleteUser
};