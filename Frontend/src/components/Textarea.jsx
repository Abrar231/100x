import { useField } from 'formik';
import PropTypes from 'prop-types'

function Textarea({label, ...props}) {
    const [field, meta] = useField(props);

    // const handleChange = (e) => {
    //     setUser({...User, [label.toLowerCase()]: e.target.value})
    // }

    return (
        <div className="relative self-stretch">
            <textarea className={`peer flex w-full py-4 px-3 items-center gap-2.5 rounded border border-neutral-500 text-neutral-50 text-lg font-inter placeholder:neutral-700 placeholder:text-lg bg-black focus:justify-between focus:border-twitter-blue 
                focus:ring-0 focus:outline-none resize-none ${meta.touched && meta.error && 'border-red-600 focus:border-red-600'}`} type="text" placeholder={label} rows={3} {...field} {...props} />
            <label className={`text-neutral-500 font-inter peer-focus:text-twitter-blue text-xs font-medium p-1 m-4 absolute -top-7 bg-black ${meta.touched && meta.error && 'text-red-600 peer-focus:text-red-600'}`}>
                {label}
            </label>
            {meta.touched && meta.error && (
                <div className="error font-medium text-xs text-red-600">{meta.error}</div>
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
    label: PropTypes.string.isRequired,
    User: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired,
}

export default Textarea