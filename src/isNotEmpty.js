// isNotEmpty.js

// Helper function to check if a value is an object
function isObject(val) {
    return val !== null && typeof val === 'object' && !Array.isArray(val);
}

// Helper function to check if a value is an array and return its length
function isArrayAndLength(val) {
    if (Array.isArray(val)) {
        return val.length;
    }
    return null;
}

// Function to check if a value is not empty
function isNotEmpty(val) {
    if (val === undefined || val === null) {
        return false;
    }

    if (typeof val === 'number' || typeof val === 'boolean' || typeof val === 'function' || Object.prototype.toString.call(val) === '[object Date]') {
        return true;
    }

    if (Array.isArray(val) && val.length === 0) {
        return false;
    }

    if (isObject(val)) {
        return Object.keys(val).length > 0;
    }

    return val.length > 0;
}

// UMD (Universal Module Definition) Pattern
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node, CommonJS-like
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.isNotEmpty = factory().isNotEmpty;
        root.isObject = factory().isObject;
        root.isArrayAndLength = factory().isArrayAndLength;
    }
}(typeof self !== 'undefined' ? self : this, function () {
    return {
        isNotEmpty,
        isObject,
        isArrayAndLength
    };
}));
