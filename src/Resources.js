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
}

module.exports = jfJsonApiResources;