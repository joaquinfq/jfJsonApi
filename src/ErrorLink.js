const jfJsonApiBase = require('./Base');

/**
 * A links object containing error references.
 *
 * @namespace jf.JsonApi
 * @class     jf.JsonApi.ErrorLink
 * @extends   jf.JsonApi.Base
 */
class jfJsonApiErrorLink extends jfJsonApiBase
{
    /**
     * @override
     */
    constructor(config)
    {
        super();
        /**
         * A link that leads to further details about this particular occurrence of the problem.
         *
         * @property about
         * @type     {string|null}
         */
        this.about = null;
        //---------------------------------------------------------------------
        this.setProperties(config);
    }
}

module.exports = jfJsonApiErrorLink;