import { useEffect, useState } from 'react'
import { getIsAuthenticated } from '../services/authservice';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'
import LoadingIcon from './LoadingIcon';

const PrivateRoute = ({component}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const getAuth = async () => {
            const response = await getIsAuthenticated();
            setIsAuthenticated(response.isAuthenticated);
            setIsLoading(false);
        }
        getAuth();

    }, []);

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
    component: PropTypes.object,
}

export default PrivateRoute;