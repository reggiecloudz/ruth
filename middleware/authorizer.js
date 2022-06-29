var authorizer = {};

/**
 * @description determine if an array contains one or more items from another array.
 * @param {array} haystack the array to search.
 * @param {array} arr the array providing items to check for in the haystack.
 * @return {boolean} true|false if haystack contains at least one item from arr.
 */
 var findSome = function (haystack, arr) {
    return arr.some(function (v) {
        return haystack.indexOf(v) >= 0;
    });
};

/**
 * @description determine if an array contains all items from another array.
 * @param {array} haystack the array to search.
 * @param {array} arr the array providing items to check for in the haystack.
 * @return {boolean} true|false if haystack contains at least one item from arr.
 */
var findAll = function (haystack, arr) {
    return arr.every(v => haystack.includes(v));
};

authorizer.hasEitherRole = (roles) => {
    return (req, res, next) => {
        if (findSome(roles, req.roles)) {
            next();
        }
        else {
            return res.status(401).json("You don't have permission.")
        }
    };
};

authorizer.hasEveryRole = (roles) => {
    return (req, res, next) => {
        if (findAll(roles, req.roles)) {
            next();
        }
        else {
            return res.status(401).json("You don't have permission.")
        }
    };
};

module.exports = authorizer;