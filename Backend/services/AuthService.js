const db = require('../models/index.js');
const bcrypt = require('bcryptjs');

const getUserByEmail = async (email) => {
    return await db.User.findOne({where: {email}});
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
    return {id, display_name, username, avatar};
}

module.exports = { getUserByEmail, userLogin }