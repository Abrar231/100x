import CloseDialogButton from '../CloseDialogButton'
import Input from '../Input'
import Button from '../Button'
import PropTypes from 'prop-types'
import { forwardRef, useRef, useState, } from 'react'
import Step2 from './Step2'
import { createPortal } from 'react-dom'
import Select from '../Select'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup';

// eslint-disable-next-line react/display-name
const Step1 = forwardRef(({User, setUser}, ref) => {
    const step2Ref = useRef(null);
    const [customErrors, setCustomErrors] = useState({});

    const months = [null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
    const days = Array.from({ length: 32 }, (_, index) => index===0? null: index)
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 100 }, (_, index) => index===0? null: currentYear + 1 - index)

    // const handleStep1 = () => {
    //     setUser({...User, 'date of birth': `${User.day} ${User.month} ${User.year}`})
    //     ref.current.close();
    //     step2Ref.current.showModal();
    // }
    // console.log(`User: ${JSON.stringify(User)}`);
    // console.log(`ref.current: ${ref.current}`);
    // console.log(`ref.current.open: ${ref.current? ref.current.open: null}`);

    return (
        <dialog ref={ref} className="bg-black w-full md:w-390 md:h-[620px] rounded-2xl backdrop:bg-blue-wash">
            { <Formik
                initialValues={{
                    name: '',
                    email: '',
                    // 'date of birth': '',
                    day: '',
                    month: '',
                    year: '',
                    // password: '',
                }}
                // {name: "", email: "", "date of birth": "", day: "", month: "", year: "", password: ""}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(50, 'Must be 50 characters or less')
                        .required('Required'),
                    email: Yup.string()
                        .email('Invalid email address')
                        .test('checkIsEmailAvailable', 'Email has already been taken.', () => !customErrors.email)
                        // test return true for no error and false for error
                        .required('Required'),
                    day: Yup.number()
                        .required('Required'),
                    month: Yup.string()
                        .required('Required'),
                    year: Yup.number()
                        .required('Required'),
                })}
                // validateOnBlur={false}
                onSubmit={(values, { setSubmitting }) => {
                    // console.log('Handling onSubmit');
                    // console.log(`Values returned by formik: ${JSON.stringify(values)}`)
                    // console.log(`Result: ${errors}`);
                    setUser({...User, ...values, 'date of birth': `${values.day} ${values.month} ${values.year}`});
                    // setIsStep2Open(true);
                    ref.current.close();
                    step2Ref.current.showModal();
                    setSubmitting(false);
                }}
            >
                {({isValid}) => 
                    <Form>
                        <div className="flex pt-0 pb-5 px-4 flex-col items-start gap-3 shrink-0">
                            <div className="flex py-3 px-0 items-center gap-5 self-stretch text-neutral-50">
                                <CloseDialogButton User={User} setUser={setUser} element={ref} />
                                <span className="text-[15px] font-bold">Step 1 of 4</span>
                            </div>
                            <div className="flex flex-col items-start gap-5 self-stretch">
                                <div className="text-neutral-50 text-2xl font-bold">
                                    Create your account
                                </div>
                                <div className="flex flex-col items-center gap-8 self-stretch">
                                    <Field component={Input} label="Name" name='name' type='text' />
                                    <Field component={Input} validateEmail setCustomErrors={setCustomErrors} label="Email" name='email' type='text' />
                                    <div className="flex flex-col items-start gap-2 self-stretch">
                                        <span className="text-neutral-50 text-[15px] font-bold">
                                        Date of birth
                                        </span>
                                        <span className="self-stretch text-white/60 text-sm">
                                        This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 self-stretch">
                                        <Field component={Select} size="lg" label="Month" options={months} name='month' />
                                        <Field component={Select} size="sm" label="Day" options={days} name='day' />
                                        <Field component={Select} size="sm" label="Year" options={years} name='year' />
                                    </div>
                                </div>
                            </div>
                            <div className="flex pt-16 pb-0 px-5 flex-col justify-end items-center gap-2.5 grow shrink-0 basis-0 self-stretch">
                                <Button variant="white" size="lg" textColor="black" type='submit'  disabled={!isValid} >
                                    Create account
                                </Button>
                                {createPortal(<Step2 ref={step2Ref} User={User} setUser={setUser} />, document.getElementById('root'))}
                                {/* {createPortal(<Step2 ref={step2Ref} handleStep2={handleStep2} step3Ref={step3Ref} User={User} setUser={setUser} />, document.getElementById('root'))} */}
                            </div>
                        </div>
                    </Form>
                }
            </Formik>}
        </dialog>
    )
    

    // return (
    //     <dialog ref={ref} className="bg-black w-full md:w-390 md:h-[620px] rounded-2xl backdrop:bg-blue-wash">
    //         <div className="flex pt-0 pb-5 px-4 flex-col items-start gap-3 shrink-0">
    //             <div className="flex py-3 px-0 items-center gap-5 self-stretch text-neutral-50">
    //                 <CloseDialogButton User={User} setUser={setUser} element={ref} />
    //                 <span className="text-[15px] font-bold">Step 1 of 4</span>
    //             </div>
    //             <div className="flex flex-col items-start gap-5 self-stretch">
    //                 <div className="text-neutral-50 text-2xl font-bold">
    //                     Create your account
    //                 </div>
    //                 <div className="flex flex-col items-center gap-8 self-stretch">
    //                     <Input label="Name" User={User} setUser={setUser} required />
    //                     <Input label="Email" User={User} setUser={setUser} required />
    //                     <div className="flex flex-col items-start gap-2 self-stretch">
    //                         <span className="text-neutral-50 text-[15px] font-bold">
    //                         Date of birth
    //                         </span>
    //                         <span className="self-stretch text-white/60 text-sm">
    //                         This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.
    //                         </span>
    //                     </div>
    //                     <div className="flex items-center gap-3 self-stretch">
    //                         <Select size="lg" label="Month" options={months} User={User} setUser={setUser} />
    //                         <Select size="sm" label="Day" options={days} User={User} setUser={setUser} />
    //                         <Select size="sm" label="Year" options={years} User={User} setUser={setUser} />
    //                     </div>
    //                 </div>
    //             </div>
    //             <div className="flex pt-16 pb-0 px-5 flex-col justify-end items-center gap-2.5 grow shrink-0 basis-0 self-stretch">
    //                 <Button variant="white" size="lg" textColor="black" onClick={handleStep1}>
    //                     Create account
    //                 </Button>
    //                 {createPortal(<Step2 ref={step2Ref} User={User} setUser={setUser} />, document.getElementById('root'))}
    //                 {/* {createPortal(<Step2 ref={step2Ref} handleStep2={handleStep2} step3Ref={step3Ref} User={User} setUser={setUser} />, document.getElementById('root'))} */}
    //             </div>
    //         </div>
    //     </dialog>
    // )
})

Step1.propTypes = {
    // handleStep: PropTypes.func,
    // step2Ref: PropTypes.object.isRequired,
    User: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired,
}

export default Step1