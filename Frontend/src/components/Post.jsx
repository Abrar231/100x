import PropTypes from 'prop-types'
import commentIcon from '../assets/images/comment-sv.svg'
import coloredCommentIcon from '../assets/images/comment-color-sv.svg'
import repostIcon from '../assets/images/repost-sv.svg'
import coloredRepostIcon from '../assets/images/repost-sv-color.svg'
import heartIcon from '../assets/images/heart-sv.svg'
import hoverHeartIcon from '../assets/images/heart-color-highlight-sv.svg'
import coloredHeartIcon from '../assets/images/heart-sv-color.svg'
import reachIcon from '../assets/images/reach-sv.svg'
import coloredReachIcon from '../assets/images/reach-sv-color.svg'
import shareIcon from '../assets/images/share-sv.svg'
import coloredShareIcon from '../assets/images/share-sv-color.svg'
import threeDots from '../assets/images/dark-theme-ellipses-group.svg'
import { createPost, deleteLike, getTimeDifference, createLike, deleteRepost, deletePost } from '../services/postService'
import { createPortal } from 'react-dom'
import CommentModal from './CommentModal'
import { useContext, useRef, useState } from 'react'
import Modal from './Modal'
import { UserContext } from '../context/UserContext'
import { Link } from 'react-router-dom'

