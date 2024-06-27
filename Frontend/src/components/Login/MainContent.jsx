import PropTypes from 'prop-types'
import Button from '../Button'
import login100Lg from '../../assets/images/login-100-lg.svg'
import loginXLg from '../../assets/images/login-x-lg.svg'
import {useRef, useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Step1 from '../Signup/Step1'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'

const MainContent = ({handleOpenDialog, step1Ref }) => {
    

    return (
        <>
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
                    {createPortal(<Step1 ref={step1Ref} handleStep1={handleStep1} step2Ref={step2Ref} User={User} setUser={setUser} />, document.body)}
                    <div className="flex justify-center items-center gap-1 self-stretch text-neutral-50 before:bg-neutral-700 after:bg-neutral-700 before:h-px after:h-px before:w-full after:w-full">
                        or
                    </div>
                    <div className="flex flex-col items-start gap-5 self-stretch">
                        <div className="text-neutral-50 font-[15px] ">
                            Already have an account?
                        </div>
                        <Button size="lg" variant="outline" textColor="blue" onClick={handleSignIn}>
                            Sign in
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

MainContent.propTypes = {
    handleOpenDialog: PropTypes.func,
    step1Ref: PropTypes.object.isRequired,
}

export default MainContent