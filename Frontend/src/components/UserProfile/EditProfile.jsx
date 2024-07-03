import x from '../../assets/images/x.svg'
import addPhoto from '../../assets/images/material-symbols-add-a-photo-outline.svg'
// import image18 from '../../assets/images/profile-edit-1-image-18.png'
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

// eslint-disable-next-line react/display-name
const EditProfile = forwardRef(({closeDialog, User, setUser, setPopup}, ref) => {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    // created profile state to prevent re-renders of UserProvider due to changes in Input elements
    // const [profile, setProfile] = useState({bio: User.bio, location: User.location, name: User.display_name, website: User.link});
    const avatarRef = useRef(null);
    const bgImageRef = useRef(null);
    // const {avatar, image} = User;
    const [avatar, setAvatar] = useState(User.avatar);
    const [bgImage, setBgImage] = useState(User.image);
    const [isAvatarChanged, setIsAvatarChanged] = useState(false);
    const [isBgImageChanged, setIsBgImageChanged] = useState(false);
    // const [avatarData, setAvatarData] = useState(null);
    // const [bgImageData, setBgImageData] = useState(null);
    // const [bgImage, setBgImage] = useState(null);

    // const handleAvatarInput = (event) => {
    //     const file = event.target.files[0];
    //     setAvatarData(file);
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = () => {
    //             setAvatar(reader.result);
    //         };
    //         reader.readAsDataURL(file);
    //       } else {
    //         setAvatar(null);
    //     }
    //     console.log('File uploaded:', event.target.files[0]);
    // };

    const handleAvatarInput = (event, setFieldValue) => {
        const file = event.target.files[0];
        setIsAvatarChanged(true);
        // setAvatarData(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatar(reader.result);
                setFieldValue('avatar', file);
            };
            reader.readAsDataURL(file);
          } else {
            setAvatar(null);
            setFieldValue('avatar', null);
        }
        // console.log('File uploaded:', event.target.files[0]);
    };

    // const handleAvatarUpload = () => {
    //     // Your file upload logic goes here
    //     // You can use an API or handle the upload on the server-side
    //     console.log('File uploaded:', avatar);
    // };

    const handleAvatarClick = (e) => {
        e.preventDefault();
        avatarRef.current.click();
    };

    // const handleBgImageInput = (event) => {
    //     const file = event.target.files[0];
    //     setBgImageData(file);
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = () => {
    //             setBgImage(reader.result);
    //         };
    //         reader.readAsDataURL(file);
    //       } else {
    //         setBgImage(null);
    //     }
    //     console.log('Background Image File uploaded:', event.target.files[0]);
    // };

    const handleBgImageInput = (event, setFieldValue) => {
        const file = event.target.files[0];
        // setBgImageData(file);
        setIsBgImageChanged(true);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setBgImage(reader.result);
                setFieldValue('bgImage', file);
            };
            reader.readAsDataURL(file);
          } else {
            setBgImage(null);
            setFieldValue('bgImage', null);
        }
        // console.log('Background Image File uploaded:', event.target.files[0]);
    };

    const handleBgImageClear = (e, setFieldValue) => {
        e.preventDefault();
        setIsBgImageChanged(true);
        setBgImage(null);
        setFieldValue('bgImage', null);
    }

    // const handleBgImageUpload = () => {
    //     // Your file upload logic goes here
    //     // You can use an API or handle the upload on the server-side
    //     console.log('Background Image File uploaded:', bgImage);
    // };

    const handleBgImageClick = (e) => {
        e.preventDefault();
        bgImageRef.current.click();
    };

    // const handleClick = async (e) => {
    //     e.preventDefault();
    //     console.log('Form submited');
    //     let formData = new FormData();
    //     formData.append('avatar', avatarData);
    //     formData.append('bgImage', bgImageData);
    //     formData.append('profile', profile);
    //     console.log(formData);

    //     // Commenting folowing to get formData.

    //     // API call to update Profile
    //     const updatedUser = await updateUser(formData);

    //     // Update loggedInUser and User
    //     if(updatedUser.success){
    //         const {avatar, display_name} = updatedUser.User;
    //         setLoggedInUser({...loggedInUser, display_name, avatar });
    //         setUser({...User, ...updatedUser.User});
            
    //         // console.log("loggedInUser: " + JSON.stringify({...loggedInUser, display_name: profile.name, avatar }));
    //         // console.log("User: " + JSON.stringify({...User, ...data, avatar, image}));
    //     }

    //     // Call closeDialog fn
    //     closeDialog();

    //     // console.log(loggedInUser);
    //     // console.log("updatedUser: " + updatedUser);
    //     // console.log("avatar: " + avatar);
    // }

    // const avatarUrlToData = (str) => {
    //     if(!str){
    //         return null;
    //     }
    //     const commaIndex = str.indexOf(',');
    //     if (commaIndex !== -1) {
    //       return str.substring(commaIndex + 1);
    //     }
    //     return null;
    // }

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
                // {name: "", email: "", "date of birth": "", day: "", month: "", year: "", password: ""}
                validationSchema={Yup.object({
                    display_name: Yup.string()
                        .max(50, 'Must be 50 characters or less')
                        .required('Required'),
                    bio: Yup.string()
                        .max(160, 'Must be 160 characters or less'),
                    link: Yup.string()
                        .max(100, 'Must be 100 characters or less'),
                    location: Yup.string()
                        .max(30, 'Must be 30 characters or less'),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        let formData = new FormData();
                        // formData.append('avatar', avatarData);
                        // formData.append('bgImage', bgImageData);
                        // formData.append('profile', values);
                        for (const [key, value] of Object.entries(values)) {
                            // console.log(`Key: ${key}, isAvatarChanged: ${isAvatarChanged} & isBgImageChanged: ${isBgImageChanged}, value: ${value}}`);
                            if((key === 'avatar' && !isAvatarChanged) || (key === 'bgImage' && !isBgImageChanged)){
                                continue;
                            }
                            formData.append(key, value);
                        }
                        // console.log("Values: " + JSON.stringify(values));
                        
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
                            
                            // console.log("loggedInUser: " + JSON.stringify({...loggedInUser, display_name: profile.name, avatar }));
                            // console.log("User: " + JSON.stringify({...User, ...data, avatar, image}));
                        }

                        // Call closeDialog fn
                        setSubmitting(false);
                    } catch (error) {
                        console.log(error);
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
                                        {/* <input ref={bgImageRef} type="file" name="bgImage" className='h-0 w-0 opacity-0 absolute -z-10' onChange={handleBgImageInput} /> */}
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
                                        {/* <input ref={avatarRef} type="file" name="avatar" className='h-0 w-0 opacity-0 absolute -z-10' onChange={handleAvatarInput} /> */}
                                        <input ref={avatarRef} type="file" name="avatar" className='hidden' onChange={(event) => handleAvatarInput(event, setFieldValue)} />
                                        <button className="absolute flex p-2 justify-center items-center rounded-[1000px] bg-black/60"  onClick={handleAvatarClick}>
                                            <img src={addPhoto} />
                                        </button>
                                        {avatar && <img className="w-full h-full border-4 border-black rounded-full" src={avatar} />}
                                        {!avatar && <div className='w-full aspect-square border border-neutral-500 bg-black rounded-full' />}
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