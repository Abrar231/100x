import { useParams } from "react-router-dom"
import BottomNav from "../components/BottomNav"
import LeftSidebar from "../components/LeftSidebar/LeftSidebar"
import PostDetail from "../components/PostDetail"
import RightSidebar from "../components/RightSidebar/RightSidebar"


function PostPage() {
    const {id} = useParams();
    // const [post, setPost] = useState(null);
    // const [comments, setComments] = useState([]);

    return (
        <div className="bg-black min-h-screen">
            <main className="flex justify-center">
                <LeftSidebar posts={[]} setPosts={() => {}} />
                {/* <PostDetail post={post} comments={comments} /> */}
                <PostDetail id={id} />
                <RightSidebar />
            </main>
            <BottomNav />
        </div> 
    )
}

export default PostPage