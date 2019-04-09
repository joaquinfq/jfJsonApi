const jfJsonApiCollectionBase = require('./CollectionBase');
const jfJsonApiResource       = require('./Resource');
/**
 * List of resources.
 *
 * @namespace jf.JsonApi
 * @class     jf.JsonApi.Resources
 * @extends   jf.JsonApi.CollectionBase
 */
module.exports = class jfJsonApiErrors extends jfJsonApiCollectionBase
{
    /**
     * @override
     */
    static get ITEM()
    {
        return jfJsonApiResource;
    }
};
