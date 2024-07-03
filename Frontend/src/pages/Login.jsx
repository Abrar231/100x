import { useEffect, useState } from 'react';
import Login1 from '../components/Login/Login1';
import { createPortal } from 'react-dom';
import { Navigate } from 'react-router-dom';
import { getIsAuthenticated } from '../services/authservice';
import LoadingIcon from '../components/LoadingIcon';

const Login = () => {
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
        (!isAuthenticated? 
            <div className=' h-screen bg-black flex justify-center items-center'>
                {createPortal(<Login1 />, document.getElementById('root').firstElementChild)}
            </div>:
            <Navigate to="/home" replace />
        )
    )
}

export default Login;