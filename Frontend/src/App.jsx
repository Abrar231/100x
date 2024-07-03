import Button from './components/Button'
import login100Lg from './assets/images/login-100-lg.svg'
import loginXLg from './assets/images/login-x-lg.svg'

import login100 from './assets/images/login-100.svg'
import loginX from './assets/images/login-x.svg'
import { Navigate, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Step1 from './components/Signup/Step1'
import { getIsAuthenticated } from './services/authservice'
import LoadingIcon from './components/LoadingIcon'


function App() {
  const step1Ref = useRef(null);
  const [User, setUser] = useState({name: "", email: "", "date of birth": "", day: "", month: "", year: "", password: ""});

  const handleOpenDialog = () => {
    step1Ref.current.showModal();
  }
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const getAuth = async () => {
      const response = await getIsAuthenticated();
      console.log('After getIsAuthenticated call');
      if(response.isAuthenticated){
        console.log('Setting IsAuthenticated true');
        setIsAuthenticated(true);
      } else {
        console.log('Setting IsAuthenticated false');
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    }
    getAuth();

  }, []);

  const handleSignIn = () => {
    navigate("/login");
  }

  return (
    isLoading? 
        (
          <div className='h-screen w-screen bg-black flex justify-center items-center'>
            <LoadingIcon />
          </div>
        ) :
        (!isAuthenticated? 
          <>
            <div className="absolute lg:hidden flex w-full py-3 px-4 justify-center items-baseline">
              <img className="w-10 h-[18px]" src={login100} />
              <img className="h-[13px] w-3 " src={loginX} />
            </div>
            <div className="bg-black w-screen h-screen flex items-center justify-center gap-24 lg:gap-14">
              <div className="hidden lg:block">
                <div className="flex w-full py-3 px-4 justify-center items-baseline ">
                  <img src={login100Lg} />
                  <img src={loginXLg} />
                </div>
              </div>
              <div className="flex w-390 py-0 px-7 flex-col items-start gap-10">
                <div className="flex flex-col items-start gap-3 self-stretch">
                  <div className="self-stretch text-neutral-50 text-[31px] font-extrabold">Happening Now</div>
                  <div className="text-neutral-50 font-medium clig-liga-off">Join today.</div>
                </div>
                <Button size="lg" variant="white" textColor="black" onClick={handleOpenDialog} >
                  Create account
                </Button>
                {/* {createPortal(<Step1 ref={step1Ref} handleStep1={handleStep1} step2Ref={step2Ref} />, document.getElementById('root'))} */}
                {createPortal(<Step1 ref={step1Ref} User={User} setUser={setUser} />, document.getElementById('root'))}
                <div className="flex justify-center items-center gap-1 self-stretch text-neutral-50 before:bg-neutral-700 after:bg-neutral-700 before:h-px after:h-px before:w-full after:w-full">
                  or
                </div>
                <div className="flex flex-col items-start gap-5 self-stretch">
                  <div className="text-neutral-50 font-[15px] ">
                    Already have an account?
                  </div>
                  {/* {createPortal(<Login1 ref={loginRef} handleLogin={handleSignIn} User={User} setUser={setUser} />, document.getElementById('root'))} */}
                  <Button size="lg" variant="outline" textColor="blue" onClick={handleSignIn}>
                    Sign in
                  </Button>
                </div>
              </div>
            </div>
          </>:
          <Navigate to="/home" replace />
        )
)

}

export default App
