import ProfileHeader from './ProfileHeader'
import PostList from '../PostList'
import PropTypes from 'prop-types'
import PopupMessage from '../PopupMessage';
import { useState } from 'react';

const Profile = ({posts, setPosts, User, setUser}) => {
    const [popup, setPopup] = useState({show: false, text: ''});

    return (
        <section className="inline-flex flex-col items-start gap-3 max-w-2xl border-x border-x-neutral-500 xl:min-w-[670px]">
            <ProfileHeader User={User} setUser={setUser} setPopup={setPopup} />
            {User.id && <PostList User={User} posts={posts} setPosts={setPosts} setPopup={setPopup} />}
            <div className="h-16 lg:hidden" />
            {popup.show && <PopupMessage text={popup.text} />}
        </section>
    )
}

Profile.propTypes = {
    posts: PropTypes.array.isRequired,
    setPosts: PropTypes.func.isRequired,
    User: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired,
}

export default Profile