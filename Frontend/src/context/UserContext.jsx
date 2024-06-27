import { createContext } from "react";
import profileAvatar from '../assets/images/profile-user-avatar.png'
// import profileImage from '../assets/images/profile-image.png'

export const UserContext = createContext({ display_name : "", username: "", avatar: profileAvatar})