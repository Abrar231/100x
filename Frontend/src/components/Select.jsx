import PropTypes from 'prop-types'
import signupChevronDown from '../assets/images/create-account-1-signup-chevron-down.svg'
import { useField } from 'formik'

// const Select = ({ label, size = "sm", options, User, setUser }) => {
const Select = ({ label, size = "sm", options, ...props }) => {
    const sizeStyles = {
        sm: "grow",
        lg: "grow-[2]",
    }

    const [field] = useField(props);

    // const handleOnChange = (e) => {
    //     setUser({...User, [label.toLowerCase()]: e.target.value })
    // }
    // console.log("Props of Select for " + label + " : " + JSON.stringify(props));
    // console.log(`Meta for Select ${label}: ${JSON.stringify(meta)}`);


    return (
        <div className={"flex self-stretch relative " + sizeStyles[size]}>
            <select className="appearance-none flex h-14 justify-between items-center w-full rounded border border-neutral-500 bg-black text-neutral-50 pl-3" {...field} {...props} >
                {options.map((option, i) => <option className="text-neutral-50" value={option} key={i}>{option}</option>)}
            </select>
            <label className="text-neutral-500 text-xs font-medium absolute left-3 -top-2 bg-black px-1" >{label}</label>
            <img className="absolute top-4 right-3" src={signupChevronDown} />
            {/* {meta.touched && meta.error && (
                <div className="error  font-medium text-xs text-red-600">{meta.error}</div>
            )} */}
        </div>
    )

    // return (
    //     <div className={"flex self-stretch relative " + sizeStyles[size]}>
    //         <select className="appearance-none flex h-14 justify-between items-center w-full rounded border border-neutral-500 bg-black text-neutral-50 pl-3" onChange={handleOnChange} >
    //             {options.map((option, i) => <option className="text-neutral-50" value={option} key={i}>{option}</option>)}
    //         </select>
    //         <label className="text-neutral-500 text-xs font-medium absolute left-3 -top-2 bg-black px-1" >{label}</label>
    //         <img className="absolute top-4 right-3" src={signupChevronDown} />
    //     </div>
    // )
}

Select.propTypes = {
    label: PropTypes.string.isRequired,
    size: PropTypes.oneOf(["sm", "lg"]),
    options: PropTypes.array.isRequired,
    // User: PropTypes.object.isRequired,
    // setUser: PropTypes.func.isRequired,
}

export default Select;