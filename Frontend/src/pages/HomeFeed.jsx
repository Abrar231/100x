import Header from '../components/HomeFeed/Header'
import LeftSidebar from '../components/LeftSidebar/LeftSidebar'
import RightSidebar from '../components/RightSidebar/RightSidebar'
import BottomNav from '../components/BottomNav'
import RoundButton from '../components/RoundButton'
import Feed from '../components/HomeFeed/Feed'
import { useState } from 'react'


function HomeFeed() {
    const [posts, setPosts] = useState([]);

    return (
        <div className="bg-black min-h-screen">
            <Header/>
            <main className="flex justify-center">
                <LeftSidebar posts={posts} setPosts={setPosts} />
                <Feed posts={posts} setPosts={setPosts} />
                <RightSidebar />
            </main>
            <BottomNav />
            <RoundButton />
        </div>
    )
}

export default HomeFeed;