import { useParams } from "react-router-dom"
import BottomNav from "../components/BottomNav"
import LeftSidebar from "../components/LeftSidebar/LeftSidebar"
import PostDetail from "../components/PostDetail"
import RightSidebar from "../components/RightSidebar/RightSidebar"


function PostPage() {
    const {id} = useParams();

    return (
        <div className="bg-black min-h-screen">
            <main className="flex justify-center">
                <LeftSidebar posts={[]} setPosts={() => {}} />
                <PostDetail id={id} />
                <RightSidebar />
            </main>
            <BottomNav />
        </div> 
    )
}

export default PostPage