const Post = ({ post, posts, setPosts, setComments, commentsCount, setPopup }) => {
    // const navigate = useNavigate();

    // console.log("Post Item: " + JSON.stringify(post))
    const { loggedInUser } = useContext(UserContext);
    const {repost_id} = post;
    const { id, content, user_id, posted_at, comment_count, repost_count, likes_count, is_liked, is_reposted } = repost_id? post.originalPost: post;
    const reposterName = repost_id? post.User.display_name: null;
    const { display_name, username, avatar } = repost_id? post.originalPost.User: post.User;
    
    const [Likes, setLikes] = useState({is_liked, likes_count});
    const [Repost, setRepost] = useState({is_reposted, repost_count});
    const [commentCount, setCommentCount] = useState(commentsCount? commentsCount: comment_count);
    const [showModal, setShowModal] = useState(false);
    // const [popup, setPopup] = useState({show: false, text: ''});
    // console.log("Comment Count: " + commentsCount);

    const commentRef = useRef(null);
    const openCommentModal = (e) => {
        commentRef.current.showModal();
        e.stopPropagation();
        console.log('test In openCommentModal');
    }

    const handleRepost = async (e) => {
        e.stopPropagation();
        if(Repost.is_reposted){
            const deletedRepost = await deleteRepost(id);
            if(deletedRepost.success){
                setRepost({is_reposted: false, repost_count: deletedRepost.repost_count});
                setPopup({show: true, text: 'Repost deleted successfully.'});
                setTimeout(() => {
                    setPopup({show: false, text:''});
                }, 3000);
            }
        } else {
            const content = null;
            const createdRepost = await createPost(content, id);
            if(createdRepost.id){
                setRepost({is_reposted:true, repost_count: createdRepost.originalPost.repost_count});
                setPopup({show: true, text: 'Repost created successfully.'});
                setTimeout(() => {
                    setPopup({show: false, text:''});
                }, 3000);
            }
        }
        
    }

    const handleLike = async (e) => {
        e.stopPropagation();
        // console.log('Clicked on handleLike');
        if(!Likes.is_liked){
            // console.log('Calling like api');
            const createdLike = await createLike(id);
            if(createdLike.like.id){
                setLikes({is_liked:true, likes_count: createdLike.likes_count});
                setPopup({show: true, text: 'Liked the post successfully.'});
                setTimeout(() => {
                    setPopup({show: false, text:''});
                }, 3000);
            }
        } else {
            // console.log('Calling deleteLike api');
            //code to delete like
            const deletedLike = await deleteLike(id);
            if(deletedLike.success){
                setLikes({is_liked: false, likes_count: deletedLike.likes_count});
                setPopup({show: true, text: 'Unliked the post successfully.'});
                setTimeout(() => {
                    setPopup({show: false, text:''});
                }, 3000);
            }
        }
    }

    const handleDeletePost = async (e) => {
        e.stopPropagation();
        // console.log('handleDeletePost called');
        const deletedPost = await deletePost(id);
        if(deletedPost.success){
            // console.log('Showing Popup');
            setPopup({show: true, text: 'Post deleted successfully'});
            setTimeout(() => {
                setPopup({show: false, text:''});
            }, 3000);
            const filteredPosts = posts.filter(post => post.id !== id);
            setPosts(filteredPosts);
        }
    }

    const handlePostModal = (e) => {
        e.stopPropagation();
        setShowModal(true);
    }

    // const handleClick = () => {
    //     navigate(`/post/${post.id}`);
    // }

    // console.log("Post with id:" + id + "is" + JSON.stringify(post))

    return (
        <>
            {repost_id && (
                <div className="flex w-full pt-2 px-4 items-start gap-4">
                    <div className='w-12 h-4 flex justify-end items-center'>
                        <img className='w-[16px] h-[16px] mt-[6px]' src={repostIcon} alt="" />
                    </div>
                    <div className="text-neutral-500 text-[15px] font-semibold">
                        <p>{reposterName} reposted</p>
                    </div>
                </div>
            )}
            <article className="flex w-full py-2 px-4 items-start gap-4 border-b border-neutral-500">
                <div className='w-12 h-12'>
                    {avatar && <img className="shrink-0" src={avatar} />}
                    {!avatar && <div className='w-full h-full bg-neutral-800 rounded-full'/>}
                </div>
                <div className="flex flex-col items-start gap-2 grow shrink-0 basis-0">
                    <div className="flex flex-col items-start gap-1 self-stretch">
                        <div className="flex w-full justify-between">
                            <div className='flex items-center gap-2'>
                                <Link className="text-neutral-50 font-medium clig-liga-off" to={`/${username}`} onClick={e => {e.stopPropagation()}} >{display_name}</Link>
                                <span className="text-neutral-500">@{username} • {getTimeDifference(new Date(posted_at), new Date())}</span>
                            </div>
                            <div className='relative flex'>
                                {(user_id === loggedInUser.id) && !showModal && <button className='px-1' onClick={handlePostModal}>
                                    <img src={threeDots} alt="" />
                                </button>}
                                {showModal && <Modal text='Delete Post' onClick={handleDeletePost} showModal={showModal} setShowModal={setShowModal} />}
                            </div>
                        </div>
                        <div className="text-neutral-50 self-stretch text-[15px] text-start">
                            {content}
                        </div>
                    </div>
                    <div className="flex py-3 px-0 justify-between items-center self-stretch">
                        <button onClick={openCommentModal} className="flex justify-center items-center gap-1.2 group">
                            <img className="group-hover:hidden" src={commentIcon} />
                            <img className="hidden group-hover:inline" src={coloredCommentIcon} />
                            <span className="text-neutral-500 text-sm group-hover:text-twitter-blue">{commentCount === 0? null: commentCount}</span>
                        </button>
                        {createPortal(<CommentModal ref={commentRef} setComments={setComments} post={post} setCommentCount={setCommentCount} setPopup={setPopup} />, document.getElementById('root'))}
                        <button onClick={handleRepost} className="flex justify-center items-center gap-1.2 group">
                            {!Repost.is_reposted && <img className="group-hover:hidden" src={repostIcon} />}
                            {!Repost.is_reposted && <img className="hidden group-hover:inline" src={coloredRepostIcon} />}
                            {Repost.is_reposted && <img  src={coloredRepostIcon} />}
                            <span className={`text-neutral-500 text-sm ${Repost.is_reposted? 'text-success': 'group-hover:text-success'}`}>{Repost.repost_count === 0? null: Repost.repost_count}</span>
                        </button>
                        <button onClick={handleLike} className="flex justify-center items-center gap-1.2 group">
                            {!Likes.is_liked && <img className="group-hover:hidden" src={heartIcon} />}
                            {!Likes.is_liked && <img className="hidden group-hover:inline" src={hoverHeartIcon} />}
                            {Likes.is_liked && <img src={coloredHeartIcon} />}
                            <span className={`text-neutral-500 text-sm ${Likes.is_liked? 'text-heart-hover': 'group-hover:text-heart-hover'}`}>{Likes.likes_count === 0? null: Likes.likes_count}</span>
                        </button>
                        <button onClick={(e) => {e.stopPropagation()}} className="flex items-start gap-1.2 group">
                            <img className="group-hover:hidden" src={reachIcon} />
                            <img className="hidden group-hover:inline" src={coloredReachIcon} />
                            <span className="text-neutral-500 text-sm group-hover:text-twitter-blue">{null}</span>
                        </button>
                        <button onClick={(e) => {e.stopPropagation()}} className="flex items-start gap-1.2 group">
                            <img className="group-hover:hidden" src={shareIcon} />
                            <img className="hidden group-hover:inline" src={coloredShareIcon} />
                        </button>
                    </div>
                </div>
            </article>
        </>
    )
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    posts: PropTypes.array,
    setPosts: PropTypes.func,
    setComments: PropTypes.func,
    commentsCount: PropTypes.number,
    setPopup: PropTypes.func,
}

export default Post;