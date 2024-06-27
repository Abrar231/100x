// import Post from '../Post'
import PostInput from '../PostInput'
import Tab from '../Tab'
// import userImage1 from '../../assets/images/copy-link-user-avatar-1.png'
// import userImage2 from '../../assets/images/copy-link-user-avatar-2.png'
// import userImage3 from '../../assets/images/copy-link-user-avatar-3.png'
import { useState } from 'react'
import PostList from '../PostList'
import PropTypes from 'prop-types'
import PopupMessage from '../PopupMessage'

const Feed = ({ posts, setPosts }) => {
    const [popup, setPopup] = useState({show: false, text: ''});
    const [activeTab, setActiveTab] = useState('ForYou');
    // let posts = [];
    
    

    // useEffect(() => {
    //     (async () => {
    //         const posts = await getFollowingFeed();
    //         console.log(posts);
    //     })();
    // }, []);
    

    // const post1 = { 
    //     id: 1,
    //     text: <p>Don't wish for it, work for it.</p>,
    //     postedAt: "32m",
    //     postedBy: {
    //         userName: "Name",
    //         userHandle: "@handle",
    //         userImage: userImage1
    //     },
    //     meta: {
    //         comments : 11,
    //         reposts : 270,
    //         likes : 1869,
    //         views : "99.6K"
    //     }
    // }

    // const post2 = { 
    //     id: 2,
    //     text: <><p>i've seen people absolutely despise auto layout in figma but i think it's a lifesaver-</p><p>1. tidies everything nice and compact</p><p>2. makes responsive design effortless</p><p>3. no manual adjustments post any tweaks</p><p>4. saves a tonnn of time</p><br /><p>sorry, but will stay an auto layout maxi all life.</p></>,
    //     postedAt: "10h",
    //     postedBy: {
    //         userName: "Name",
    //         userHandle: "@handle",
    //         userImage: userImage2
    //     } ,
    //     meta: {
    //         comments : 11,
    //         reposts : 270,
    //         likes : 1869,
    //         views : "99.6K"
    //     }
    // }
    
    // const post3 = { 
    //     id: 3,
    //     text: <><p>Writing gets easier after the first sentence.</p><br /><p>Lifting gets easier after the first set.</p><br /><p>People think and think and think until they finally decide to act. Their attention shifts from internal to external, and the difficulty they created in their mind vanishes.</p></>,
    //     postedAt: "32m",
    //     postedBy: {
    //         userName: "Name",
    //         userHandle: "@handle",
    //         userImage: userImage3
    //     },
    //     meta: {
    //         comments : 11,
    //         reposts : 270,
    //         likes : 1869,
    //         views : "99.6K"
    //     }
    // }
    
    // const [posts, setPosts] = useState([post1, post2, post3]);

    // const meta = {
    //     comments : 11,
    //     reposts : 270,
    //     likes : 1869,
    //     views : "99.6K"
    // }

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