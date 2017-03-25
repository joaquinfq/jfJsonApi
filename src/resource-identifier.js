const Base = require('./base');
const Meta = require('./meta');
/**
 * A `resource identifier object` is an object that identifies an individual resource.
 *
 * @namespace jf.JsonApi
 * @class     jf.JsonApi.ResourceIdentifier
 * @extends   jf.JsonApi.Base
 */
module.exports = class ResourceIdentifier extends Base {
    /**
     * @override
     */
    constructor(config)
    {
        super();
        /**
         * Resource identifier.
         *
         * @type {String}
         */
        this.id = '';
        /**
         * A `resource identifier object` MAY also include a meta member, whose
         * value is a meta object that contains non-standard meta-information.
         *
         * @type {jf.JsonApi.Meta}
         */
        this.meta = new Meta();
        /**
         * Type of resource
         *
         * @type {String}
         */
        this.type = '';
        //---------------------------------------------------------------------
        this.assign(config);
    }
};
