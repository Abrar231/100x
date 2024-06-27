import { avatarDataToUrl } from "./util";

export const userLogin = async (email, password) => {
    try {
        // console.log('Inside userLogin');
        const response = await fetch(`/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password})
        });
        // console.log(response);
        if(!response.ok){
            throw new Error("Login Failed");
        }
        const loginResponse = await response.json();
        
        const User = avatarDataToUrl(loginResponse.User);
        return {...loginResponse, User};

        // const {avatar} = loginResponse.User;
        // const avatarUrl = avatar? `data:image/${avatar.ext};base64,${avatar.data}`: null;
        // return {...loginResponse, 
        //     User:{...loginResponse.User, avatar: avatarUrl}};
    } catch (error) {
        console.log(error)
    }
}

export const userLogout = async () => {
    try {
        const response = await fetch('/api/logout', {
            method: 'POST',
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
}

export const getIsAuthenticated = async () => {
    try {
        const response = await fetch('/api/auth');
        // const response = await fetch(`${BASE_URL}/auth`);
        return response.json();
    } catch (error) {
        console.log(error);
    }
}
