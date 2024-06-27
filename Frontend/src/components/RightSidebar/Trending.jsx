import TrendingItem from './TrendingItem'
import PropTypes from 'prop-types'

const Trending = ({ topics }) => {
    return (
        <div className="flex w-full flex-col items-start rounded-2xl border border-modal">
            <div className="flex py-2.5 px-4 items-center self-stretch text-neutral-50 font-inter text-xl font-bold">
                What’s happening
            </div>
            <section className='w-full'>
                {topics.map(topic => <TrendingItem key={topic.id} topicName={topic.topicName} noOfPosts={topic.noOfPosts} />)}
            </section>
            <div className="flex p-4 items-start self-stretch text-twitter-blue font-inter text-sm">
                Show more
            </div>
        </div>
    )
}

Trending.propTypes = {
    topics: PropTypes.array.isRequired,
}

export default Trending