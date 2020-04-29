//-----------------------------------------------------------------------------
// Require classes to register them in factory
//-----------------------------------------------------------------------------
require('./Meta');
//-----------------------------------------------------------------------------
const jfJsonApiBase = require('./Base');

/**
 * A `resource identifier object` is an object that identifies an individual resource.
 *
 * @namespace jf.JsonApi
 * @class     jf.JsonApi.ResourceIdentifier
 * @extends   jf.JsonApi.Base
 */
class jfJsonApiResourceIdentifier extends jfJsonApiBase
{
    /**
     * Name used to register class in factory.
     */
    static get NAME()
    {
        return 'ResourceIdentifier';
    }
    
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
         * @property id
         * @type     {integer|string}
         */
        this.id = null;
        /**
         * A meta object containing non-standard meta-information about
         * a resource that can not be represented as an attribute or relationship.
         * 
         * A `resource identifier object` MAY also include a meta member, whose
         * value is a meta object that contains non-standard meta-information.
         *
         * @property meta
         * @type     {jf.JsonApi.Meta}
         */
        this.meta = jfJsonApiBase.create('Meta');
        /**
         * The type member is used to describe resource objects that share common attributes and relationships.
         *
         * @property type
         * @type     {string}
         */
        this.type = '';
        //---------------------------------------------------------------------
        this.setProperties(config);
    }
}

//-----------------------------------------------------------------------------
// Register class in factory to retrieve it in other classes.
//-----------------------------------------------------------------------------
jfJsonApiBase.register(jfJsonApiResourceIdentifier.NAME, jfJsonApiResourceIdentifier);
//-----------------------------------------------------------------------------
module.exports = jfJsonApiResourceIdentifier;