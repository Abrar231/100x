const {incrementRepostCount, createPost, findPostById, deletePost, deleteRepost, decrementRepostCount, createComment, findCommentById, incrementCommentCount, deleteComment, decrementCommentCount, findAllCommentsByPostId, createLike, incrementLikesCount, deleteLike, decrementLikesCount, getPostsByUserId, getPostsByFollowingIds, getFollowingIds, getPostsFromOthers} = require('../services/PostService.js');

const createNewPost = async (req, res) => {
    try {
        const { repost_id, content } = req.body;
        const { user_id } = req.cookies;
        
        const createdPost = await createPost(repost_id, content, user_id);
        if(!createdPost.id){
            res.status(500).send('Error while creating post');
        }

        // increment repost_count by 1
        if(repost_id){
            await incrementRepostCount(repost_id);
        }
        
        const post = await findPostById(createdPost.id, user_id);
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Error Occurred" + error);
    }
}

const destroyPost = async (req, res) => {
    try {
        const user_id = req.cookies.user_id;
        const {id} = req.body;
        const deletedPost = await deletePost(id, user_id);
        if(!deletedPost){
            return res.status(404).json({message: 'Unable to delete post', success: false});
        }
        res.status(200).json({message: 'Post deleted successfully', success: true});
    } catch (error) {
        res.status(500).json({error: 'Internal Error Occurred' + error, success: false});
    }
}

const destroyRepost = async (req, res) => {
    try {
        const user_id = req.cookies.user_id;
        const {repost_id} = req.body;
        const deletedRepost = await deleteRepost(repost_id, user_id);
        if(!deletedRepost){
            return res.status(404).json({message: 'Unable to delete repost', success: false});
        }

        // decrement repost_count by 1
        const repost_count = await decrementRepostCount(repost_id);

        res.status(200).json({message: 'Repost deleted successfully', repost_count, success: true});
    } catch (error) {
        res.status(500).json({error: 'Internal Error Occurred' + error, success: false});
    }
}

const postById = async (req, res) => {
    try {
        const { id } = req.query;
        const { user_id } = req.cookies;
        const post = await findPostById(id, user_id);
        if(!post){
            return res.status(200).json({msg: 'No post exists with given id'})
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).send('Internal Error Occurred' + error);
    }
}

const createNewComment = async (req, res) => {
    const { content, post_id } = req.body;
    const { user_id } = req.cookies;
    try {
        const createdComment = await createComment(content, user_id, post_id);
        if(!createdComment.id){
            res.status(500).send('Error while creating comment');
        }
        const comment = await findCommentById(createdComment.id);

        // increment comment_count by 1
        const comment_count = await incrementCommentCount(post_id);
        
        res.status(200).json({comment , comment_count});
    } catch (error) {
        res.status(500).send("Internal Error Occurred" + error);
    }
}

const destroyComment = async (req, res) => {
    try {
        const user_id = req.cookies.user_id;
        const {id, post_id} = req.body;
        
        const deletedComment = await deleteComment(id, user_id);
        if(!deletedComment){
            return res.status(404).json({message: 'Unable to delete comment', success: false});
        }

        // decrement comment_count by 1
        const {comment_count} = await decrementCommentCount(post_id);

        res.status(200).json({message: 'Comment deleted successfully', comment_count, success: true});
    } catch (error) {
        res.status(500).json({error: 'Internal Error Occurred' + error, success: false});
    }
}

const getComments = async (req, res) => {
    try {
        const {post_id} = req.query;
        const comments = await findAllCommentsByPostId(post_id);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).send('Internal Error Occurred' + error);
    }
}

const like = async (req, res) => {
    const { post_id } = req.body;
    const {user_id} = req.cookies;
    try {
        const like = await createLike(post_id, user_id);
        if(!like.id){
            return res.status(500).send('Error while creating like');
        }
        
        // increment likes_count by 1
        const likes_count = await incrementLikesCount(post_id);

        res.status(200).json({like, likes_count});
    } catch (error) {
        res.status(500).send('Internal Error Occurred:' + error);
    }
}

const destroyLike = async(req, res) => {
    try {
        const user_id = req.cookies.user_id;
        const {post_id} = req.body;
        
        const deletedLike = await deleteLike(post_id, user_id);
        if(!deletedLike){
            return res.status(404).send({message: 'Unable to delete like', success: false});
        }

        // decrement likes_count by 1
        const likes_count = await decrementLikesCount(post_id);

        res.status(200).send({message: 'Like deleted successfully', likes_count, success: true});
    } catch (error) {
        res.status(500).send({message: 'Internal Error Occurred' + error, success: false});
    }
}

const userPosts = async (req, res) => {
    const {user_id} = req.cookies;
    const { id, page } = req.query;
    try {
        if(!id){
            return res.status(400).send('id not available');
        }
        
        const posts = await getPostsByUserId(id, user_id, page);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).send('Internal Error Occurred '+ error);
    } 
}

const followingFeed = async (req, res) => {
    const user_id = req.cookies.user_id;
    const { page } = req.query;
    try {
        let ids = await getFollowingIds(user_id);
        ids = [user_id, ...ids];
        
        const posts = await getPostsByFollowingIds(ids, user_id, page);
        res.status(200).json({posts, feedType: 'FL'});
    } catch (error) {
        res.status(500).send('Internal Error Occurred' + error);
    }
}

const forYouFeed = async (req, res) => {
    const user_id = req.cookies.user_id;
    const { page } = req.query;
    try {
        const ids = await getFollowingIds(user_id);
        
        const postsFromOther = await getPostsFromOthers(ids, user_id, page);
      
        const postsFromFollowing = await getPostsByFollowingIds(ids, user_id, page);

        const posts = postsFromOther.reduce((acc, item, index) => {
            acc.push(item);
            if (postsFromFollowing[index] !== undefined) {
              acc.push(postsFromFollowing[index]);
            }
            return acc;
        }, []).concat(postsFromFollowing > postsFromOther ? postsFromFollowing.slice(postsFromOther.length) : []);
        
        res.status(200).json({posts, others: postsFromOther.length, following: postsFromFollowing.length, feedType: 'FY'});
    } catch (error) {
        res.status(500).send('Internal Error Occurred' + error);
    }
}

module.exports = {createNewPost, destroyPost, destroyRepost, postById, createNewComment, destroyComment, getComments, like, destroyLike, userPosts, followingFeed, forYouFeed}