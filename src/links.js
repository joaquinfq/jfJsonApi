const CollectionBase = require('./collection-base');
const Link           = require('./link');
/**
 * Where specified, a links member can be used to represent links.
 * The value of each links member MUST be an object (a `link object`).
 *
 * @namespace jf.JsonApi
 * @class     jf.JsonApi.Links
 * @extends   jf.JsonApi.CollectionBase
 */
module.exports = class Links extends CollectionBase {
    /**
     * @override
     */
    constructor(config)
    {
        super();
        this.itemClass = Link;
        this.assign(config);
    }

    /**
     * @override
     */
    add(name, config)
    {
        if (typeof name === 'string' && config)
        {
            if (typeof config === 'string')
            {
                config = {
                    href : config
                };
            }
            if (config.href)
            {
                super.add(name, config);
            }
        }
    }
};
