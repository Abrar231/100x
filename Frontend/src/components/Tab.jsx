import PropTypes from 'prop-types'

const TabItem = ({ isActive , text, ...rest }) => {
    return (
        <button className="pt-5 flex flex-col  items-center self-stretch grow" {...rest}>
            <div className="flex flex-col  gap-4">
                <div className="text-neutral-400 clig-liga-off font-medium">
                    {text}
                </div>
                { isActive ? <div className="w-full h-1 rounded-full bg-twitter-blue"/> : <div className='h-1'/> }
            </div>
        </button>
    )
}

TabItem.propTypes = {
    isActive: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
}

const Tab = ({ type, activeTab, setActiveTab }) => {
    // const [activeTab, setActiveTab] = useState("ForYou")

    const base = "self-stretch border-y border-neutral-500"

    const typeStyles = {
        mobile : "flex",
        web : "lg:flex hidden"
    }

    return (
        <div className={`${typeStyles[type]} ${base}`}>
            <TabItem text='For you' isActive={activeTab === "ForYou"} onClick={() => {
                // console.log('Clicked on ForYou Tab');
                setActiveTab("ForYou");
            }} />
            <TabItem text='Following' isActive={activeTab === "Following"} onClick={() => {
                // console.log('Clicked on ForYou Tab');
                setActiveTab("Following");
            }} />
        </div>
    )
}

Tab.propTypes = {
    type: PropTypes.string.isRequired,
    activeTab: PropTypes.string,
    setActiveTab: PropTypes.func,
}

export default Tab