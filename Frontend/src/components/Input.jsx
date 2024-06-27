import PropTypes from 'prop-types'
import greenTick from '../assets/images/create-account-2-signup-mdi-tick-circle.svg'
import singupEye2 from '../assets/images/create-account-4-signup-eye.svg'
import { useField, useFormikContext } from 'formik'
import { useEffect, useState } from 'react'
import { isEmailAvailable } from '../services/userService'

// const Input = ({label, type, User, setUser, ...rest }) => {
const Input = ({label, type, ...props }) => {
    // style={{color: 'rgb(239, 243, 244)'}}
    const [showPassword, setShowPassword] = useState(false);
    const handleClick = (e) => {
        e.stopPropagation();
        setShowPassword(!showPassword)
    }
    const typeObj = {
        greenTick: <img src={greenTick} className="absolute top-4 right-3" alt="tick" />,
        password: 
            <button className="absolute top-4 right-3 " onClick={handleClick} >
                {!showPassword && <img src={singupEye2} className="h-6 w-6" alt="tick" />}
                {showPassword && <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 " ><g><path fill='rgb(239, 243, 244)' d="M3.693 21.707l-1.414-1.414 2.429-2.429c-2.479-2.421-3.606-5.376-3.658-5.513l-.131-.352.131-.352c.133-.353 3.331-8.648 10.937-8.648 2.062 0 3.989.621 5.737 1.85l2.556-2.557 1.414 1.414L3.693 21.707zm-.622-9.706c.356.797 1.354 2.794 3.051 4.449l2.417-2.418c-.361-.609-.553-1.306-.553-2.032 0-2.206 1.794-4 4-4 .727 0 1.424.192 2.033.554l2.263-2.264C14.953 5.434 13.512 5 11.986 5c-5.416 0-8.258 5.535-8.915 7.001zM11.986 10c-1.103 0-2 .897-2 2 0 .178.023.352.067.519l2.451-2.451c-.167-.044-.341-.067-.519-.067zm10.951 1.647l.131.352-.131.352c-.133.353-3.331 8.648-10.937 8.648-.709 0-1.367-.092-2-.223v-2.047c.624.169 1.288.27 2 .27 5.415 0 8.257-5.533 8.915-7-.252-.562-.829-1.724-1.746-2.941l1.438-1.438c1.53 1.971 2.268 3.862 2.33 4.027z"></path></g></svg>}
            </button>
    }

    const { setFieldError } = useFormikContext();
    const [field, meta] = useField(props);

    // const handleOnChange = (e) => {
    //     setUser({ ...User, [label.toLowerCase()]: e.target.value})
    // }
    // console.log("Props of Input for " + label + " : " + JSON.stringify(props));
    // console.log(`Meta for Input ${label}: ${JSON.stringify(meta)}`);
    // console.log(`Field for Input ${label}: ${JSON.stringify(field)}`);

    useEffect(() => {
        if(field.name === 'email' && field.value && (!meta.error || meta.error === 'Email has already been taken.')){
          const getData = setTimeout(async () => {
            const response = await isEmailAvailable(field.value);
            if(!response.valid){
                // validation error
                // Check how to add custom error while using async operation
                setFieldError('email', 'Email has already been taken.');
            } else {
                setFieldError('email', '');
            }
          }, 1000);
      
          return () => clearTimeout(getData)
        }
    }, [field.value ]);

    return (
        <div className="relative self-stretch">
            <input
                type={type==="password"? (!showPassword? 'password': 'text'): "text"}
                className={`text-input peer flex w-full py-4 px-3 items-center gap-2.5 rounded border font-inter border-neutral-500 text-neutral-50 text-lg placeholder:neutral-500 placeholder:text-lg bg-black focus:justify-between focus:border-twitter-blue focus:ring-0 focus:outline-none text-input ${meta.touched && meta.error && 'border-red-600 focus:border-red-600'}`}
                placeholder={label} {...field} {...props} />
            <label className={`text-neutral-500 font-inter peer-focus:text-twitter-blue text-xs font-medium p-1 m-4 absolute -top-7 bg-black ${meta.touched && meta.error && 'text-red-600 peer-focus:text-red-600'}`}>
                {label}
            </label>
            {/* {typeObj[type] && <img src={typeObj[type]} className="absolute top-4 right-3" alt="tick" />} */}
            {typeObj[type]}
            {meta.touched && meta.error && (
                <div className="error font-medium text-xs text-red-600">{meta.error}</div>
            )}
        </div>
    )

    // return (
    //     <div className="relative self-stretch">
    //         <input type={type==="password"? "password": "text"} onChange={handleOnChange} className="peer flex w-full py-4 px-3 items-center gap-2.5 rounded border font-inter border-neutral-500 text-neutral-50 text-lg placeholder:neutral-500 placeholder:text-lg bg-black focus:justify-between focus:border-twitter-blue 
    //                 focus:ring-0 focus:outline-none text-input" placeholder={label} defaultValue={User[label.toLowerCase()] ? User[label.toLowerCase()] : ""} {...rest} />
    //         <label className="text-neutral-500 font-inter peer-focus:text-twitter-blue text-xs font-medium p-1 m-4 absolute -top-7 bg-black">
    //             {label}
    //         </label>
    //         {typeObj[type] && <img src={typeObj[type]} className="absolute top-4 right-3" alt="tick" />}
    //     </div>
    // )
}

Input.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    // User: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    // setUser: PropTypes.func,
}

export default Input;