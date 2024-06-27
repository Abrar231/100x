const db = require('../models/index.js');
const { avatarUrlToData } = require('../utility.js');
const bcrypt = require('bcryptjs');

const getHash = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

const getUserByEmail = async (email) => {
    const User = await db.User.findOne({where: {email}});
    return User;
}

const userLogin = async (email, password) => {
    const user = await db.User.findOne({where: {email}});
    if(user === null){
        return {error: 'User not found'}
    }
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid){
        return {error: 'Invalid Credentials'};
    }
    const {id, display_name, username, avatar} = user;
    return await avatarUrlToData({id, display_name, username, avatar});
}

module.exports = { getHash, getUserByEmail, userLogin }