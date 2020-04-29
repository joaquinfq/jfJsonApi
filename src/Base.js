const jfFactory = require('@jf/factory');
const jfObject  = require('@jf/object');

/**
 * Factory for all classes in package.
 *
 * @type {jf.Factory}
 */
const factory      = jfFactory.i('jf.JsonApi');
factory.initMethod = 'setProperties';

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
     * Name used to register class in factory.
     */
    static get NAME()
    {
        return 'Base';
    }

    /**
     * Class constructor.
     *
     * Assign config values that are properties to instance.
     *
     * @override
     *
     * @param {object} config Values to assign to instance.
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
     *
     * @return {boolean} `true` if value is present.
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
                .filter(key  => !keys.includes(key))
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
        if (!this.allowEmptyValues)
        {
            Object.keys(_data)
                .filter(key => !this.hasValue(_data[key]))
                .forEach(key => delete _data[key]);
        }

        return _data;
    }
}

//-----------------------------------------------------------------------------
// Register class in factory to retrieve it in other classes.
//-----------------------------------------------------------------------------
factory.attach(jfJsonApiBase, [ 'create', 'register' ]);
factory.register(jfJsonApiBase.NAME, jfJsonApiBase);
//-----------------------------------------------------------------------------
module.exports = jfJsonApiBase;
