import login100 from '../../assets/images/login-100.svg'
import loginX from '../../assets/images/login-x.svg'
import Button from '../Button'
import PropTypes from 'prop-types'
import Avatar from './Avatar'
import { createPortal } from 'react-dom'
import CreatePost from '../CreatePost'
import { useRef, useState } from 'react'
import Navigation from './Navigation'
import PopupMessage from '../PopupMessage'

const LeftSidebar = ({ posts, setPosts }) => {
    const [popup, setPopup] = useState({show: false, text: ''});
    const createPostRef = useRef(null);

    return (
        <div className="hidden h-screen lg:flex w-72 p-5 flex-col justify-between shrink-0">
            <div className="flex fixed flex-col items-start gap-2">
                <div className="flex py-3 px-5 items-baseline self-stretch">
                    <img src={login100} />
                    <img src={loginX} />
                </div>
                <Navigation />
                <div className="flex w-60 p-2.5 flex-col items-start gap-2.5 self-stretch">
                    <div className="flex py-4 flex-col items-start gap-2.5 self-stretch">
                        <Button size="lg" variant="blue" textColor="white" onClick={() => {createPostRef.current.showModal();}} >
                            Post
                        </Button>
                        {createPortal(<CreatePost ref={createPostRef} posts={posts} setPosts={setPosts} setPopup={setPopup} />, document.body)}
                    </div>
                </div>
            </div>
            <Avatar />
            {popup.show && <PopupMessage text={popup.text} />}
        </div>
    )
}

LeftSidebar.propTypes = {
    posts: PropTypes.array.isRequired,
    setPosts: PropTypes.func.isRequired,
}

export default LeftSidebar