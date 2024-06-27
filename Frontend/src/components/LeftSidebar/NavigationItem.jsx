import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const NavigationItem = ({image, label, href}) => {
    const navigate = useNavigate()
    
    const handleClick = () => {
        navigate(href)
    }
    return (
        <button onClick={handleClick} className="flex py-3 px-5 items-center gap-5 self-stretch">
            <div className="flex justify-center items-center w-6 h-6">
                <img src={image} />
            </div>
            <div className="font-inter text-lg font-medium text-neutral-50">
                {label}
            </div>
        </button>
    )
}

NavigationItem.propTypes = {
    image: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
}

export default NavigationItem