
import Search from '../Search'
import Trending from './Trending'

const RightSidebar = () => {
    const topics = [
        { id: 1, topicName: "#Topic1", noOfPosts: "2,345" },
        { id: 2, topicName: "#Topic2", noOfPosts: "1,687" },
        { id: 3, topicName: "#Topic3", noOfPosts: "940" },
    ]

    return (
        <div className="md:flex  hidden min-w-[320px] pt-2.5 px-5 flex-col items-start gap-4">
            <Search />
            <Trending topics={topics} />
        </div>
    )
}

export default RightSidebar