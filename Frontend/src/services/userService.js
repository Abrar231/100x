import { apiUrl } from "../../config";
import { avatarDataToUrl } from "./util";

export const createUser = async (User) => {
    const months = [null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
    const {name, email, day, month, year} =  User;
    try {            
        const username = email.substring(0, email.indexOf('@'));
        const response = await fetch(`${apiUrl}/api/profile/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, email, dob: `${year}-${months.indexOf(month)}-${day}`, password: User.password, username}),
            credentials: 'include'
        });
        if(!response.ok){
            // console.log(response);
            throw new Error('Error while creating new User');
        }
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = async (formData) => {
    try {
        // const {display_name, bio, location, link} = formData.profile;
        // const boundary = 'abcd1234';
        const response = await fetch(`${apiUrl}/api/profile/updateProfile`, {
        // const updatedUser = await fetch(`${BASE_URL}/updateProfile`, {
            method: 'POST',
            // headers: {
            //     // 'Content-Type': `multipart/form-data; boundary=${boundary}`,
            //     "Content-Type": `multipart/form-data`,
            // },
            body: formData,
            credentials: 'include'
        });
        const updatedUser = await response.json();

        // const User = avatarDataToUrl(updatedUser.User);
        return {...updatedUser, User: updatedUser.User};

        // const {avatar, image} = updatedUser.User;
        // const avatarUrl = avatar? `data:image/${avatar.ext};base64,${avatar.data}`: null;
        // const imageUrl = image? `data:image/${image.ext};base64,${image.data}`: null;
        // return {...updatedUser, 
        //     User: {
        //         ...updatedUser, avatar: avatarUrl, image: imageUrl
        //     }
        // };
    } catch (error) {
        console.log(error);
    }
}

export const getProfile = async (username) => {
    try {
        const response = await fetch(`${apiUrl}/api/profile/username/${username}`, {credentials: 'include'});
        // const profile = await fetch(`${BASE_URL}/profile/${username}?user_id=8`);

        const profile = await response.json();
        if(profile.error){
            return profile;
        }
        // return avatarDataToUrl(profile);
        return profile;

        // const {avatar, image, ...profileJson} = await profile.json();
        // const avatarUrl = avatar? `data:image/${avatar.ext};base64,${avatar.data}`: null;
        // const imageUrl = image? `data:image/${image.ext};base64,${image.data}`: null;
        // return {avatar: avatarUrl, image: imageUrl, ...profileJson};
    } catch (error) {
        console.log(error);
    }
}

export const getProfileById = async () => {
    try {
        const response = await fetch(`${apiUrl}/api/profile/profileById`, {credentials: 'include'});
        // const profile = await fetch(`${BASE_URL}/profileById?user_id=8`);
        // if(!profile.ok){
        //     throw new Error('Unauthorized user');
        // }

        const profile = await response.json();
        // return avatarDataToUrl(profile);
        return profile;

        // const {avatar, ...profileJson} = await profile.json();
        // const avatarUrl = avatar? `data:image/${avatar.ext};base64,${avatar.data}`: null;
        // return {avatar: avatarUrl, ...profileJson};
    } catch (error) {
        console.log(error);
    }
}

export const followUser = async (user_id) => {
    try {
        const followed = await fetch(`${apiUrl}/api/profile/follow`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({user_id}),
            credentials: 'include'
        });
        // if(!followed){
        //     throw new Error('Error while following user with id: ' + user_id)
        // }
        return await followed.json();
    } catch (error) {
        console.log(error);
    }
}

export const unfollowUser = async (user_id) => {
    try {
        const unfollowed = await fetch(`${apiUrl}/api/profile/unfollow`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({user_id}),
            credentials: 'include'
        });
        if(!unfollowed){
            throw new Error('Error while unfollowing user with id: ' + user_id)
        }
        return await unfollowed.json();
    } catch (error) {
        console.log(error);
    }
}

export const searchUser = async (query) => {
    try {
        const response = await fetch(`${apiUrl}/api/profile/search?q=${query}`, {credentials: 'include'});
        const userList = await response.json();
        if(!Array.isArray(userList)){
            return userList;
        }
        // const users = userList.map(User => avatarDataToUrl(User));
        return userList;
    } catch (error) {
        console.log(error);
    }
}

export const isEmailAvailable = async (email) => {
    const response = await fetch(`${apiUrl}/api/emailAvailable?email=${email}`, {credentials: 'include'})
    return await response.json();
}