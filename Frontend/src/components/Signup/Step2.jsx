import CloseDialogButton from '../CloseDialogButton'
import Input from '../Input'
import Button from '../Button'
import PropTypes from 'prop-types'
import { forwardRef, useRef } from 'react'
// import Step3 from './Step3'
import { createPortal } from 'react-dom'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import Step4 from './Step4'

// eslint-disable-next-line react/display-name
const Step2 = forwardRef(({  User, setUser, }, ref) => {
    const step3Ref = useRef(null);

    // const handleStep2 = () => {
    //     console.log(User);
    //     ref.current.close();
    //     step3Ref.current.showModal();
    // }

    
    return (
        <dialog ref={ref} className="bg-black w-full md:w-390 h-824 md:h-[508px]  rounded-2xl backdrop:bg-blue-wash">
            {ref.current && ref.current.open && <Formik
                initialValues={{
                    name: User.name,
                    email: User.email,
                    'date of birth': User['date of birth'],
                    // day: '',
                    // month: '',
                    // year: '',
                    // password: '',
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(50, 'Must be 50 characters or less')
                        .required('Required'),
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Required'),
                    'date of birth': Yup.string()
                        .required('Required'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    ref.current.close();
                    step3Ref.current.showModal();
                    setSubmitting(false);
                }}
            >
                {({isValid}) => {
                    return <Form>
                        <div className="flex w-full h-824 md:h-[508px] pt-0 pb-5 px-[15px] flex-col items-start gap-3 shrink-0">
                            <div className="flex py-3 px-0 items-center gap-5 self-stretch">
                                <CloseDialogButton User={User} setUser={setUser} element={ref} />
                                <span className="text-neutral-50 text-[15px] font-bold">Step 2 of 4</span>
                            </div>
                            <div className="flex flex-col items-start gap-5 self-stretch">
                                <div className="text-neutral-50 text-2xl font-bold">
                                Create your account
                                </div>
                                <div className="flex flex-col items-center gap-8 self-stretch">
                                    <Input label="Name" type="greenTick" name='name' />
                                    <Input label="Email" type="greenTick" name='email' />
                                    <Input label="Date of birth" type="greenTick" name='date of birth' />
                                </div>
                            </div>
                            <div className="flex pt-16 md:pt-0 flex-col justify-end items-center gap-5 grow shrink-0 basis-0 self-stretch">
                                <Button size="lg" variant="blue" textColor="white" type='submit' disable={!isValid}>
                                    Sign up
                                </Button>
                                {createPortal(<Step4 ref={step3Ref} User={User} setUser={setUser} />, document.getElementById('root'))}
                            </div>
                        </div>
                    </Form>
                }}
            </Formik>}
        </dialog>
    )
});

Step2.propTypes = {
    // handleStep2: PropTypes.func,
    // step3Ref: PropTypes.object.isRequired,
    User: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired,
    // isStep2Open: PropTypes.bool.isRequired,
    // setIsStep2Open: PropTypes.func.isRequired,
}

export default Step2