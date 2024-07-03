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
    // console.log('Rendering PostList');
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
                    // console.log('Executing getForYouFeed');
                    setPosts(() => []);
                    const feed = await getForYouFeed(0);
                    setPosts(posts => [...posts, ...feed.posts]);
                    feed.posts.length > 0 ? setHasMore(true): setHasMore(false);
                    setPage(1);
                    feedType.current = feed.feedType;
                    // console.log(posts);
                })();
            } else if(activeTab === "Following"){
                (async () => {
                    // console.log('Executing getFollowingFeed');
                    setPosts(() => []);
                    const feed = await getFollowingFeed(0);
                    setPosts(posts => [...posts, ...feed.posts]);
                    feed.posts.length > 0 ? setHasMore(true): setHasMore(false);
                    setPage(1);
                    feedType.current = feed.feedType;
                    // console.log("Posts: " + JSON.stringify(posts));
                    // console.log("Feed.posts: " + JSON.stringify(feed.posts));
                })();
            }
        } else {
            (async () => {
                // console.log('Executing getForYouFeed');
                if(User.id){
                    setPosts(() => []);
                    const userPosts = await getUserPosts(User.id, 0);
                    setPosts(posts => [...posts, ...userPosts]);
                    setPage(1);
                    userPosts.length > 0 ? setHasMore(true): setHasMore(false);
                }
                // console.log(userPosts);
            })();
        }
    }, [activeTab, User, setPosts]);

    // console.log("Posts inside PostList: " + JSON.stringify(posts));

    // const handleClick = () => {
    //     ;
    // }

    const handleClick = (e, id) => {
        console.log('test In hnadleClick');
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