export const avatarDataToUrl = (User) => {
    const {avatar, image} = User;
    const avatarUrl = avatar? `data:image/${avatar.ext};base64,${avatar.data}`: null;
    const imageUrl = image? `data:image/${image.ext};base64,${image.data}`: null;

    if(!!avatar && !!image){
        return {...User, avatar: avatarUrl, image: imageUrl};
    }
    if(avatar){
        return {...User, avatar: avatarUrl};
    }
    if(image){
        return {...User, image: imageUrl};
    }
    return User;
}