const jfObject = require('jf-object');
/**
 * Base class for all classes in application.
 *
 * @namespace jf.JsonApi
 * @class     jf.JsonApi.Base
 * @extends   jf.Object
 */
module.exports = class Base extends jfObject {
    /**
     * Indicates if empty values are allowed in result.
     */
    allowEmptyValues()
    {
        return false;
    }

    /**
     * Check if `value` has a right value.
     * Only check JSON types.
     *
     * @param {*} value Value to check.
     *
     * @return {Boolean} `true` is value is present.
     */
    hasValue(value)
    {
        let _hasValue = value !== null && value !== undefined;
        if (_hasValue)
        {
            switch (typeof value)
            {
                case 'function':
                    _hasValue = false;
                    break;
                case 'string':
                    _hasValue = value !== '';
                    break;
                case 'object':
                    if (Array.isArray(value))
                    {
                        _hasValue = value.length > 0;
                    }
                    else
                    {
                        _hasValue = Object.keys(value).length > 0;
                    }
                    break;
            }
        }
        return _hasValue;
    }

    /**
     * Remove keys from property not in `keys` parameter.
     *
     * @param {String}   property Property to check.
     * @param {String[]} keys     Keys to keep.
     */
    keepKeys(property, keys)
    {
        const _values = this[property];
        if (typeof _values === 'object' && this.hasValue(_values))
        {
            Object.keys(_values).forEach(
                key =>
                {
                    if (keys.indexOf(key) === -1)
                    {
                        delete _values[key];
                    }
                }
            )
        }
    }

    /**
     * @override
     */
    toJSON()
    {
        const _data = super.toJSON();
        Object.keys(_data).forEach(
            key =>
            {
                if (!this.allowEmptyValues() && !this.hasValue(_data[key]))
                {
                    delete _data[key];
                }
            }
        );
        return _data;
    }
};
