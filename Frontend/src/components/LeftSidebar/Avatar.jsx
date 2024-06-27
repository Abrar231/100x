import { useContext, useState } from 'react'
import threeDots from '../../assets/images/dark-theme-ellipses-group.svg'
import PropTypes from 'prop-types'
import { UserContext } from '../../context/UserContext'
import { userLogout } from '../../services/authservice';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal';

function Avatar() {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    const {display_name, username, avatar} = loggedInUser;
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        setShowModal(true);
    }

    const handleLogout = async () => {
        const response = await userLogout();
        if(response.success){
            navigate('/login');
            setLoggedInUser({});
        }
    }

    return (
        <div className="flex fixed bottom-5 justify-between items-center w-[248px]">
            <div className="flex items-start justify-between w-full">
                <div className="flex gap-3">
                    <img className="w-10 h-10 rounded-[200px] self-center" src={avatar} />
                    <div>
                        <div className="text-neutral-50 font-inter font-bold">
                            {display_name}
                        </div>
                        <div className="text-neutral-500 font-inter">
                            @{username}
                        </div>
                    </div>
                </div>
                <button className="flex w-8 h-8 justify-center items-center" onClick={handleClick}>
                    <img src={threeDots} />
                </button>
                {showModal && <Modal text={`Log out @${username}`} onClick={handleLogout} showModal={showModal} setShowModal={setShowModal} type='avatar' />}
            </div>
        </div>
    )
}

Avatar.propTypes = {
    username: PropTypes.string,
    userHandle: PropTypes.string,
}

export default Avatar