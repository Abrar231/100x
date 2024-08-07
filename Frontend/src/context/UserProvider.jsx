import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import PropTypes from 'prop-types'
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