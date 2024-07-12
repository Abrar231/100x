import { useContext, useState } from "react";
import { deleteComment, getTimeDifference } from "../services/postService";
import { UserContext } from "../context/UserContext";
import Modal from "./Modal";
import threeDots from '../assets/images/dark-theme-ellipses-group.svg'
import PropTypes from 'prop-types'

function Comment({comment, comments, setComments, setCommentsCount, setPopup}) {
    const {loggedInUser} = useContext(UserContext);
    const {id, User, replied_at, post_id, user_id, content} = comment;
    const {avatar, username, display_name} = User;
    const [showModal, setShowModal] = useState(false);

    const handleDeleteComment = async () => {
        // console.log('Calling deleteComment');
        const deletedComment = await deleteComment(id, post_id);
        if(deletedComment.success){
            const filteredComments = comments.filter(comment => id !== comment.id);
            setComments(filteredComments);
            setCommentsCount(deletedComment.comment_count);
            setPopup({show: true, text: 'Comment deleted successfully.'});
            setTimeout(() => {
                setPopup({show: false, text:''});
            }, 3000);
        }
    }
    // console.log('Comment Count: ' + commentCount);

  return (
    <article className="flex w-full py-2 px-4 items-start gap-4 border-b border-neutral-500">
        <div className='w-12 h-12'>
            {avatar && <img className="shrink-0" src={avatar} />}
            {!avatar && <div className='w-full h-full bg-neutral-800 rounded-full'/>}
        </div>
        <div className="flex flex-col items-start gap-2 grow shrink-0 basis-0">
            <div className="flex flex-col items-start gap-1 self-stretch">
                <div className="flex w-full justify-between">
                    <div className='flex items-center gap-2'>
                        <span className="text-neutral-50 font-medium clig-liga-off">{display_name}</span>
                        <span className="text-neutral-500">@{username} • {getTimeDifference(new Date(replied_at), new Date())}</span>
                    </div>
                    <div className='relative flex'>
                        {(user_id === loggedInUser.id) && !showModal && <button className='px-1' onClick={() => {setShowModal(true)}}>
                            <img src={threeDots} alt="" />
                        </button>}
                        {showModal && <Modal text='Delete Comment' onClick={handleDeleteComment} showModal={showModal} setShowModal={setShowModal} />}
                    </div>
                </div>
                <div className="text-neutral-50 self-stretch text-[15px]">
                    {content}
                </div>
            </div>
        </div>
    </article>
  )
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
    setComments: PropTypes.func.isRequired,
    setCommentsCount: PropTypes.func.isRequired,
    setPopup: PropTypes.func.isRequired,
  }

export default Comment