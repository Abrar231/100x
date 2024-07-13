import PropTypes from 'prop-types'

function Textarea({field, form, ...props}) {
    const {name, value} = field;
    const {label} = props;
    const {touched, errors} = form;
    // const [field, meta] = useField(props);

    // const handleChange = (e) => {
    //     setUser({...User, [label.toLowerCase()]: e.target.value})
    // }

    return (
        <div className="relative self-stretch">
            <textarea {...field} {...props} className={`peer flex w-full py-4 px-3 items-center gap-2.5 rounded border border-neutral-500 text-neutral-50 text-lg font-inter placeholder:neutral-700 placeholder:text-lg bg-black focus:justify-between focus:border-twitter-blue 
                focus:ring-0 focus:outline-none resize-none ${touched[name] && errors[name] && 'border-red-600 focus:border-red-600'}`} type="text" placeholder={label} rows={3} value={value || ''} />
            <label className={`text-neutral-500 font-inter peer-focus:text-twitter-blue text-xs font-medium p-1 m-4 absolute -top-7 bg-black ${touched[name] && errors[name] && 'text-red-600 peer-focus:text-red-600'}`}>
                {label}
            </label>
            {touched[name] && errors[name] && (
                <div className="error font-medium text-xs text-red-600">{errors[name]}</div>
            )}
        </div>
    )

    // const handleChange = (e) => {
    //     setUser({...User, [label.toLowerCase()]: e.target.value})
    // }

    // return (
    //     <div className="relative self-stretch">
    //         <textarea className="peer flex w-full py-4 px-3 items-center gap-2.5 rounded border border-neutral-500 text-neutral-50 text-lg font-inter placeholder:neutral-700 placeholder:text-lg bg-black focus:justify-between focus:border-twitter-blue 
    //             focus:ring-0 focus:outline-none resize-none" type="text" placeholder={label} rows={3} defaultValue={User[label.toLowerCase()]} onChange={handleChange} />
    //         <label className="text-neutral-500 font-inter peer-focus:text-twitter-blue text-xs font-medium p-1 m-4 absolute -top-7 bg-black">
    //             {label}
    //         </label>
    //     </div>
    // )
}

Textarea.propTypes = {
    field: PropTypes.object,
    form: PropTypes.object,
    label: PropTypes.string.isRequired,
}

export default Textarea