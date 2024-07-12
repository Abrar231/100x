import { forwardRef, useCallback, useContext, useEffect, useState } from 'react';
import closeButton from '../assets/images/create-account-1-signup-x.svg';
import Button from './Button';
import PropTypes from 'prop-types';
import {createComment, getTimeDifference} from '../services/postService'
import { UserContext } from '../context/UserContext';
import { Editor, Transforms, createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

// const initialValue = [
//     {
//       type: 'paragraph',
//       children: [{ text: 'A line of text in a paragraph.' }],
//     },
//   ]

// eslint-disable-next-line react/display-name
const CommentModal = forwardRef(({post, setComments, setCommentCount, setPopup}, ref) => {
    const { id, content, posted_at } = post;
    const { display_name, username, avatar } = post.originalPost? post.originalPost.User: post.User;
    const [comment, setComment] = useState("");
    // const userImage = userAvatar;
    // const divRef = useRef(null);
    // const cursorPositionRef = useRef(null);
    const {loggedInUser} = useContext(UserContext);
    const {avatar: loggedAvatar} = loggedInUser;
    // console.log(`Post on Comment: ${JSON.stringify(post)}`);

    const [editor] = useState(() => withReact(createEditor()));
    const [value, setValue] = useState([
        {
          type: 'paragraph',
          children: [{ text: '' }],
        },
    ]);

    useEffect(() => {
        if (value[0]?.children[0]?.text !== undefined) {
            setComment(value[0].children[0].text);
        }
    }, [value]);

    const clearEditor = useCallback(() => {
        Transforms.delete(editor, {
          at: {
            anchor: Editor.start(editor, []),
            focus: Editor.end(editor, []),
          },
        });
    }, [editor]);

    // useEffect(() => {
    //     const restoreCursorPosition = () => {
    //       const cursorPosition = cursorPositionRef.current;
    //       if (cursorPosition !== null && cursorPosition !== 0 && div.childNodes.length > 0) {
    //         const range = document.createRange();
    //         range.setStart(divRef.current.childNodes[0], cursorPosition);
    //         range.collapse(true);
    
    //         const selection = window.getSelection();
    //         selection.removeAllRanges();
    //         selection.addRange(range);
    //       }
    //     };
    //     const div = divRef.current;
    //     if (div) {
    //       div.focus();
    //       restoreCursorPosition();
    //     }
    // }, [comment]);

    // const handleInput = (e) => {
    //     setComment(e.target.innerText);
    //     const selection = window.getSelection();
    //     if (selection.rangeCount > 0) {
    //         cursorPositionRef.current = selection.getRangeAt(0).startOffset;
    //     } else {
    //         cursorPositionRef.current = selection.anchorOffset;
    //     }
    // }

    const handleComment = async () => {
        const createdComment = await createComment(comment, id);
        if(createdComment.comment.id){
            clearEditor();
            // console.log('Comment posted successfully. Comment_count:' + createdComment.comment_count);
            if(setComments){
                setComments(comments => {return {...comments, createdComment}});
            }
            setCommentCount(createdComment.comment_count);
            ref.current.close();
            setPopup({show: true, text: 'Comment created successfully'});
            setTimeout(() => {
                setPopup({show: false, text:''});
            }, 3000);
        }
    }

    return (
        <dialog ref={ref} onClick={(e) => {e.stopPropagation()}} className="bg-black backdrop:bg-blue-wash py-2.5 px-4 rounded-2xl">
            <div className="flex w-[480px] flex-col justify-center items-start gap-3 min-h-[320px]">
                <div className="flex py-3 items-center self-stretch">
                    <button onClick={() => {ref.current.close();}}>
                        <img src={closeButton} />
                    </button>
                </div>
                {/* Post has to be shown here to which this comment is linked to */}
                <article className='flex items-start gap-3 w-full grow relative'>
                    <div className='self-stretch'>
                        {avatar && <img className="shrink-0 rounded-[200px]" src={avatar} />}
                        {!avatar && <div className='w-12 h-12 rounded-full border bg-neutral-800'></div>}
                    </div>
                    <div className="absolute left-[5%] top-12 bottom-0 bg-neutral-500/50 line"></div>
                    <div className='flex  grow self-stretch'>
                        <div className="flex flex-col items-start gap-1  self-stretch">
                            <div className="flex items-center gap-2">
                                <span className="text-neutral-50 font-medium clig-liga-off">{display_name}</span>
                                <span className="text-neutral-500">@{username} • {getTimeDifference(new Date(posted_at), new Date())}</span>
                            </div>
                            <div className="text-neutral-50 self-stretch text-[15px]">
                                {content}
                            </div>
                            <p className='text-neutral-500'> Replying to <span className=' text-twitter-blue'>@{username}</span></p>
                        </div>
                    </div>
                </article>
                <div className="flex items-start gap-3 w-full grow ">
                    <div className='self-stretch'>
                        {loggedAvatar && <img className="shrink-0 rounded-[200px]" src={loggedAvatar} />}
                        {!loggedAvatar && <div className='w-12 h-12 rounded-full border bg-neutral-500'></div>}
                    </div>
                    <div className="flex  grow self-stretch" >
                        {comment.length===0 &&  <span className="text-neutral-600 font-inter text-xl absolute pointer-events-none" id="placeholder">Post your comment</span>}
                        {/* <div ref={divRef} id="tweet-content" autoFocus contentEditable="true" className="text-neutral-50 font-inter text-xl focus:outline-none caret-twitter-blue grow" onInput={handleInput}>
                            {comment}
                        </div> */}
                        <Slate editor={editor} initialValue={value} onChange={newValue => setValue(newValue)} >
                            <Editable className='text-neutral-50 font-inter text-xl focus:outline-none caret-twitter-blue grow' />
                        </Slate>
                    </div>
                </div>
                <div className="flex w-[480px] py-3 justify-between items-center">
                    <div className="text-neutral-400 font-inter text-sm">
                        {comment.length}/280
                    </div>
                    <Button size="sm" variant="blue" textColor="white" onClick={handleComment} disabled={comment.length < 1 || comment.length > 280} >
                        Comment
                    </Button>
                </div>
            </div>
        </dialog>
    )
});

CommentModal.propTypes = {
    post: PropTypes.object.isRequired,
    setComments: PropTypes.func,
    setCommentCount: PropTypes.func.isRequired,
    setPopup: PropTypes.func.isRequired,
}

export default CommentModal