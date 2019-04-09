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
module.exports = class jfJsonApiJsonApi extends jfJsonApiBase
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
         * @type {jf.JsonApi.Meta}
         */
        this.meta = new jfJsonApiMeta();
        /**
         * This value is a string indicating the highest JSON API
         * version supported.
         *
         * @type {String}
         */
        this.version = '1.0';
        //------------------------------------------------------------------------------
        this.setProperties(config);
    }
};
