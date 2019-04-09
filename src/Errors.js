const jfJsonApiCollectionBase = require('./CollectionBase');
const jfJsonApiError          = require('./Error');
/**
 * List of errors found.
 *
 * @namespace jf.JsonApi
 * @class     jf.JsonApi.Errors
 * @extends   jf.JsonApi.CollectionBase
 */
module.exports = class jfJsonApiErrors extends jfJsonApiCollectionBase
{
    /**
     * @override
     */
    static get ITEM()
    {
        return jfJsonApiError;
    }
};
