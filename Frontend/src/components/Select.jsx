import PropTypes from 'prop-types'
import signupChevronDown from '../assets/images/create-account-1-signup-chevron-down.svg'

const Select = ({field, ...props}) => {
    const {label, size, options } = props;
    const sizeStyles = {
        sm: "grow",
        lg: "grow-[2]",
    }

    return (
        <div className={"flex self-stretch relative " + sizeStyles[size]}>
            <select {...field} {...props} className="appearance-none flex h-14 justify-between items-center w-full rounded border border-neutral-500 bg-black text-neutral-50 pl-3" >
                {options.map((option, i) => <option className="text-neutral-50" value={option} key={i}>{option}</option>)}
            </select>
            <label className="text-neutral-500 text-xs font-medium absolute left-3 -top-2 bg-black px-1" >{label}</label>
            <img className="absolute top-4 right-3" src={signupChevronDown} />
        </div>
    )
}

Select.propTypes = {
    field: PropTypes.object,
    form: PropTypes.object,
    label: PropTypes.string.isRequired,
    size: PropTypes.oneOf(["sm", "lg"]),
    options: PropTypes.array.isRequired,
}

export default Select;