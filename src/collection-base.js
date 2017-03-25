const Base = require('./base');
/**
 * Base class for collections.
 *
 * @namespace jf.JsonApi
 * @class     jf.JsonApi.CollectionBase
 * @extends   jf.JsonApi.Base
 */
module.exports = class CollectionBase extends Base {
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
        this.items = new Base();
        /**
         * Class of each item in collection.
         *
         * @type {jf.JsonApi.Base}
         */
        this.itemClass = null;
        //------------------------------------------------------------------------------
        this.assign(config);
    }

    /**
     * Add item to collection.
     *
     * @param {String} name   Name of the item.
     * @param {Object} config Config to use for building item instance.
     */
    add(name, config)
    {
        if (typeof name === 'string' && config && typeof config === 'object')
        {
            this.items[name] = new this.itemClass(config);
        }
    }

    /**
     * @override
     */
    assign(...config)
    {
        config.forEach(
            data => {
                if (data)
                {
                    Object.keys(data).forEach(
                        name => this.add(name, data[name])
                    );
                }
            }
        );
    }

    /**
     * @override
     */
    toJSON()
    {
        const _value = this.items.toJSON();
        return this.hasValue(_value)
            ? _value
            : undefined;
    }
};
