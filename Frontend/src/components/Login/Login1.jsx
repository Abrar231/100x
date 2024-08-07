import { useContext, useEffect, useRef, useState } from 'react'
import login100 from '../../assets/images/login-100.svg'
import loginX from '../../assets/images/login-x.svg'
import Input from '../Input'
import PropTypes from 'prop-types'
import Button from '../Button'
import { userLogin } from '../../services/authservice'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { AuthContext } from '../../context/AuthContext'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import PopupMessage from '../PopupMessage'

// eslint-disable-next-line react/display-name
const Login1 =() => {
    const [popup, setPopup] = useState({show: false, text: ''});
    const {setLoggedInUser} = useContext(UserContext);
    const {setIsLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const dialogRef = useRef(null);
    
    useEffect(() => {
        if(dialogRef){
            dialogRef.current.showModal();
        }
    }, [])

    return (
        <dialog ref={dialogRef} className=' bg-black rounded-2xl backdrop:bg-blue-wash'>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
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
                onSubmit={async (values, { setSubmitting, setValues, setErrors, setTouched }) => {
                    try {
                        const response = await userLogin(values.email, values.password);
                        if(response.message){
                            setLoggedInUser({...response.User});
                            setIsLoggedIn(true);
                            navigate('/home');
                        } 
                        if(response.error){
                            setPopup({show: true, text: 'Incorrect. Please try again.'});
                            setTimeout(() => {
                                setPopup({show: false, text:''});
                            }, 3000);
                            setValues({ email: '', password: '' });
                            setErrors({});
                            setTouched({});
                        }
                        setSubmitting(false);
                    } catch (error) {
                        setPopup({show: true, text: error});
                        setTimeout(() => {
                            setPopup({show: false, text:''});
                        }, 3000);
                    }
                }}
            >
                {({isValid}) => {
                    return <Form>
                        <div className="flex flex-col justify-center items-center w-full md:w-390 h-screen md:h-[620px] ">
                            <div className="flex p-10 justify-center grow self-stretch shrink-0">
                                <div className='flex items-end'>
                                    <img className="w-10 h-[18px]" src={login100} />
                                    <img className="h-[13px] w-3 " src={loginX} />
                                </div>
                            </div>
                            <div className='flex flex-col md:h-full h-[620px] max-w-sm'>
                                <div className='flex justify-evenly flex-col px-10 grow'>
                                    <h1 className=' text-white text-3xl'>Sign in to 100X</h1>
                                    <Field component={Input} label='Email' type='text' name='email' />
                                    <Field component={Input} label='Password' type='password' name='password' />
                                    <Button size='lg' variant='blue' textColor='white' type='submit' disabled={!isValid} >
                                        Log in
                                    </Button>
                                </div>
                            </div>
                        </div>
                        {popup.show && <PopupMessage text={popup.text} />}
                    </Form>
                }}
            </Formik>
        </dialog>
      )
}

Login1.propTypes = {
    setPopup: PropTypes.func,
}

export default Login1