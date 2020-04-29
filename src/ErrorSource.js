const jfJsonApiBase = require('./Base');

/**
 * An object containing references to the source of the error.
 *
 * @namespace jf.JsonApi
 * @class     jf.JsonApi.ErrorSource
 * @extends   jf.JsonApi.Base
 */
class jfJsonApiErrorSource extends jfJsonApiBase
{
    /**
     * Name used to register class in factory.
     */
    static get NAME()
    {
        return 'ErrorSource';
    }
    
    /**
     * @override
     */
    constructor(config)
    {
        super();
        /**
         * A string indicating which URI query parameter caused the error.
         *
         * @property parameter
         * @type     {string|null}
         */
        this.parameter = null;
        /**
         * A JSON Pointer (RFC6901) to the associated entity in the request
         * document [e.g. "/data" for a primary data object, or
         * "/data/attributes/title" for a specific attribute].
         *
         * @property pointer
         * @type     {string|null}
         */
        this.pointer = null;
        //---------------------------------------------------------------------
        this.setProperties(config);
    }
}

//-----------------------------------------------------------------------------
// Register class in factory to retrieve it in other classes.
//-----------------------------------------------------------------------------
jfJsonApiBase.register(jfJsonApiErrorSource.NAME, jfJsonApiErrorSource);
//-----------------------------------------------------------------------------
module.exports = jfJsonApiErrorSource;