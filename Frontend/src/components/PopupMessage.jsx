import PropTypes from 'prop-types'

const PopupMessage = ({text}) => {
    return (
        <div className="py-3 px-8 justify-center items-center gap-2.5 fixed transform -translate-x-1/2 left-1/2 bottom-10 rounded-[100px] bg-twitter-blue z-10">
            <p className="text-neutral-50 text-[15px] ">
                {text}
            </p>
        </div>
    )
}

PopupMessage.propTypes = {
    text: PropTypes.string.isRequired,
}

export default PopupMessage