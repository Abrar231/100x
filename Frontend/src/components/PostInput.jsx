import Button from './Button'
import PropTypes from 'prop-types'
import { useCallback, useContext, useEffect, useRef } from 'react'
import { UserContext } from '../context/UserContext'
import { useState } from 'react'
import { createComment, createPost } from '../services/postService'
import { Editor, Transforms, createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

const PostInput = ({posts, setPosts, type, post, setCommentsCount, setPopup}) => {
    const [content, setContent] = useState("");
    const divRef = useRef(null);
    // const cursorPositionRef = useRef(null);
    const { loggedInUser } = useContext(UserContext);

    const [editor] = useState(() => withReact(createEditor()));
    const [value, setValue] = useState([
        {
          type: 'paragraph',
          children: [{ text: '' }],
        },
    ]);

    useEffect(() => {
        // if (value[0]?.children[0]?.text !== undefined) {
            setContent(value[0].children[0].text);
        // }
    }, [value]);

    const handlePost = async () => {
        const repost_id = null;
        const createdPost = await createPost(content, repost_id);
        if(createdPost.id){
            clearEditor();
            setPosts([createdPost, ...posts]);
            setPopup({show: true, text: 'Post created successfully.'})
            setTimeout(() => {
                setPopup({show: false, text:''})
            }, 3000);
        }
        // console.log('Posts logging inside handlePost: ' + JSON.stringify(posts));
    }

    const clearEditor = useCallback(() => {
        Transforms.delete(editor, {
          at: {
            anchor: Editor.start(editor, []),
            focus: Editor.end(editor, []),
          },
        });
    }, [editor]);

    const handleComment = async () => {
        // console.log('Calling handleComment');
        const createdComment = await createComment(content, post.id);
        if(createdComment.comment.id){
            clearEditor();
            // setContent('')
            setPosts([createdComment.comment, ...posts]);
            setCommentsCount(createdComment.comment_count);
            setPopup({show: true, text: 'Comment created successfully'});
            setTimeout(() => {
                setPopup({show: false, text:''});
            }, 3000);
        }
    }

    const typeObj = {
        comment: {
            name: 'Comment',
            text: 'Post your comment',
            handler: handleComment},
        post: {
            name: 'Post',
            text: `What's happening?!`,
            handler: handlePost}
    }

    // useEffect(() => {
    //     // console.log("Cursor Position: " + cursorPositionRef.current);
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
    // }, [content]);

    useEffect(() => {
        // Prevent the editable div from getting focused on page load
        const div = divRef.current;
        if (div) {
          div.blur();
        }
    }, []);

    // const handleInput = (e) => {
    //     setContent(e.target.innerText);
    //     const selection = window.getSelection();
    //     if (selection.rangeCount > 0) {
    //         cursorPositionRef.current = selection.getRangeAt(0).startOffset;
    //     } else {
    //         cursorPositionRef.current = selection.anchorOffset;
    //     }
    // }

    const handleSpanClick = () => {
        divRef.current.focus();   
    }
    
    return (
        <div className="sm:flex hidden self-stretch p-4 justify-center items-center gap-3 border-b border-neutral-500">
            {loggedInUser.avatar && <img className="w-12 h-12 shrink-0 rounded-full" src={loggedInUser.avatar} alt="user avatar" />}
            {!loggedInUser.avatar && <div className="w-12 h-12 shrink-0 rounded-full bg-neutral-800" />}
            <div className="w-full">
                {/* <span className="text-neutral-500 font-inter text-xl absolute" id="placeholder">What's happening?!</span> */}
                {content.length===0 && <span className="text-neutral-500 font-inter text-xl absolute" id="placeholder" onClick={handleSpanClick} >{typeObj[type].text}</span>}
                {/* <div ref={divRef} contentEditable="true" className="text-white focus:outline-none placeholder:text-neutral-600 w-full caret-twitter-blue" onInput={handleInput} >
                    {content}
                </div> */}
                <Slate editor={editor} initialValue={value} onChange={newValue => setValue(newValue)} >
                    <Editable className='text-neutral-50 font-inter text-xl focus:outline-none caret-twitter-blue grow' />
                </Slate>
            </div>
            <Button size="sm" variant="blue" textColor="white" onClick={typeObj[type].handler} disabled={content.length < 1 || content.length > 280} >
                {typeObj[type].name}
            </Button>
        </div>
    )
}

PostInput.propTypes = {
    type: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    setPosts: PropTypes.func.isRequired,
    post: PropTypes.object,
    commentsCount: PropTypes.number,
    setCommentsCount: PropTypes.func,
    setPopup: PropTypes.func,
}

export default PostInput