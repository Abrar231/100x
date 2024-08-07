import CloseDialogButton from '../CloseDialogButton'
import Input from '../Input'
import Button from '../Button'
import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import { createUser } from '../../services/userService'
import { useNavigate } from 'react-router-dom'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

// eslint-disable-next-line react/display-name
const Step4 = forwardRef(({  User, setUser }, ref) => {
    const navigate = useNavigate();

    return(
        <dialog ref={ref} className="bg-black w-full md:w-390 h-824 md:h-[440px]  rounded-2xl backdrop:bg-blue-wash">
            {
                ref.current && ref.current.open && <Formik
                    initialValues={{
                        password: '',
                    }}
                    validationSchema={Yup.object({
                        password: Yup.string()
                            .matches(
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                                'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number'
                            )
                            .required('Required'),
                            // min 8 characters, alphanumeric, atleast 1 capital case
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {            
                            const user = await createUser({...User, ...values});
                            if(user.success){
                                ref.current.close();
                                navigate('/login');
                                setSubmitting(false);
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    }}
                >
                    {({isValid}) => {
                        return <Form>
                            <div className="flex w-full h-824 md:h-[440px] pt-0 pb-5 px-[15px] flex-col items-start gap-3 shrink-0 rounded-2xl">
                                <div className="flex py-3 px-0 items-center gap-5 self-stretch">
                                    <CloseDialogButton User={User} setUser={setUser} element={ref} />
                                    <span className="text-neutral-50 text-[15px] font-bold">
                                    Step 4 of 4
                                    </span>
                                </div>
                                <div className="flex flex-col items-start gap-10 self-stretch">
                                    <div className="flex flex-col items-start gap-2 self-stretch">
                                        <div className="text-neutral-50 text-2xl font-bold">
                                            You’ll need a password
                                        </div>
                                        <div className="self-stretch text-neutral-500 text-sm">
                                            Make sure it’s 8 characters or more
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-3 self-stretch">
                                        <Field component={Input} label="Password" type="password" name='password' />
                                    </div>
                                </div>
                                <div className="flex pt-20 flex-col justify-end items-center gap-5 grow shrink-0 basis-0 self-stretch">
                                    <Button size="lg" variant="white" textColor="black" type='submit' disabled={!isValid} >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    }}
                </Formik>
            }
        </dialog>
    )
});

Step4.propTypes = {
    User: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired,
}

export default Step4