import PropTypes from 'prop-types'
import signupX from '../assets/images/create-account-1-signup-x.svg'

const CloseDialogButton = ({element, User, setUser}) => {
    const handleClick = () => {
        setUser({...User, name: "", email: "", "date of birth": "", day: "", month: "", year: "", password: ""});
        element.current.close();
    }

    return (
        <button onClick={handleClick}>
            <img src={signupX} />
        </button>
    )
}

CloseDialogButton.propTypes = {
    element: PropTypes.object,
    User: PropTypes.object,
    setUser: PropTypes.func,
}

export default CloseDialogButton;