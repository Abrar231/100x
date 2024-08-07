
import { useEffect, useState } from 'react';
import BottomNav from '../components/BottomNav'
import LeftSidebar from '../components/LeftSidebar/LeftSidebar'
import RightSidebar from '../components/RightSidebar/RightSidebar'
import Profile from '../components/UserProfile/Profile'
import { useParams } from 'react-router-dom';
import { getProfile } from '../services/userService';

function UserProfile() {
    const {username} = useParams();
    const [posts, setPosts] = useState([]);
    const [User, setUser] = useState({id: '', display_name:'', username:'', avatar:'', image:'', bio:'', link:'', location: '', follower_count:'', following_count:''});

    useEffect(() => {
        (async () => {
            const user = await getProfile(username);
            setUser({...user});
        })();
    }, [username]);

    return (
        <>
            <div className="bg-black min-h-screen">
                <main className="flex justify-center">
                    <LeftSidebar posts={posts} setPosts={setPosts} />
                    <Profile User={User} setUser={setUser} posts={posts} setPosts={setPosts} />
                    <RightSidebar />
                </main>
                <BottomNav />
            </div> 
        </>
    )
}

export default UserProfile