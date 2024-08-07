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


const removeCircularReference = (article) => {
    const stringified = JSON.stringify(article, replacer);
    return JSON.parse(stringified);
}

module.exports = { removeCircularReference }