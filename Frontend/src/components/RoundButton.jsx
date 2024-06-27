import postButton from '../assets/images/copy-link-buttons-content-content-add.svg'

const RoundButton = () => {
    return (
        <button className="inline-flex p-4 lg:hidden items-start gap-2.5 rounded-[32px] bg-twitter-blue shadow-lg shadow-black/25 fixed right-5 bottom-16">
            <img src={postButton} />
        </button>
    )
}

export default RoundButton