const jfJsonApiBase = require('./Base');
const jfJsonApiMeta = require('./Meta');
/**
 * A `resource identifier object` is an object that identifies an individual resource.
 *
 * @namespace jf.JsonApi
 * @class     jf.JsonApi.ResourceIdentifier
 * @extends   jf.JsonApi.Base
 */
module.exports = class jfJsonApiResourceIdentifier extends jfJsonApiBase
{
    /**
     * @override
     */
    constructor(config)
    {
        super();
        /**
         * Resource identifier.
         *
         * The id member is not required when the resource object originates
         * at the client and represents a new resource to be created on the server.
         *
         * @type {string}
         */
        this.id = '';
        /**
         * A meta object containing non-standard meta-information about
         * a resource that can not be represented as an attribute or relationship.
         *
         * A `resource identifier object` MAY also include a meta member, whose
         * value is a meta object that contains non-standard meta-information.
         *
         * @type {jf.JsonApi.Meta}
         */
        this.meta = new jfJsonApiMeta();
        /**
         * The type member is used to describe resource objects that share
         * common attributes and relationships.
         *
         * @type {string}
         */
        this.type = '';
        //---------------------------------------------------------------------
        this.setProperties(config);
    }
};
