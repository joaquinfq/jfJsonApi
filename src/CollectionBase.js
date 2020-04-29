const jfJsonApiBase = require('./Base');

/**
 * Base class for collections.
 *
 * @namespace jf.JsonApi
 * @class     jf.JsonApi.CollectionBase
 * @extends   jf.JsonApi.Base
 */
class jfJsonApiCollectionBase extends jfJsonApiBase
{
    /**
     * Class of each item in collection.
     *
     * @property ITEM
     * @type     {jf.JsonApi.Base}
     */
    static get ITEM()
    {
        throw new Error('Abstract property');
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
         * @property items
         * @type     {jf.JsonApi.Base[]}
         */
        this.items = [];
        //---------------------------------------------------------------------
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
        if (property && typeof property === 'string')
        {
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
        }

        return _groups;
    }

    /**
     * @override
     *
     * @NOTE Called from `jf.Object`.
     */
    _parseItems(values)
    {
        if (Array.isArray(values))
        {
            this.setProperties(values);
        }
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
        const _data = super.toJSON();

        return this.hasValue(_data.items)
            ? _data.items
            : undefined;
    }
}

module.exports = jfJsonApiCollectionBase;
