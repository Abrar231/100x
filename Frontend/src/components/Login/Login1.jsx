import { forwardRef, useContext } from 'react'
import login100 from '../../assets/images/login-100.svg'
import loginX from '../../assets/images/login-x.svg'
import CloseDialogButton from '../CloseDialogButton'
import Input from '../Input'
import PropTypes from 'prop-types'
import Button from '../Button'
import { userLogin } from '../../services/authservice'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { AuthContext } from '../../context/AuthContext'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

// eslint-disable-next-line react/display-name
const Login1 =forwardRef(({User, setUser,}, ref) => {
    const {setLoggedInUser} = useContext(UserContext);
    const {setIsLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();

    // const handleLogin = async () => {
    //     try {
    //         const response = await userLogin(User.email, User.password);
    //         if(response){
    //             console.log("Successful Login Response: " + JSON.stringify(response));
    //             setLoggedInUser({...response.User});
    //             setIsLoggedIn(true);
    //             navigate('/home');
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }

    // }

    return (
        // <div className='flex justify-center items-center h-screen'>
            <dialog open className='backdrop:bg-blue-wash bg-black rounded-2xl'>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        // name: '',
                        // // 'date of birth': '',
                        // day: '',
                        // month: '',
                        // year: '',
                    }}
                    // {name: "", email: "", "date of birth": "", day: "", month: "", year: "", password: ""}
                    validationSchema={Yup.object({
                        email: Yup.string()
                            .max(50, 'Must be 50 characters or less')
                            .required('Required'),
                        password: Yup.string()
                            .matches(
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                                'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number'
                            )
                            .required('Required'),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            const response = await userLogin(values.email, values.password);
                            if(response){
                                // console.log("Successful Login Response: " + JSON.stringify(response));
                                setLoggedInUser({...response.User});
                                setIsLoggedIn(true);
                                navigate('/home');
                                setSubmitting(false);
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    }}
                >
                    {({isValid}) => {
                        return <Form>
                            <div className="flex flex-col justify-center items-center w-full md:w-390 h-screen md:h-[620px] ">
                                <div className="flex p-4 justify-around self-stretch shrink-0">
                                    <div className="min-w-[56px] items-start basis-1/2 self-stretch shrink justify-center">
                                        <CloseDialogButton User={User} setUser={setUser} ref={ref} />
                                    </div>
                                    <div className="flex shrink grow items-center">
                                        <div className='flex items-end'>
                                            <img className="w-10 h-[18px]" src={login100} />
                                            <img className="h-[13px] w-3 " src={loginX} />
                                        </div>
                                    </div>
                                    <div className="min-w-[56px] basis-1/2 items-end self-stretch shrink grow"></div>
                                </div>
                                <div className='flex flex-col md:h-full h-[620px] max-w-sm'>
                                    <div className='flex justify-evenly flex-col px-10 grow'>
                                        <h1 className=' text-white text-3xl'>Sign in to 100X</h1>
                                        <Input label='Email' type='text' name='email' />
                                        <Input label='Password' type='password' name='password' />
                                        <Button size='lg' variant='blue' textColor='white' type='submit' disable={!isValid} >
                                            Log in
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    }}
                </Formik>
            </dialog>
        // </div>
      )
});

Login1.propTypes = {
    User: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    setUser: PropTypes.func,
}

export default Login1