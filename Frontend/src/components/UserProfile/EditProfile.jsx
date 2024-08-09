import x from '../../assets/images/x.svg'
import addPhoto from '../../assets/images/material-symbols-add-a-photo-outline.svg'
import Input from '../../components/Input'
import { forwardRef, useContext, useRef, useState, } from 'react'
import leftArrow from '../../assets/images/arrow-left.svg'
import Textarea from '../../components/Textarea'
import Button from '../Button'
import { UserContext } from '../../context/UserContext'
import PropTypes from 'prop-types'
import { updateUser } from '../../services/userService'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { apiUrl } from '../../../config'

// eslint-disable-next-line react/display-name
const EditProfile = forwardRef(({closeDialog, User, setUser, setPopup}, ref) => {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    const avatarRef = useRef(null);
    const bgImageRef = useRef(null);
    const [avatar, setAvatar] = useState(User.avatar? User.avatar: null);
    const [bgImage, setBgImage] = useState(User.image? User.image: null);
    const [isAvatarChanged, setIsAvatarChanged] = useState(false);
    const [isBgImageChanged, setIsBgImageChanged] = useState(false);

    const handleAvatarInput = (event, setFieldValue) => {
        const file = event.target.files[0];
        setIsAvatarChanged(true);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
                setFieldValue('avatar', file);
            };
            reader.readAsDataURL(file);
          } else {
            setAvatar(null);
            setFieldValue('avatar', null);
        }
    };

    const handleAvatarClick = (e) => {
        e.preventDefault();
        avatarRef.current.click();
    };

    const handleBgImageInput = (event, setFieldValue) => {
        const file = event.target.files[0];
        setIsBgImageChanged(true);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBgImage(reader.result);
                setFieldValue('bgImage', file);
            };
            reader.readAsDataURL(file);
          } else {
            setBgImage(null);
            setFieldValue('bgImage', null);
        }
    };

    const handleBgImageClear = (e, setFieldValue) => {
        e.preventDefault();
        setIsBgImageChanged(true);
        setBgImage(null);
        setFieldValue('bgImage', null);
    }

    const handleBgImageClick = (e) => {
        e.preventDefault();
        bgImageRef.current.click();
    };

    return (
        <dialog ref={ref} className="bg-black backdrop:bg-blue-wash w-[512px] rounded-2xl">
            {ref.current && ref.current.open && <Formik
                initialValues={{
                    display_name: User.display_name,
                    bio: User.bio,
                    location: User.location,
                    link: User.link,
                    avatar: User.avatar,
                    bgImage: User.image,
                }}
                validationSchema={Yup.object({
                    display_name: Yup.string()
                        .max(50, 'Must be 50 characters or less')
                        .required('Required'),
                    bio: Yup.string()
                        .max(160, 'Must be 160 characters or less').notRequired(),
                    link: Yup.string()
                        .max(100, 'Must be 100 characters or less').notRequired(),
                    location: Yup.string()
                        .max(30, 'Must be 30 characters or less').notRequired(),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        let formData = new FormData();
                        for (const [key, value] of Object.entries(values)) {
                            console.log(`Key: ${key}, Value: ${value}`);
                            console.log(`HI`);
                            if((key === 'avatar' && !isAvatarChanged) || (key === 'bgImage' && !isBgImageChanged) || (!(key === 'bgImage') && !value)){
                                continue;
                            }
                            formData.append(key, value);
                        }
                        
                        // API call to update Profile
                        const updatedUser = await updateUser(formData);

                        // Update loggedInUser and User
                        if(updatedUser.success){
                            const {avatar, display_name} = updatedUser.User;
                            if(avatar){
                                setLoggedInUser({...loggedInUser, display_name, avatar });
                            } else {
                                setLoggedInUser({...loggedInUser, display_name });
                            }
                            setUser({...User, ...updatedUser.User});
                            closeDialog();
                            setIsAvatarChanged(false);
                            setIsBgImageChanged(false);
                            setPopup({show: true, text: 'Profile updated successfully.'});
                            setTimeout(() => {
                                setPopup({show: false, text:''});
                            }, 3000);
                        }

                        // Call closeDialog fn
                        setSubmitting(false);
                    } catch (error) {
                        setPopup({show: true, text: error});
                        setTimeout(() => {
                            setPopup({show: false, text:''});
                        }, 3000);
                    }
                }}
            >
                {({isValid, setFieldValue}) => {
                    return <Form>
                        <div  className="flex py-5 px-4 flex-col items-start gap-5">
                            <div className="flex py-3 justify-between items-center self-stretch">
                                <div className="flex items-center gap-5">
                                    <button onClick={closeDialog}>
                                        <img src={leftArrow} />
                                    </button>
                                    <div className="text-neutral-50 font-inter font-bold">
                                        Edit profile
                                    </div>
                                </div>
                                <Button size="sm" variant="white" textColor="black" type='submit' disabled={!isValid} >
                                    Save
                                </Button>
                            </div>
                            <div className="flex flex-col items-start gap-3 self-stretch relative">
                                <div className="flex justify-center items-center self-stretch">
                                    <div className='w-full'>
                                        {bgImage && <img className="w-full h-full" src={bgImage} />}
                                        {!bgImage && <div className='w-full h-64 border border-neutral-500'></div>}
                                    </div>
                                    <div className="flex items-start gap-2 absolute">
                                        <input ref={bgImageRef} type="file" name="bgImage" className='hidden' onChange={(event) => handleBgImageInput(event, setFieldValue)} />
                                        <button  className="flex p-2 justify-center items-center gap-2.5 rounded-[100px] bg-black/60" onClick={handleBgImageClick}>
                                            <img src={addPhoto} />
                                        </button>
                                        <button  className="flex p-2 justify-center items-center gap-2.5 rounded-[100px] bg-black/60" onClick={(event) => handleBgImageClear(event, setFieldValue)}>
                                            <img src={x} />
                                        </button>
                                    </div>
                                </div>
                                <div className="relative flex self-stretch justify-between ml-3">
                                    <div className="relative w-1/4 h-auto mb-3 min-w-[50px] -mt-[15%] flex justify-center items-center">
                                        <input ref={avatarRef} type="file" name="avatar" className='hidden' onChange={(event) => handleAvatarInput(event, setFieldValue)} />
                                        <button className="absolute flex p-2 justify-center items-center rounded-[1000px] bg-black/60"  onClick={handleAvatarClick}>
                                            <img src={addPhoto} />
                                        </button>
                                        {avatar && <img className="w-full h-full border-4 border-black rounded-full" src={avatar} />}
                                        {!avatar && <div className='w-full aspect-square border border-neutral-800 bg-black rounded-full' />}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-5 self-stretch">
                                <Field component={Input} label="Name" name='display_name' />
                                <Field component={Textarea} label="Bio" name='bio' />
                                <Field component={Input} label="Location" name='location' />
                                <Field component={Input} label="Website" name='link' />
                            </div>
                        </div>
                    </Form>
                }}
            </Formik>}
        </dialog>
    )
});

EditProfile.propTypes= {
    closeDialog: PropTypes.func,
    User: PropTypes.object,
    setUser: PropTypes.func,
    setPopup: PropTypes.func,
}

export default EditProfile