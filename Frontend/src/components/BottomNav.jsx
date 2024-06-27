import homeIcon from '../assets/images/home-icon.svg'
import profileIcon from '../assets/images/profile-icon.svg'

const BottomNav = () => {
    return (
        <nav className="flex fixed bottom-0 bg-black w-full py-[18px] px-6 justify-around border border-neutral-800 lg:hidden">
            <img className="shrink-0" src={homeIcon} />
            <img className="shrink-0" src={profileIcon} />
        </nav>
    )
}

export default BottomNav