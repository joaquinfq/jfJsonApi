const jfObject = require('@jf/object');
/**
 * Base class for all classes in application.
 *
 * @namespace jf.JsonApi
 * @class     jf.JsonApi.Base
 * @extends   jf.Object
 */
module.exports = class jfJsonApiBase extends jfObject
{
    /**
     * Indicates if empty values are allowed in result.
     *
     * @return {boolean} `true` if empty values are allowed,
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
     * @return {boolean} `true` is value is present.
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
     * Keep only keys in `keys` parameter.
     *
     * @param {string}   property Property to check.
     * @param {string[]} keys     Keys to keep.
     */
    keepKeys(property, keys)
    {
        const _values = this[property];
        if (typeof _values === 'object' && this.hasValue(_values))
        {
            Object.keys(_values)
                .filter(key => keys.includes(key))
                .forEach(key => delete _values[key]);
        }
    }

    /**
     * @override
     */
    setProperties(values)
    {
        if (values && typeof values === 'object')
        {
            const _values = {};
            Object.keys(values).forEach(
                key =>
                {
                    const _current = this[key];
                    const _value   = values[key];
                    if (_current instanceof jfJsonApiBase)
                    {
                        this[key] = new _current.constructor(_value);
                    }
                    else
                    {
                        _values[key] = _value;
                    }
                }
            );
            super.setProperties(_values);
        }
    }

    /**
     * @override
     */
    toJSON()
    {
        const _data = super.toJSON();
        if (!this.allowEmptyValues())
        {
            Object.keys(_data)
                .filter(key => !this.hasValue(_data[key]))
                .forEach(key => delete _data[key]);
        }

        return _data;
    }
};
