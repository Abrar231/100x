import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import { getFollowingFeed, getForYouFeed, getUserPosts } from '../services/postService';
import Post from './Post';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingIcon from './LoadingIcon';

const PostList = ({activeTab, posts, setPosts, User, setPopup}) => {
    const navigate = useNavigate();
    const feedType = useRef('');
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);

    const fetchMorePost = async () => {
        if(activeTab){
            if(activeTab === "ForYou"){
                const feed = await getForYouFeed(page);
                setPosts(posts => [...posts, ...feed.posts]);
                feed.posts.length > 0 ? setHasMore(true): setHasMore(false);
                feedType.current = feed.feedType;
                setPage(page => page + 1);
            } else if(activeTab === "Following"){
                const feed = await getFollowingFeed(page);
                setPosts(posts => [...posts, ...feed.posts]);
                feed.posts.length > 0 ? setHasMore(true): setHasMore(false);
                feedType.current = feed.feedType;
                setPage(page => page + 1);
            }
        } else {
            const userPosts = await getUserPosts(User.id, page);
            setPosts(posts => [...posts, ...userPosts]);
            userPosts.length > 0 ? setHasMore(true): setHasMore(false);
            setPage(page => page + 1);
        }
    }

    useEffect(() => {
        if(activeTab){
            if(activeTab === "ForYou"){
                (async () => {
                    setPosts(() => []);
                    const feed = await getForYouFeed(0);
                    setPosts(posts => [...posts, ...feed.posts]);
                    feed.posts.length > 0 ? setHasMore(true): setHasMore(false);
                    setPage(1);
                    feedType.current = feed.feedType;
                })();
            } else if(activeTab === "Following"){
                (async () => {
                    setPosts(() => []);
                    const feed = await getFollowingFeed(0);
                    setPosts(posts => [...posts, ...feed.posts]);
                    feed.posts.length > 0 ? setHasMore(true): setHasMore(false);
                    setPage(1);
                    feedType.current = feed.feedType;
                })();
            }
        } else {
            (async () => {
                if(User.id){
                    setPosts(() => []);
                    const userPosts = await getUserPosts(User.id, 0);
                    setPosts(posts => [...posts, ...userPosts]);
                    setPage(1);
                    userPosts.length > 0 ? setHasMore(true): setHasMore(false);
                }
            })();
        }
    }, [activeTab, User, setPosts]);

    const handleClick = (e, id) => {
        navigate(`/post/${id}`);
    }

    return (
        <div className='w-full'>
            <InfiniteScroll
                dataLength={posts.length}
                next={fetchMorePost}
                hasMore={hasMore}
                loader={<LoadingIcon />}
                style={{overflow: 'visible'}}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <section className='w-full'>
                    {posts.map(post => 
                        <div  key={`${activeTab? feedType.current + '-': ''}${post.id}`} onClick={(e) => {handleClick(e,post.id)}} className='w-full' role="button" tabIndex={0} >
                            <Post post={post} posts={posts} setPosts={setPosts} setPopup={setPopup} />
                        </div>
                    )}
                </section>
            </InfiniteScroll>
        </div>
  )
}

PostList.propTypes = {
    User: PropTypes.object,
    activeTab: PropTypes.string,
    posts: PropTypes.array.isRequired,
    setPosts: PropTypes.func.isRequired,
    setPopup: PropTypes.func.isRequired,
}

export default PostList