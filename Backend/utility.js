const { readFile } = require('fs/promises');
const path = require('path');

const replacer = (key, value) => {
    const seen = new WeakSet();

    function traverseObject(obj) {
        if (obj instanceof Date) {
            // Handle Date objects by converting them to ISO strings
            return obj.toISOString();
        }

        if (typeof obj !== 'object' || obj === null) {
            return obj;
        }

        if (seen.has(obj)) {
            // Handle circular reference here
            return '[Circular Reference]';
        }

        seen.add(obj);

        if (Array.isArray(obj)) {
            return obj.map(item => traverseObject(item));
        }

        const result = {};
        for (const [k, v] of Object.entries(obj)) {
            result[k] = traverseObject(v);
        }

        return result;
    }

    return traverseObject(value);
}

const avatarUrlToData = async (User) => {
    const {avatar, image} = User;
    const avatarData = avatar && await readFile(avatar);
    const imageData = image && await readFile(image);

    if(!!avatar && !!image){
        return {...User, 
            avatar: avatar? {
                data: avatarData.toString('base64'),
                ext: path.extname(avatar).substring(1)
            }: null,
            image: image? {
                data: imageData.toString('base64'),
                ext: path.extname(image).substring(1)
            }: null,
        }
    }

    if(image){
        return {...User,
            image: image? {
                data: imageData.toString('base64'),
                ext: path.extname(image).substring(1)
            }: null,
        }
    }

    if(avatar){
        return {...User, 
            avatar: avatar? {
                data: avatarData.toString('base64'),
                ext: path.extname(avatar).substring(1)
            }: null,
        }
    }

    return User;
}

const removeCircularReference = (article) => {
    const stringified = JSON.stringify(article, replacer);
    return JSON.parse(stringified);
}

module.exports = { avatarUrlToData, removeCircularReference }