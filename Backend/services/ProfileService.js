const { avatarUrlToData, removeCircularReference } = require('../utility.js');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const db = require('../models/index.js');

const createUser = async (display_name, email, dob, password, username) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return await db.User.create({display_name, email, date_of_birth: new Date(dob), password: hash, username, joined_at: new Date(), follower_count: 0, following_count: 0});
}

const findAndUpdateUserProfile = async (user_id, data) => {
    const user = await db.User.findByPk(user_id);
    return await user.update(data);
    // console.log(`Profile updated successfully`);
    // return await avatarUrlToData(data);
}

const populateUserData = (req) => {
    console.log(`Req.files['avatar'][0]: ${JSON.stringify(req.files)}`);
    // console.log(`Req.files['bgImage'][0]: ${JSON.stringify(req.files['bgImage'][0])}`);
    const avatar = req.files && req.files['avatar']? req.files['avatar'][0].filename: null;
    const bgImage = req.files && req.files['bgImage']? req.files['bgImage'][0].filename: null;
    if(!!req.files['avatar'] && (!!req.files['bgImage'] || req.body.bgImage !== undefined)){
        console.log('Both');
        return {...req.body, avatar, image: bgImage};
    } else if(!!req.files['avatar']){
        console.log('avatar');
        return {...req.body, avatar};
    } else if(!!req.files['bgImage'] || req.body.bgImage !== undefined){
        console.log('bgImage');
        return {...req.body, image: bgImage};
    } else {
        console.log('None');
        return req.body;
    }
}

const findUserByUsername = async (username) => {
    const user = await db.User.findOne({
        where: {username},
        attributes: { exclude: ['email', 'password', 'date_of_birth', 'createdAt', 'updatedAt'] },
        raw: true
    });
    if(!user){
        return null;
    }
    // return await avatarUrlToData(user);
    return user;
}

const getIsFollowed = async (user, user_id) => {
    const following = await db.Following.findOne({ 
        where : {
            user_id: user.id,
            follower_id: user_id
        }
    });
    return !!following;
}

const findUserById = async (id) => {
    const user = await db.User.findOne({ where: {id}, attributes: ['id', 'display_name', 'username', 'avatar'], raw: true});
    if(!user){
        return false;
    }
    // return await avatarUrlToData(user);
    return user;
}

const followUserProfile = async (user_id, follower_id) => {
    return await db.Following.create({user_id, follower_id, followed_at: new Date()});
}

const incrementFollowerCount = async (id) => {
    const [noOfRows, [updatedUser]] = await db.User.update(
        {follower_count: db.Sequelize.literal('follower_count + 1')},
        {where: {id}, returning: true}
    );
    return updatedUser.follower_count;
}

const incrementFollowingCount = async (id) => {
    const [noOfRows1, [updatedFollower]] = await db.User.update(
        {following_count: db.Sequelize.literal('following_count + 1')},
        {where: {id}, returning: true}
    );
    return updatedFollower.following_count;
}

const unfollowUserProfile = async (user_id, follower_id) => {
    return await db.Following.destroy({where: {user_id, follower_id}});
}

const decrementFollowerCount = async (id) => {
    const [noOfRows, [updatedUser]] = await db.User.update(
        {follower_count: db.Sequelize.literal('follower_count - 1')},
        {where: {id}, returning: true}
    );
    return updatedUser.follower_count;
}

const decrementFollowingCount = async (id) => {
    const [noOfRows1, [updatedFollower]] = await db.User.update(
        {following_count: db.Sequelize.literal('following_count - 1')},
        {where: {id}, returning: true}
    );
    return updatedFollower.following_count;
}

const getSearchedUser = async (query) => {
    const userList = await db.User.findAll({
        where: {
            [Op.or]: [
                { username: { [Op.iLike]: `%${query}%` }},
                { display_name: { [Op.iLike]: `%${query}%` }} 
            ], 
        },
        attributes: ['id', 'display_name', 'avatar', 'username']
    });
    return await Promise.all(
        userList.map(async User => {
            const rawUser = removeCircularReference(User);
            // return await avatarUrlToData(rawUser);
            return rawUser;
    }));
}

module.exports = {createUser, findAndUpdateUserProfile, populateUserData, findUserByUsername, getIsFollowed, findUserById, followUserProfile, incrementFollowerCount, incrementFollowingCount, unfollowUserProfile, decrementFollowerCount, decrementFollowingCount, getSearchedUser}