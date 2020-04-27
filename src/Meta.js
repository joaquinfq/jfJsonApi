const jfJsonApiBase = require('./Base');

/**
 * Where specified, a meta member can be used to include non-standard meta-information.
 * 
 * The value of each meta member MUST be an object (a `meta object`).
 * 
 * Any members MAY be specified within meta objects.
 *
 * @namespace jf.JsonApi
 * @class     jf.JsonApi.Meta
 * @extends   jf.JsonApi.Base
 */
class jfJsonApiMeta extends jfJsonApiBase
{
    /**
     * @override
     */
    get allowEmptyValues()
    {
        return true;
    }
    
    /**
     * @override
     */
    setProperties(values)
    {
        if (this.constructor.isObject(values))
        {
            Object.assign(this, values);
        }
    }
}

module.exports = jfJsonApiMeta;