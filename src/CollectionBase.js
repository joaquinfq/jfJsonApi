const jfJsonApiBase = require('./Base');
/**
 * Base class for collections.
 *
 * @namespace jf.JsonApi
 * @class     jf.JsonApi.CollectionBase
 * @extends   jf.JsonApi.Base
 */
module.exports = class jfJsonApiCollectionBase extends jfJsonApiBase
{
    /**
     * Class of each item in collection.
     *
     * @property ITEM
     * @type     {null|Function}
     */
    static get ITEM()
    {
        return null;
    }

    /**
     * @override
     */
    constructor(config)
    {
        super();
        /**
         * Collection items.
         *
         * @type {jf.JsonApi.Base}
         */
        this.items = [];
        //------------------------------------------------------------------------------
        this.setProperties(config);
    }

    /**
     * Add item to collection.
     *
     * @param {object} config Config to use for building item instance.
     */
    add(config)
    {
        if (config && typeof config === 'object')
        {
            this.items.push(new this.constructor.ITEM(config));
        }
    }

    /**
     * Group all item using property value as key.
     *
     * @param {string} property Property to use for getting group keys.
     *
     * @return {object[]} Items grouped by property.
     */
    groupBy(property = 'id')
    {
        const _groups = {};
        this.items.forEach(
            item =>
            {
                if (property in item)
                {
                    const _value = item[property];
                    if (_value in _groups)
                    {
                        _groups[_value].push(item);
                    }
                    else
                    {
                        _groups[_value] = [item];
                    }
                }
            }
        );

        return _groups;
    }

    /**
     * @override
     */
    setProperties(values)
    {
        if (Array.isArray(values))
        {
            values
                .filter(Boolean)
                .forEach(this.add, this);
        }
        else
        {
            super.setProperties(values);
        }
    }

    /**
     * @override
     */
    toJSON()
    {
        const _value = this.constructor.serialize(this.items);
        return this.hasValue(_value)
            ? _value
            : undefined;
    }
};
