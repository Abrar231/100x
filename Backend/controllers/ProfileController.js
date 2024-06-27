const {createUser, findAndUpdateUserProfile, populateUserData, findUserByUsername, getIsFollowed, findUserById, followUserProfile, incrementFollowerCount, incrementFollowingCount, unfollowUserProfile, decrementFollowerCount, decrementFollowingCount, getSearchedUser} = require('../services/ProfileService.js');

const signup = async (req, res) => {
    try{
        const { name, email, dob, password, username } = req.body;
        const user = await createUser(name, email, dob, password, username);
        if(!user){
            return res.status(500).json({success: false, error: 'Error while creating user'});
        }
        res.status(200).json({success: true});
    }catch (e) {
        res.status(500).json({success: false, error: "Internal Error Occurred" + e});
    }

}

const updateProfile = async (req, res) => {
    try {
        const {user_id} = req.cookies;
        const data = populateUserData(req);
        const User = await findAndUpdateUserProfile(user_id, data);        
        
        res.status(200).json({
            message: 'Profile updated successfully',
            success: true,
            User,
        });
    } catch (error) {
        res.status(500).json({error: 'Error while updating user' + error, success: false});
    }
}

const getProfileByUsername = async (req, res) => {
    const username = req.params.username;
    const user_id = req.cookies.user_id;
    try {        
        const user = await findUserByUsername(username);
        const isFollowed = await getIsFollowed(user, user_id);
        if(!user){
            return res.status(404).send('User not found');
        }
        res.status(200).json({...user, isFollowed});
    } catch (error) {
        res.status(500).send('Internal Error' + error);
    }
}

const getProfileById = async (req, res) => {
    const id = req.cookies.user_id;
    try {
        const user = await findUserById(id);
        if(!user){
            return res.status(404).send('User not found');
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).send('Internal Error' + error);
    }
}

const followUser = async (req, res) => {
    const { user_id } = req.body; // Id of User whom to follow
    const { user_id: follower_id} = req.cookies; // Id of User who is following and is logged in
    try {
        const following = await followUserProfile(user_id, follower_id);
        if(!following.user_id){
            return res.status(500).json({success: false, error: 'Error while following the user.'})
        }

        // increment follower_count & following_count by 1
        const follower_count = await incrementFollowerCount(user_id);
        const following_count = await incrementFollowingCount(follower_id);

        res.status(200).json({success: true, follower_count, following_count});
    } catch (error) {
        res.status(500).json({success: false, error: 'Internal Error Occurred' + error});
    }
}

const unfollowUser = async (req, res) => {
    const { user_id } = req.body; // Id of User whom to follow
    const { user_id: follower_id} = req.cookies; // Id of User who is following and is logged in
    try {
        const unfollow = await unfollowUserProfile(user_id, follower_id);
        if(!unfollow){
            throw new Error('Error while unfollowing user');
        }

        // decrement follower_count & following_count by 1
        const follower_count = await decrementFollowerCount(user_id);
        const following_count = await decrementFollowingCount(follower_id);

        res.status(200).json({success: true, follower_count, following_count});
    } catch (error) {
        res.status(500).json({success: false, error: 'Internal Error Occurred' + error});
    }
}

const searchUsers = async (req, res) => {
    const {q: query} = req.query;
    try {
        if(!query){
            return res.status(400).send('Search query is empty');
        }
        const users = await getSearchedUser(query);
        if(users.length === 0){
            return res.status(200).json({message: 'No users found'})
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send('Internal Error Occurred '+ error);
    }
}

module.exports = {signup, updateProfile, getProfileByUsername, getProfileById, followUser, unfollowUser, searchUsers}