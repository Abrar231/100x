import { useContext, useEffect, useRef, useState, } from 'react'
import EditProfile from './EditProfile'
import leftArrow from '../../assets/images/arrow-left.svg'
import linkIcon from '../../assets/images/link-icon.svg'
import calendarIcon from '../../assets/images/calendar-icon.svg'
import Button from '../Button'
import PropTypes from 'prop-types'
import { UserContext } from '../../context/UserContext'
import { createPortal } from 'react-dom'
import { followUser, unfollowUser } from '../../services/userService'
import { useNavigate } from 'react-router-dom'
import LoadingIcon from '../LoadingIcon'
import { apiUrl } from '../../../config'

function ProfileHeader({User, setUser, setPopup}) {
    const { loggedInUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openDialog = () => {
        editProfileRef.current.showModal();
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        editProfileRef.current.close();
    };

    useEffect(() => {
        const body = document.querySelector('body');

        if (isDialogOpen) {
        body.classList.add('overflow-hidden');
        } else {
        body.classList.remove('overflow-hidden');
        }
    }, [isDialogOpen]);
    
    const editProfileRef = useRef(null);
    const {id, display_name, username, avatar, image, bio, link, joined_at, follower_count, following_count, isFollowed} = User;
    const joinedDate = new Date(joined_at);

    const handleFollow = async () => {
        const response = await followUser(id);
        if(response.success){
            const newUser = {...User, isFollowed: true, follower_count: response.follower_count}
            setUser(newUser);
            setPopup({show: true, text: 'Followed the User successfully.'});
            setTimeout(() => {
                setPopup({show: false, text:''});
            }, 3000);
        }
    }

    const handleUnfollow = async () => {
        const response = await unfollowUser(id);
        if(response.success){
            const newUser = {...User, isFollowed: false, follower_count: response.follower_count}
            setUser(newUser);
            setPopup({show: true, text: 'Unfollowed the User successfully.'});
            setTimeout(() => {
                setPopup({show: false, text:''});
            }, 3000);
        }
    }

    return (
        <>
            { User.id || User.error?
                User.error?
                    <div className='w-full'>
                        <div className="flex flex-col items-start self-stretch">
                            <div className="flex py-3 px-4 items-center gap-5 self-stretch">
                                <button onClick={() => {navigate(-1)}}>
                                    <img src={leftArrow} />
                                </button>
                                <div className="flex flex-col justify-center items-start gap-1">
                                    <span className="text-neutral-50 font-inter text-xl font-bold">
                                        Profile
                                    </span>
                                </div>
                            </div>
                            <div className='w-full h-64 border border-black bg-searchbar-fill' />
                        </div>
                        <div className="flex self-stretch px-4 flex-col justify-end items-start gap-3">
                            <div className="relative flex self-stretch justify-between">
                                <div className="relative w-1/4 h-auto mb-3 min-w-[50px] -mt-[13%] text-white">
                                    <div className='w-full aspect-square bg-neutral-900 border-4 border-black rounded-full'></div>
                                </div>
                            </div>
                            <div className='ml-2 text-xl text-white'>@{username}</div>
                        </div>
                        <div className='max-w-[400px] mx-auto my-8 px-5 py-10'>
                            <div className='text-white text-4xl'>This account doesn’t exist</div>
                            <div className='text-neutral-500 text-lg'>Try searching for another.</div>
                        </div>
                    </div>
                    :
                    <div className="w-full border-b border-neutral-500 pb-3">
                    <div className="flex flex-col items-start self-stretch">
                        <div className="flex py-3 px-4 items-center gap-5 self-stretch">
                            <button onClick={() => {navigate(-1)}}>
                                <img src={leftArrow} />
                            </button>
                            <div className="flex flex-col justify-center items-start gap-1">
                                <span className="text-neutral-50 font-inter text-xl font-bold">
                                    {display_name}
                                </span>
                                <span className="text-neutral-500 font-inter text-sm">
                                    @{username}
                                </span>
                            </div>
                        </div>
                        {image && <img className="w-full" src={image} />}
                        {!image && <div className='w-full h-64 border border-black bg-searchbar-fill' /> }
                    </div>
                    <div className="flex self-stretch px-4 flex-col justify-end items-start gap-3">
                        <div className="relative flex self-stretch justify-between">
                            <div className="relative w-1/4 h-auto mb-3 min-w-[50px] -mt-[13%] text-white">
                                {avatar && <img className="w-full aspect-square border-4 border-black rounded-full" src={avatar} alt='Profile Image' />}
                                {!avatar && <div className='w-full aspect-square bg-black border border-neutral-800 rounded-full'></div>}
                            </div>
                            {id && <div className="self-end mt-2">
                                {loggedInUser.id === id && <>
                                    <Button size="sm" variant="outline" textColor="white" onClick={openDialog} >
                                        Edit Profile
                                    </Button>
                                    {createPortal(<EditProfile ref={editProfileRef} User={User} setUser={setUser} setPopup={setPopup} closeDialog={closeDialog} />, document.getElementById('root'))}
                                </>}
                                {loggedInUser.id !== id && <div>
                                    {!isFollowed && <Button variant='outline' textColor='white' onClick={handleFollow} >Follow</Button>}
                                    {isFollowed && <Button variant='outline' textColor='white' onClick={handleUnfollow} >Following</Button>}
                                </div>}
                            </div>}
                        </div>
                        <div className="flex flex-col justify-end items-start gap-1">
                            <div className="text-neutral-50 text-xl font-bold font-inter">
                                {display_name}
                            </div>
                            <div className="text-neutral-500 text-['15px'] font-inter">
                                @{username}
                            </div>
                        </div>
                        <div className="text-neutral-50 font-inter ">
                            {bio}
                        </div>
                        <div className="flex items-start gap-5">
                            {link && <div className="flex items-center gap-1">
                                <img src={linkIcon} />
                                <span className="text-twitter-blue font-inter">
                                    {link}
                                </span>
                            </div>}
                            <div className="flex items-center gap-1">
                                <img src={calendarIcon} />
                                <span className="text-neutral-500 font-inter">
                                    {`Joined ${joinedDate.toLocaleString('default', { month: 'long' })} ${joinedDate.getFullYear()}`}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-end gap-5">
                            <span className="font-inter text-neutral-500">
                                <span className="text-neutral-50 font-medium">{following_count}</span> Following
                            </span>
                            <span className="font-inter text-neutral-500">
                                <span className="text-neutral-50 font-medium">{follower_count}</span> Followers
                            </span>
                        </div>
                    </div>
                </div>
                :
                <LoadingIcon />
            }
        </>
    )
}

ProfileHeader.propTypes = {
    User: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired,
    setPopup: PropTypes.func.isRequired,
}

export default ProfileHeader