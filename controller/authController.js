const authService = require('../services/authService');

const registerUser = async (req,res) => {
    const register = await authService.registerUser(req.body);
    res.sendStatus(200, register);
};

const loginUser = async (req,res) => {
    const login = await authService.loginUser(req.body);
    res.sendStatus(200, login);
};

const changePassword = async (req,res) => {
    const changePasswd = await authService.changePassword(req.body);
    res.send(changePasswd);
};

const deleteUser = async (req,res) => {
    const delUser = await authService.deleteUser(req.body);
    res.send(delUser);
};

//This will be an add-on to be tried later on.
const forgotPassword = (req,res) => {

};

module.exports = {
    registerUser,
    loginUser,
    changePassword,
    forgotPassword,
    deleteUser
};

