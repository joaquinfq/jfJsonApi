const jfJsonApiBase = require('./Base');
const jfJsonApiLink = require('./Link');
/**
 * Where specified, a links member can be used to represent links.
 * The value of each `links` member MUST be an object (a `link object`).
 *
 * @namespace jf.JsonApi
 * @class     jf.JsonApi.Links
 * @extends   jf.JsonApi.CollectionBase
 */
module.exports = class jfJsonApiLinks extends jfJsonApiBase
{
    /**
     * @override
     */
    constructor(config)
    {
        super();
        this.first   = '';
        this.last    = '';
        this.next    = '';
        this.prev    = '';
        this.related = '';
        this.self    = '';
        //------------------------------------------------------------------------------
        this.setProperties(config);
    }

    /**
     * @override
     */
    setProperties(values)
    {
        const _isObject = this.constructor.isObject;
        if (_isObject(values))
        {
            const _values = {};
            Object.keys(values).forEach(
                key =>
                {
                    const _value = values[key];
                    _values[key] = _isObject(_value)
                        ? new jfJsonApiLink(_value)
                        : _value;
                }
            );
            super.setProperties(_values);
        }
    }
};
