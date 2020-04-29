const jfJsonApiCollectionBase = require('./CollectionBase');
const jfJsonApiError          = require('./Error');

/**
 * List of errors found.
 *
 * @namespace jf.JsonApi
 * @class     jf.JsonApi.Errors
 * @extends   jf.JsonApi.CollectionBase
 */
class jfJsonApiErrors extends jfJsonApiCollectionBase
{
    /**
     * @override
     */
    static get ITEM()
    {
        return jfJsonApiError;
    }
    
    /**
     * Name used to register class in factory.
     */
    static get NAME()
    {
        return 'Errors';
    }
}

//-----------------------------------------------------------------------------
// Register class in factory to retrieve it in other classes.
//-----------------------------------------------------------------------------
jfJsonApiCollectionBase.register(jfJsonApiErrors.NAME, jfJsonApiErrors);
//-----------------------------------------------------------------------------
module.exports = jfJsonApiErrors;