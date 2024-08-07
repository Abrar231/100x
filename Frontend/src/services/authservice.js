import { apiUrl } from "../../config";

export const userLogin = async (email, password) => {
    try {
        const response = await fetch(`${apiUrl}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password}),
            credentials: 'include'
        });
        return await response.json();
    } catch (error) {
        console.log(error)
    }
}

export const userLogout = async () => {
    try {
        const response = await fetch(`${apiUrl}/api/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

export const getIsAuthenticated = async () => {
    try {
        const response = await fetch(`${apiUrl}/api/auth`, {
            credentials: 'include'
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}
