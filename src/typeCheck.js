// typeCheck.js

// Enum to represent different data types
const TypeEnum = {
    UNDEFINED: 'undefined',
    NULL: 'null',
    STRING: 'string',
    NUMBER: 'number',
    BOOLEAN: 'boolean',
    FUNCTION: 'function',
    OBJECT: 'object',
    ARRAY: 'array',
    DATE: 'date',
    LONG: 'long' // Representing int64
};

// Helper function to determine the type of a value
function determineType(val) {
    if (val === undefined) {
        return TypeEnum.UNDEFINED;
    }
    if (val === null) {
        return TypeEnum.NULL;
    }
    if (typeof val === 'string') {
        return TypeEnum.STRING;
    }
    if (typeof val === 'number') {
        // Assuming long values are those outside the safe integer range
        if (val > Number.MAX_SAFE_INTEGER || val < Number.MIN_SAFE_INTEGER) {
            return TypeEnum.LONG;
        }
        return TypeEnum.NUMBER;
    }
    if (typeof val === 'boolean') {
        return TypeEnum.BOOLEAN;
    }
    if (typeof val === 'function') {
        return TypeEnum.FUNCTION;
    }
    if (Array.isArray(val)) {
        return TypeEnum.ARRAY;
    }
    if (Object.prototype.toString.call(val) === '[object Date]') {
        return TypeEnum.DATE;
    }
    if (typeof val === 'object') {
        return TypeEnum.OBJECT;
    }
    return TypeEnum.UNDEFINED;
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
        root.TypeEnum = factory().TypeEnum;
        root.determineType = factory().determineType;
    }
}(typeof self !== 'undefined' ? self : this, function () {
    return {
        TypeEnum,
        determineType
    };
}));
