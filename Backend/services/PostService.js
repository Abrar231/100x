const db = require('../models/index.js');
const { removeCircularReference } = require('../utility.js');
const { Op } = require('sequelize');

const size = 20; // Pagination size

const getIsLiked = async (post_id, user_id) => {
    const isLiked = await db.Like.findOne({where : {post_id, user_id}});
    return isLiked? true: false;
}

const getIsReposted = async (repost_id, user_id) => {
    const isReposted = await db.Post.findOne({where: {repost_id, user_id}});
    return isReposted? true: false;
}

const markLiked_Repost = async (postList, user_id) => {
    return await Promise.all(postList.map(async rawPost => {
        const post = removeCircularReference(rawPost);
        const {originalPost} = post;
        const {User, id} = originalPost? originalPost: post;
        const is_liked = await getIsLiked(id, user_id);
        const is_reposted = await getIsReposted(id, user_id);
        
        if(post.originalPost){
            return {
                ...post,
                originalPost: {...post.originalPost, is_liked, is_reposted, User}

            };
        }
        return {...post, is_liked, is_reposted, User};
    }));
}

const incrementRepostCount = async (repost_id) => {
    const [noOfRows, [updatedRows]] = await db.Post.update(
        {repost_count: db.Sequelize.literal('repost_count + 1')},
        {where: {id: repost_id}, returning: true}
    );
    return updatedRows.repost_count;
}

const createPost = async (repost_id, content, user_id) => {
    const postData = repost_id?
                        {repost_id}:
                        {content, comment_count: 0, repost_count: 0, likes_count: 0, views_count: 0};
    return await db.Post.create({...postData, user_id, posted_at: new Date(), });
}

const findPostById = async (id, user_id) => {
    const rawPost = await db.Post.findOne({
        where: {id},
        include: [{
            model: db.User,
            attributes: ['display_name', 'username', 'avatar']
        },{
            association: 'originalPost',
            include: {
                model: db.User,
                attributes: ['display_name', 'username', 'avatar']
            }
        }]
    });
    if(!rawPost){
        return false;
    }
    const post = await markLiked_Repost([rawPost], user_id);
    return post[0];
}

const deletePost = async (id, user_id) => {
    return await db.Post.destroy({where: {id, user_id}});
}

const deleteRepost = async (repost_id, user_id) => {
    return await db.Post.destroy({where: {repost_id, user_id}});
}

const decrementRepostCount = async (id) => {
    const [noOfRows, [updatedRows]] = await db.Post.update(
        {repost_count: db.Sequelize.literal('repost_count - 1')},
        {where: {id}, returning: true}
    );
    return updatedRows.repost_count;
}

const createComment = async (content, user_id, post_id) => {
    return await db.Comment.create({content, user_id, post_id, replied_at: new Date()});
}

const findCommentById = async (id) => {
    return await db.Comment.findOne({
        where: {id},
        include: {
            model: db.User,
            attributes: ['display_name', 'username', 'avatar']
        },
    });
}

const incrementCommentCount = async (post_id) => {
    const [noOfRows, [updatedRows]] = await db.Post.update(
        {comment_count: db.Sequelize.literal('comment_count + 1')},
        {where: {id: post_id}, returning: true}
    );
    return updatedRows.comment_count;
}

const deleteComment = async (id, user_id) => {
    return await db.Comment.destroy({where: {id, user_id}});
}

const decrementCommentCount = async (post_id) => {
    const [noOfRows, [updatedRows]] = await db.Post.update(
        {comment_count: db.Sequelize.literal('comment_count - 1')},
        {where: {id: post_id}, returning: true}
    );
    return updatedRows.comment_count;
}

const findAllCommentsByPostId = async (post_id) => {
    return await db.Comment.findAll({
        where: {post_id},
        include: {
            model: db.User,
            attributes: ['display_name', 'username', 'avatar'],
        },
        order: [
            ['replied_at', 'DESC'], // Order by the 'createdAt' column in descending order
        ],
    });
}

const createLike = async (post_id, user_id) => {
    return await db.Like.create({post_id, user_id, liked_at: new Date()});
}

const incrementLikesCount = async (post_id) => {
    const [noOfRows, [updatedRows]] = await db.Post.update(
        {likes_count: db.Sequelize.literal('likes_count + 1')},
        {where: {id: post_id}, returning: true}
    );
    return updatedRows.likes_count;
}

const deleteLike = async (post_id, user_id) => {
    return await db.Like.destroy({where: {post_id, user_id}});
}

const decrementLikesCount = async (post_id) => {
    const [noOfRows, [updatedRows]] = await db.Post.update(
        {likes_count: db.Sequelize.literal('likes_count - 1')},
        {where: {id: post_id}, returning: true}
    );
    return updatedRows.likes_count;
}

const getPostsByUserId = async (id, user_id, page) => {
    const postList = await db.Post.findAll({
        limit: size,
        offset: page * size,
        where: { user_id: id },
        order: [
            ['posted_at', 'DESC'], // Order by the 'createdAt' column in descending order
        ],
        include: [{
            model: db.User,
            attributes: ['display_name', 'username', 'avatar']
        },{
            association: 'originalPost',
            include: {
                model: db.User,
                attributes: ['display_name', 'username', 'avatar']
            }
        }]
    });
    return await markLiked_Repost(postList, user_id);
}

const getPostsByFollowingIds = async (ids, user_id, page) => {
    let postList = await db.Post.findAll({
        limit: size,
        offset: page * size,
        where: {
            user_id: {
                [Op.in]: ids,
            },
        },
        order: [
            ['posted_at', 'DESC'], // Order by the 'createdAt' column in descending order
        ],
        include: [{
            model: db.User,
            attributes: ['display_name', 'username', 'avatar']
        },
        {
            association: 'originalPost',
            include: {
                model: db.User,
                attributes: ['display_name', 'username', 'avatar']
            }
        }],
    });

    return await markLiked_Repost(postList, user_id);
}

const getFollowingIds = async (user_id) => {
    const followingIds = await db.Following.findAll({
        attributes: ['user_id'],
        where: {follower_id: user_id}
    });
  
    return followingIds.map(row => row.user_id);
}

const getPostsFromOthers = async (ids, user_id, page) => {
    const postList = await db.Post.findAll({
        limit: size,
        offset: page * size,
        where: {
            user_id: {
                [Op.notIn]: ids,
            },
        },
        order: [
            ['posted_at', 'DESC'], // Order by the 'createdAt' column in descending order
        ],
        include: [{
            model: db.User,
            attributes: ['display_name', 'username', 'avatar']
        },
        {
            association: 'originalPost',
            include: {
                model: db.User,
                attributes: ['display_name', 'username', 'avatar']
            }
        }]
    });
    return await markLiked_Repost(postList, user_id);
}

module.exports = {incrementRepostCount, createPost, findPostById, deletePost, decrementRepostCount, createComment, findCommentById, incrementCommentCount, deleteComment, deleteRepost, decrementCommentCount, findAllCommentsByPostId, createLike, incrementLikesCount, deleteLike, decrementLikesCount, getPostsByUserId, getPostsByFollowingIds, getFollowingIds, getPostsFromOthers}