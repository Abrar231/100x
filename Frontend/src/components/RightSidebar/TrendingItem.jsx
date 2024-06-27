import vectorIcon from '../../assets/images/vector.svg'
import PropTypes from 'prop-types'

const TrendingItem = ({ topicName, noOfPosts }) => {
    return (
        <div className="flex w-full py-2.5 px-4 items-start gap-4">
            <div className="flex flex-col items-start gap-1.5 grow shrink-0 basis-0">
                <div className="flex justify-center items-center gap-1.5 self-stretch">
                    <div className="grow shrink-0 basis-0 text-neutral-500 text-sm">
                        Trending
                    </div>
                    <img src={vectorIcon} />
                </div>
                <div className="grow shrink-0 basis-0 font-inter font-bold text-neutral-50">
                    {topicName}
                </div>
                <div className="text-neutral-500 font-inter text-sm">
                    {noOfPosts} posts
                </div>
            </div>
        </div>
    )
}

TrendingItem.propTypes = {
    topicName: PropTypes.string.isRequired,
    noOfPosts: PropTypes.string.isRequired,
}

export default TrendingItem