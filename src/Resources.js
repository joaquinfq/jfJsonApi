const jfJsonApiCollectionBase = require('./CollectionBase');
const jfJsonApiResource       = require('./Resource');

/**
 * Collection of `Resource` items.
 *
 * @namespace jf.JsonApi
 * @class     jf.JsonApi.Resources
 * @extends   jf.JsonApi.CollectionBase
 */
class jfJsonApiResources extends jfJsonApiCollectionBase
{
    /**
     * @override
     */
    static get ITEM()
    {
        return jfJsonApiResource;
    }
    
    /**
     * Name used to register class in factory.
     */
    static get NAME()
    {
        return 'Resources';
    }
}

//-----------------------------------------------------------------------------
// Register class in factory to retrieve it in other classes.
//-----------------------------------------------------------------------------
jfJsonApiCollectionBase.register(jfJsonApiResources.NAME, jfJsonApiResources);
//-----------------------------------------------------------------------------
module.exports = jfJsonApiResources;