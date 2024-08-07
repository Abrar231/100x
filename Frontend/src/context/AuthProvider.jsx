import { useState } from 'react'
import { AuthContext } from './AuthContext'
import PropTypes from 'prop-types'

export function AuthProvider ({ children }) {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    return (
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node
}