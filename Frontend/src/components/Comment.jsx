import { useContext, useState } from "react";
import { deleteComment, getTimeDifference } from "../services/postService";
import { UserContext } from "../context/UserContext";
import Modal from "./Modal";
import threeDots from '../assets/images/dark-theme-ellipses-group.svg'
import PropTypes from 'prop-types'

function Comment({comment, comments, setComments, setCommentsCount, setPopup}) {
    // const comment = {
    //     id: "8",
    //     content: "Hey there!!!",
    //     post_id: "64",
    //     user_id: "8",
    //     replied_at: "2024-05-21T21:34:07.180Z",
    //     createdAt: "2024-05-21T21:34:07.181Z",
    //     updatedAt: "2024-05-21T21:34:07.181Z",
    //     User: {
    //         display_name: "Son Goku",
    //         username: "Test3",
    //         avatar: {
    //             data: "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",
    //             ext: "png"
    //         }
    //     }
    // }

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
            {!avatar && <div className='w-full h-full bg-neutral-500 rounded-full'/>}
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
    commentsCount: PropTypes.number.isRequired,
    setCommentsCount: PropTypes.func.isRequired,
    setPopup: PropTypes.func.isRequired,
  }

export default Comment