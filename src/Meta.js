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
     * Name used to register class in factory.
     */
    static get NAME()
    {
        return 'Meta';
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

//-----------------------------------------------------------------------------
// Register class in factory to retrieve it in other classes.
//-----------------------------------------------------------------------------
jfJsonApiBase.register(jfJsonApiMeta.NAME, jfJsonApiMeta);
//-----------------------------------------------------------------------------
module.exports = jfJsonApiMeta;