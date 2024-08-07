import PostInput from '../PostInput'
import Tab from '../Tab'
import { useState } from 'react'
import PostList from '../PostList'
import PropTypes from 'prop-types'
import PopupMessage from '../PopupMessage'

const Feed = ({ posts, setPosts }) => {
    const [popup, setPopup] = useState({show: false, text: ''});
    const [activeTab, setActiveTab] = useState('ForYou');

    return (
        <section className="relative w-full max-w-2xl border-x border-neutral-500">
            <div className="lg:flex p-4 self-stretch hidden">
                <span className="text-neutral-50 font-inter text-xl font-bold">Home</span>
            </div>
            <Tab type='web' activeTab={activeTab} setActiveTab={setActiveTab} />
            <PostInput type='post' posts={posts} setPosts={setPosts} setPopup={setPopup} />
            <PostList activeTab={activeTab} posts={posts} setPosts={setPosts} setPopup={setPopup} />
            <div className="h-16 lg:hidden" />
            {popup.show && <PopupMessage text={popup.text} />}
        </section>
    )
}

Feed.propTypes ={
    posts: PropTypes.array.isRequired,
    setPosts: PropTypes.func.isRequired,
}

export default Feed