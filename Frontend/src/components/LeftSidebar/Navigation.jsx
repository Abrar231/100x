import { useContext } from 'react'
import homeIcon from '../../assets/images/home-icon.svg'
import profileIcon from '../../assets/images/profile-icon.svg'
import NavigationItem from './NavigationItem'
import { UserContext } from '../../context/UserContext'

const Navigation = () => {
    const { loggedInUser } = useContext(UserContext);

    return (
        <div className="flex flex-col self-stretch">
            <NavigationItem image={homeIcon} label="Home" href="/home" />
            <NavigationItem image={profileIcon} label="Profile" href={`/${loggedInUser.username}`} />
        </div>
    )
}

export default Navigation