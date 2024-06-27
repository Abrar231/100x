import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import PropTypes from 'prop-types'
// import profileAvatar from '../assets/images/profile-user-avatar.png'
// import profileImage from '../assets/images/profile-image.png'
import { getProfileById } from "../services/userService";

export function UserProvider({children}) {
    const [loggedInUser, setLoggedInUser] = useState({ display_name : "", username: "", avatar: "",});
    useEffect(() => {
        (async ()=> {
            const user = await getProfileById();
            setLoggedInUser({...user});
        })();
    }, []);

    return (
        <UserContext.Provider value={{loggedInUser, setLoggedInUser}}>
            {children}
        </UserContext.Provider>
    )
}

UserProvider.propTypes = {
    children: PropTypes.node
}