const jfObject = require('@jf/object');

/**
 * Base class for others items.
 *
 * @namespace jf.JsonApi
 * @class     jf.JsonApi.Base
 * @extends   jf.Object
 */
class jfJsonApiBase extends jfObject
{
    /**
     * Indicates if empty values are allowed in result.
     *
     * @property allowEmptyValues
     * @type     {boolean}
     */
    get allowEmptyValues()
    {
        return false;
    }

    /**
     * @override
     */
    constructor(config)
    {
        super();
        this.setProperties(config);
    }

    /**
     * Check if `value` has a right value.
     *
     * @param {*} value Value to check.
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
                    _hasValue = Array.isArray(value)
                        ? value.length > 0
                        : Object.keys(value).length > 0;
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
                .filter(key => !keys.includes(key))
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
        if (!this.constructor.allowEmptyValues)
        {
            Object.keys(_data)
                .filter(key  => !this.hasValue(_data[key]))
                .forEach(key => delete _data[key]);
        }

        return _data;
    }
}

module.exports = jfJsonApiBase;
