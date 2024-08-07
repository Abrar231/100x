import PropTypes from 'prop-types'
import greenTick from '../assets/images/create-account-2-signup-mdi-tick-circle.svg'
import singupEye2 from '../assets/images/create-account-4-signup-eye.svg'
import { useEffect, useState } from 'react'
import { isEmailAvailable } from '../services/userService'

const Input = ({field, form, ...props}) => {
    const {name, value} = field;
    const {label, type, validateEmail, setCustomErrors } = props;
    const {touched, errors, setFieldError} = form;
    const [showPassword, setShowPassword] = useState(false);
    const handleClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
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

    useEffect(() => {
        if(validateEmail && name === 'email' && value && (!errors[name] || errors[name] === 'Required' || errors[name] === 'Email has already been taken.')){
          const getData = setTimeout(async () => {
            const response = await isEmailAvailable(value);
            if(!response.valid){
                setFieldError('email', 'Email has already been taken.');
                setCustomErrors(err => {return {...err, email: 'Email has already been taken.'}});
            } else {
                if(errors[name] === 'Email has already been taken.'){
                    setFieldError('email', undefined);
                    setCustomErrors(err => {return {...err, email: undefined}});
                }
            }
          }, 1000);
      
          return () => clearTimeout(getData)
        }
    }, [value]);

    return (
        <div className="relative self-stretch">
            <input
                type={type==="password"? (!showPassword? 'password': 'text'): "text"} {...field}
                className={`text-input peer flex w-full py-4 px-3 items-center gap-2.5 rounded border font-inter border-neutral-500 text-neutral-50 text-lg placeholder:neutral-500 placeholder:text-lg bg-black focus:justify-between focus:border-twitter-blue focus:ring-0 focus:outline-none text-input ${touched[name] && errors[name] && 'border-red-600 focus:border-red-600'}`}
                placeholder={label} value={value || ''} 
            />
            <label className={`text-neutral-500 font-inter peer-focus:text-twitter-blue text-xs font-medium p-1 m-4 absolute -top-7 bg-black ${touched[name] && errors[name] && 'text-red-600 peer-focus:text-red-600'}`}>
                {label}
            </label>
            {typeObj[type]}
            {touched[name] && errors[name] && (
                <div className="error font-medium text-xs text-red-600">{errors[name]}</div>
            )}
        </div>
    )
}

Input.propTypes = {
    field: PropTypes.object,
    form: PropTypes.object,
    setCustomErrors: PropTypes.func,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    validateEmail: PropTypes.bool,
}

export default Input;