import closeButton from '../assets/images/create-account-1-signup-x.svg'
import { forwardRef, useCallback, useContext, useEffect, useState } from 'react'
import Button from './Button'
import PropTypes from 'prop-types'
import { createPost } from '../services/postService';
import { UserContext } from '../context/UserContext';
import { useLocation } from 'react-router-dom';
import { Editor, Transforms, createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

// eslint-disable-next-line react/display-name
const CreatePost = forwardRef(( {posts, setPosts, setPopup} , ref ) => {
    const {loggedInUser} = useContext(UserContext);
    const { avatar } = loggedInUser;
    const [postContent, setPostContent] = useState("");
    // const cursorPositionRef = useRef(null);
    const location = useLocation();
    // const divRef = useRef(null);

    const [editor] = useState(() => withReact(createEditor()));
    const [value, setValue] = useState([
        {
          type: 'paragraph',
          children: [{ text: '' }],
        },
    ]);

    useEffect(() => {
        if (value[0]?.children[0]?.text !== undefined) {
            setPostContent(value[0].children[0].text);
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
    // }, [postContent]);

    // const handleInput = (e) => {
    //     setPostContent(e.target.innerText);
    //     const selection = window.getSelection();
    //     if (selection.rangeCount > 0) {
    //         cursorPositionRef.current = selection.getRangeAt(0).startOffset;
    //     } else {
    //         cursorPositionRef.current = selection.anchorOffset;
    //     }
    // }

    const handlePost = async () => {
        const repost_id = null;
        const createdPost = await createPost(postContent, repost_id);
        if(createdPost.id){
            clearEditor();
            const pathname = location.pathname.indexOf('/', 1) === -1? location.pathname: location.pathname.substring(0, location.pathname.indexOf('/', 1));
            if(pathname === '/home' || pathname === `/${loggedInUser.username}` ){
                setPosts([createdPost, ...posts]);
            }
            ref.current.close();
            setPopup({show: true, text: 'Post created successfully.'})
            setTimeout(() => {
                setPopup({show: false, text:''})
            }, 3000);
        }
        // console.log('Posts logging inside handlePost: ' + JSON.stringify(posts));
    }

    return (
        <dialog ref={ref} className="bg-black backdrop:bg-blue-wash py-2.5 px-4 rounded-2xl">
            <div className="flex w-[480px] flex-col justify-center items-start gap-3 min-h-[320px]">
                <div className="flex py-3 items-center self-stretch">
                    <button onClick={() => {ref.current.close();}}>
                        <img src={closeButton} />
                    </button>
                </div>
                <div className="flex items-start gap-3 w-full grow ">
                    <img className="shrink-0 rounded-[200px]" src={avatar} alt="user avatar" />
                    <div className="flex  grow self-stretch">
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        {postContent.length===0 &&  <span className="text-neutral-600 font-inter text-xl absolute pointer-events-none" id="placeholder">What's happening?!</span>}
                        {/* <div ref={divRef} id="tweet-content" autoFocus contentEditable="true" className="text-neutral-50 font-inter text-xl focus:outline-none caret-twitter-blue grow" onInput={handleInput}>
                            {postContent}
                        </div> */}
                        <Slate editor={editor} initialValue={value} onChange={newValue => setValue(newValue)} >
                            <Editable className='text-neutral-50 font-inter text-xl focus:outline-none caret-twitter-blue grow' />
                        </Slate>
                    </div>
                </div>
                <div className="flex w-[480px] py-3 justify-between items-center">
                    <div className="text-neutral-400 font-inter text-sm">
                        {postContent.length}/280
                    </div>
                    <Button size="sm" variant="blue" textColor="white" onClick={handlePost} disabled={postContent.length < 1 || postContent.length > 280} >
                        Post
                    </Button>
                </div>
            </div>
        </dialog>
    )
});

CreatePost.propTypes = {
    posts: PropTypes.array.isRequired,
    setPosts: PropTypes.func.isRequired,
    setPopup: PropTypes.func.isRequired,
}

export default CreatePost