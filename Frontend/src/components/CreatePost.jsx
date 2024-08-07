import closeButton from '../assets/images/create-account-1-signup-x.svg'
import { forwardRef, useCallback, useContext, useEffect, useState } from 'react'
import Button from './Button'
import PropTypes from 'prop-types'
import { createPost } from '../services/postService';
import { UserContext } from '../context/UserContext';
import { useLocation } from 'react-router-dom';
import { Editor, Transforms, createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { apiUrl } from '../../config';

// eslint-disable-next-line react/display-name
const CreatePost = forwardRef(( {posts, setPosts, setPopup} , ref ) => {
    const {loggedInUser} = useContext(UserContext);
    const { avatar } = loggedInUser;
    const [postContent, setPostContent] = useState("");
    const location = useLocation();

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
                    {avatar && <img className="shrink-0 rounded-[200px]" src={avatar} alt="user avatar" />}
                    {!avatar && <div className="w-10 h-10 shrink-0 rounded-[200px] bg-neutral-800" />}
                    <div className="flex  grow self-stretch">
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        {postContent.length===0 &&  <span className="mt-2 text-neutral-600 font-inter text-xl absolute pointer-events-none" id="placeholder">What's happening?!</span>}
                        <Slate editor={editor} initialValue={value} onChange={newValue => setValue(newValue)} >
                            <Editable className='text-neutral-50 font-inter text-xl focus:outline-none caret-twitter-blue grow mt-2' />
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