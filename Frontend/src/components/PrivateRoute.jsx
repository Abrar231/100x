import { useEffect, useState } from 'react'
import { getIsAuthenticated } from '../services/authservice';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types'
import LoadingIcon from './LoadingIcon';

const PrivateRoute = ({component}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const getAuth = async () => {
            console.log(`Location pathname: ${location.pathname}`);
            const response = await getIsAuthenticated();
            setIsAuthenticated(response.isAuthenticated);
            setIsLoading(false);
        }
        getAuth();

    }, []);
    // console.log("isAuthenticated: " + isAuthenticated);

    return (
        isLoading? 
            (
                <div className='h-screen w-screen bg-black flex justify-center items-center'>
                    <LoadingIcon />
                </div>
            ) :
            (isAuthenticated? 
                component:
                <Navigate to="/login" replace />)
    )
}

PrivateRoute.propTypes = {
    component: PropTypes.func,
}

export default PrivateRoute;