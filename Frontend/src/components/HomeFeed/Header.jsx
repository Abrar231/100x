import login100 from '../../assets/images/login-100.svg'
import loginX from '../../assets/images/login-x.svg'
import userAvatar from '../../assets/images/user-avatar.png'
import Tab from '../Tab'

const Header = () => {
    return (
        <header className="lg:hidden">
            <div className="flex w-full py-3 px-4 items-center justify-between border border-neutral-700">
                <img src={userAvatar} />
                <div className="flex">
                    <img src={login100} />
                    <img src={loginX} />
                </div>
                <div></div>
            </div>
            {/* FOr you/ Following */}
            <Tab type='mobile'/>
        </header>
    )
}

export default Header