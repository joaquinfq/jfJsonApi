const Base = require('./base');
/**
 * Each member of a links object is a `link`. A link MUST be represented as either:
 *
 * - A string containing the link’s URL.
 * - An object (`link object`) which can contain the following members:
 *   - href: A string containing the link’s URL.
 *   - meta: A meta object containing non-standard meta-information about the link.
 *
 * @namespace jf.JsonApi
 * @class     jf.JsonApi.Link
 * @extends   jf.JsonApi.Base
 */
module.exports = class Link extends Base {
    /**
     * @override
     */
    constructor(config)
    {
        super();
        /**
         * String containing the link's URL
         *
         * @type {String}
         */
        this.href = '';
        /**
         * Meta object containing non-standard meta-information about the link.
         *
         * @type {Object}
         */
        this.meta = {};
        //---------------------------------------------------------------------
        this.assign(config);
    }

    /**
     * @override
     */
    toJSON()
    {
        return this.hasValue(this.meta)
            ? super.toJSON()
            : this.hasValue(this.href)
                ? this.href
                : undefined;
    }
};
