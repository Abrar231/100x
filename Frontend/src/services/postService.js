import { apiUrl } from "../../config";
// import { avatarDataToUrl } from "./util";

// const convertAvatarToUrl = (posts) => {
//   return posts.map(post => {
//     const {repost_id} = post;
//     const User = repost_id? post.originalPost.User: post.User
//     // const User = avatarDataToUrl(rawUser);

//     if(repost_id){
//       return {...post, originalPost: {...post.originalPost, User}};
//     }
//     return {...post, User};
//     // const {avatar} = repost_id? post.originalPost.User: post.User;
//     // const avatarUrl = avatar? `data:image/${avatar.ext};base64,${avatar.data}`: null;
//     // if(repost_id){
//     //   return {...post, originalPost: {...post.originalPost, User: {...post.originalPost.User, avatar: avatarUrl}}}
//     // }
//     // // console.log(JSON.stringify({...post, User:{...post.User, avatar: avatarUrl} }));
//     // return {...post, User:{...post.User, avatar: avatarUrl}}
//   });
// }

export const getForYouFeed = async (page) => {
    const posts = await fetch(`${apiUrl}/api/post/forYouFeed?page=${page}`, {
      credentials: 'include'
    });
    return await posts.json();
}

export const getFollowingFeed = async (page) => {
    const posts = await fetch(`${apiUrl}/api/post/followingFeed?page=${page}`, {
      credentials: 'include'
    });
    return await posts.json();
}

export const getTimeDifference = (date1, date2) => {
    const diffInMilliseconds = Math.abs(date2.getTime() - date1.getTime());
  
    // Helper function to format the result
    const formatResult = (value, unit) => `${value}${unit}`;
  
    // Convert milliseconds to days
    const days = diffInMilliseconds / (1000 * 60 * 60 * 24);
    if (days >= 1) {
      const month = date1.toLocaleString('default', { month: 'short' });
      const date = date1.getDate();
      if(date1.getFullYear() !== date2.getFullYear()){
        return `${month} ${date}, ${date1.getFullYear()}`
      }
      return `${month} ${date}`;
    }
  
    // Convert milliseconds to hours
    const hours = diffInMilliseconds / (1000 * 60 * 60);
    if (hours >= 1) {
      return formatResult(Math.floor(hours), 'h');
    }
  
    // Convert milliseconds to minutes
    const minutes = diffInMilliseconds / (1000 * 60);
    if (minutes >= 1) {
      return formatResult(Math.floor(minutes), 'm');
    }
  
    // Return seconds
    const seconds = diffInMilliseconds / 1000;
    return formatResult(Math.floor(seconds), 's');
}

export const createPost = async (content, id) => {
  try {
    const post = await fetch(`${apiUrl}/api/post/createPost`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, repost_id: id }),
      credentials: 'include'
    });
    if(!post.ok){
        throw new Error('Error while creating Post');
    }
    return await post.json();
  } catch (error) {
      console.log(error);
  }
}

export const deletePost = async (id) => {
  const deletedPost = await fetch(`${apiUrl}/api/post/deletePost`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({id}),
    credentials: 'include'
  });
  return await deletedPost.json();
}

export const deleteRepost = async (repost_id) => {
  const deletedRepost = await fetch(`${apiUrl}/api/post/deleteRepost`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({repost_id}),
    credentials: 'include'
  });
  return await deletedRepost.json();
}

export const createComment = async (content, post_id) => {
  try {
    const comment = await fetch(`${apiUrl}/api/post/createComment`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, post_id }),
      credentials: 'include'
    });
    if(!comment.ok){
      throw new Error('Error while creating Comment');
    }
    const createdComment = await comment.json();
    // const User = avatarDataToUrl(createdComment.comment.User);
    return {...createdComment, comment: {...createdComment.comment, User: createdComment.comment.User}}
    // const {avatar} = createdComment.comment.User;
    // const avatarUrl = avatar? `data:image/${avatar.ext};base64,${avatar.data}`: null;
    // return {...createdComment, comment: {...createdComment.comment, User: {...createdComment.comment.User, avatar: avatarUrl}}};
  } catch (error) {
      console.log(error);
  }
}

export const deleteComment = async (id, post_id) => {
  const deletedComment = await fetch(`${apiUrl}/api/post/deleteComment`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({id, post_id}),
    credentials: 'include'
  });
  return await deletedComment.json();
}

export const createLike = async (post_id) => {
  try {
    // console.log('Inside like method in postService.js');
    const like = await fetch(`${apiUrl}/api/post/like`, {
      method: 'POST', 
      headers: {
        "Content-Type": "application/json", 
      }, 
      body: JSON.stringify({post_id}),
      credentials: 'include'
    });
    // if(!like.ok){
    //   throw new Error('Error while liking a post');
    // }
    const createdLike = await like.json();
    return createdLike;
  } catch (error) {
    console.log(error);
  }
}

export const deleteLike = async (post_id) => {
  try {
    const deletedLike = await fetch(`${apiUrl}/api/post/deleteLike`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({post_id}),
      credentials: 'include'
    });
    if(!deletedLike.ok){
      throw new Error('Error while deleting a like');
    }
    return await deletedLike.json();
  } catch (error) {
    console.log(error);
  }
}

export const getUserPosts = async (user_id, page) => {
  const posts = await fetch(`${apiUrl}/api/post/userPosts?id=${user_id}&page=${page}`, {credentials: 'include'});
  return await posts.json();
  // console.log("jsonPosts: " + JSON.stringify(jsonPosts));
  // const userPosts = convertAvatarToUrl(jsonPosts);
  // console.log("userPosts: " + JSON.stringify(userPosts));
  // return userPosts;
}

export const getPostById = async (id) => {
  const jsonPost = await fetch(`${apiUrl}/api/post/postById?id=${id}`, {credentials: 'include'});
  const post = await jsonPost.json();

  const User = post.repost_id? post.originalPost.User: post.User;
  // const User = avatarDataToUrl(post.repost_id? post.originalPost.User: post.User);

  // const {avatar} = post.User;
  // const avatarUrl = avatar? `data:image/${avatar.ext};base64,${avatar.data}`: null;
  // console.log('Post returned by getPostById:' + JSON.stringify({...post, User:{...post.User, avatar: avatarUrl} }));
  if(post.repost_id){
    return {...post, originalPost: {...post.originalPost, User}}
  }
  return {...post, User}
}

export const getCommentsForPost = async (post_id) => {
  const jsonComments = await fetch(`${apiUrl}/api/post/getComments?post_id=${post_id}`, {credentials: 'include'});
  return await jsonComments.json();
  // return convertAvatarToUrl(comments);
  // return []
}