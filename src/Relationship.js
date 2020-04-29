//-----------------------------------------------------------------------------
// Require classes to register them in factory
//-----------------------------------------------------------------------------
require('./Links');
require('./Meta');
require('./ResourceIdentifier');
//-----------------------------------------------------------------------------
const jfJsonApiBase = require('./Base');

/**
 * Represent references from the resource object in which it's defined to other resource objects.
 *
 * @namespace jf.JsonApi
 * @class     jf.JsonApi.Relationship
 * @extends   jf.JsonApi.Base
 */
class jfJsonApiRelationship extends jfJsonApiBase
{
    /**
     * Name used to register class in factory.
     */
    static get NAME()
    {
        return 'Relationship';
    }
    
    /**
     * @override
     */
    constructor(config)
    {
        super();
        /**
         * objects without having to GET any URLs via links.
         *
         * @property data
         * @type     {jf.JsonApi.ResourceIdentifier}
         */
        this.data = jfJsonApiBase.create('ResourceIdentifier');
        /**
         * A links object containing with information about relationship.
         *
         * @property links
         * @type     {jf.JsonApi.Links}
         */
        this.links = jfJsonApiBase.create('Links');
        /**
         * Meta object containing non-standard meta-information about the relationship.
         *
         * @property meta
         * @type     {jf.JsonApi.Meta}
         */
        this.meta = jfJsonApiBase.create('Meta');
        //---------------------------------------------------------------------
        this.setProperties(config);
    }
    
    /**
     * @override
     */
    toJSON()
    {
        const _data  = super.toJSON();
        const _links = _data.links;
        // A links object containing at least one of the following: self, related
        if (_links && !_links.self && !_links.related)
        {
            _data.links = null;
        }
        
        return this.hasValue(_data.meta) || this.hasValue(_data.data) || this.hasValue(_data.links)
            ? _data
            : undefined;
    }
}

//-----------------------------------------------------------------------------
// Register class in factory to retrieve it in other classes.
//-----------------------------------------------------------------------------
jfJsonApiBase.register(jfJsonApiRelationship.NAME, jfJsonApiRelationship);
//-----------------------------------------------------------------------------
module.exports = jfJsonApiRelationship;