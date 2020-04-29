//-----------------------------------------------------------------------------
// Require classes to register them in factory
//-----------------------------------------------------------------------------
require('./Meta');
//-----------------------------------------------------------------------------
const jfJsonApiBase = require('./Base');

/**
 * A JSON API document MAY include information about its implementation
 * under a top level `jsonapi` member.
 *
 * @namespace jf.JsonApi
 * @class     jf.JsonApi.JsonApi
 * @extends   jf.JsonApi.Base
 */
class jfJsonApiJsonApi extends jfJsonApiBase
{
    /**
     * Name used to register class in factory.
     */
    static get NAME()
    {
        return 'JsonApi';
    }
    
    /**
     * @override
     */
    constructor(config)
    {
        super();
        /**
         * This value is a meta object that contains non-standard meta-information.
         *
         * @property meta
         * @type     {jf.JsonApi.Meta}
         */
        this.meta = jfJsonApiBase.create('Meta');
        /**
         * This value is a string indicating the highest JSON API version supported.
         *
         * @property version
         * @type     {string}
         */
        this.version = '1.0';
        //---------------------------------------------------------------------
        this.setProperties(config);
    }
}

//-----------------------------------------------------------------------------
// Register class in factory to retrieve it in other classes.
//-----------------------------------------------------------------------------
jfJsonApiBase.register(jfJsonApiJsonApi.NAME, jfJsonApiJsonApi);
//-----------------------------------------------------------------------------
module.exports = jfJsonApiJsonApi;