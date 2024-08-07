import CloseDialogButton from '../CloseDialogButton'
import Input from '../Input'
import Button from '../Button'
import PropTypes from 'prop-types'
import { forwardRef, useRef, } from 'react'
import Step4 from './Step4'
import { createPortal } from 'react-dom'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

// eslint-disable-next-line react/display-name
const Step3 = forwardRef(({  User, setUser }, ref) => {
    const step4Ref = useRef(null);

    return(
        <dialog ref={ref} className="bg-black w-full md:w-390 h-824 md:h-[440px]  rounded-2xl backdrop:bg-blue-wash">
            {ref.current && ref.current.open && <Formik
                initialValues={{
                    verificationCode: ''
                }}
                validationSchema={Yup.object({
                    verificationCode: Yup.string()
                        .required('Required'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    ref.current.close();
                    step4Ref.current.showModal();
                    setSubmitting(false);
                }}
            >
                {({isValid}) => {
                    return <Form>
                        <div className="flex w-full h-824 md:h-[440px] pt-0 pb-5 px-[15px] flex-col items-start gap-3 shrink-0 rounded-2xl">
                            <div className="flex py-3 px-0 items-center gap-5 self-stretch">
                                <CloseDialogButton User={User} setUser={setUser} element={ref} />
                                <span className="text-neutral-50 text-[15px] font-bold">
                                Step 3 of 4
                                </span>
                            </div>
                            <div className="flex flex-col items-start gap-10 self-stretch">
                                <div className="flex flex-col items-start gap-2 self-stretch">
                                    <div className="text-neutral-50 text-2xl font-bold">
                                        We sent you a code
                                    </div>
                                    <div className="self-stretch text-neutral-500 text-sm">
                                        {`Enter it below to verify ${User.email}`}
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-3 self-stretch">
                                    <Field component={Input} label="Verification code" name='verificationCode' type='text' />
                                    <span className="text-twitter-blue text-sm">
                                        Didn’t receive a code?
                                    </span>
                                </div>
                            </div>
                            <div className="flex pt-20 flex-col justify-end items-center gap-5 grow shrink-0 basis-0 self-stretch">
                                <Button size="lg" variant="white" textColor="black" type='submit' disabled={!isValid} >
                                    Next
                                </Button>
                                {createPortal(<Step4 ref={step4Ref} User={User} setUser={setUser} />, document.getElementById('root'))}
                            </div>
                        </div>
                    </Form>
                }}
            </Formik>}
        </dialog>
    )
});

Step3.propTypes = {
    User: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired,
}

export default Step3