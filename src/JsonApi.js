const jfJsonApiBase = require('./Base');
const jfJsonApiMeta = require('./Meta');

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
        this.meta = new jfJsonApiMeta();
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

module.exports = jfJsonApiJsonApi;