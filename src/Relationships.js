const jfJsonApiBase = require('./Base');

/**
 * The value of the relationships key MUST be an object (a `relationships object`).
 * 
 * Members of the relationships object (`relationships`) represent references from
 * the resource object in which it’s defined to other resource objects.
 * 
 * Relationships may be to-one or to-many.
 *
 * @namespace jf.JsonApi
 * @class     jf.JsonApi.Relationships
 * @extends   jf.JsonApi.Base
 */
class jfJsonApiRelationships extends jfJsonApiBase
{
    /**
     * Name used to register class in factory.
     */
    static get NAME()
    {
        return 'Relationships';
    }
    
    /**
     * @override
     */
    setProperties(values)
    {
        const _isObject = this.constructor.isObject;
        if (_isObject(values))
        {
            Object.keys(values)
                .filter(key  => _isObject(values[key]))
                .forEach(key => this[key] = jfJsonApiBase.create('Relationship', values[key]));
        }
    }
}

//-----------------------------------------------------------------------------
// Register class in factory to retrieve it in other classes.
//-----------------------------------------------------------------------------
jfJsonApiBase.register(jfJsonApiRelationships.NAME, jfJsonApiRelationships);
//-----------------------------------------------------------------------------
module.exports = jfJsonApiRelationships;