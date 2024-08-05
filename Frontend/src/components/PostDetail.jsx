import { useEffect, useState } from 'react'
import leftArrow from '../assets/images/arrow-left.svg'
import CommentList from './CommentList'
import Post from './Post'
import PostInput from './PostInput'
import { getCommentsForPost, getPostById } from '../services/postService'
import PropTypes from 'prop-types'
import PopupMessage from './PopupMessage'
import { useNavigate } from 'react-router-dom'
import LoadingIcon from './LoadingIcon'

function PostDetail({id}) {
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [commentsCount, setCommentsCount] = useState(null);
    const [popup, setPopup] = useState({show: false, text: ''});
    const navigate = useNavigate();
    
    useEffect(() => {
        (async () => {
            const postById = await getPostById(id);
            if(postById.id){
                setPost(postById);
                setCommentsCount(postById.comment_count);
            }
            const fetchedComments = await getCommentsForPost(id);
            setComments(fetchedComments.length? fetchedComments: [{}]);
        })();
    }, [id]);

    return (
        <section className="inline-flex flex-col items-start  max-w-2xl border-x border-x-neutral-500 xl:min-w-[670px]">
            <div className="flex py-3 px-4 items-center gap-5 self-stretch">
                <button onClick={() => {navigate(-1)}}>
                    <img src={leftArrow} />
                </button>
                <div className="flex flex-col justify-center items-start gap-1">
                    <span className="text-neutral-50 font-inter text-xl font-bold">
                        Post
                    </span>
                </div>
            </div>
            {post.id?
                <div className='w-full'>
                    {post.id && <Post post={post} setComments={setComments} commentsCount={commentsCount} setPopup={setPopup} />}
                    {popup.show && <PopupMessage text={popup.text} />}
                    <PostInput type='comment' post={post} posts={comments} setPosts={setComments} setCommentsCount={setCommentsCount} setPopup={setPopup} />
                    {comments[0]?
                        comments[0].id && <CommentList comments={comments} setComments={setComments} setCommentsCount={setCommentsCount} setPopup={setPopup} />
                        :
                        <LoadingIcon />
                    }
                </div>
                :
                <LoadingIcon />
            }
        </section>
    )
}

PostDetail.propTypes = {
    id: PropTypes.string.isRequired,
}

export default PostDetail