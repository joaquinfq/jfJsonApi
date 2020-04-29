//-----------------------------------------------------------------------------
// Require classes to register them in factory
//-----------------------------------------------------------------------------
require('./Attributes');
require('./Links');
require('./Relationships');
//-----------------------------------------------------------------------------
const jfJsonApiResourceIdentifier = require('./ResourceIdentifier');

/**
 * The document's `primary data` is a representation of the resource or collection of resources
 * targeted by a request.
 *
 * Every resource object MUST contain an id member and a type member. The values of the id and type
 * members MUST be strings.
 *
 * Within a given API, each resource object's type and id pair MUST identify a single, unique resource.
 * The set of URIs controlled by a server, or multiple servers acting as one, constitute an API.
 *
 * The type member is used to describe resource objects that share common attributes and relationships.
 *
 * The values of type members MUST adhere to the same constraints as member names.
 *
 * @namespace jf.JsonApi
 * @class     jf.JsonApi.Resource
 * @extends   jf.JsonApi.ResourceIdentifier
 */
class jfJsonApiResource extends jfJsonApiResourceIdentifier
{
    /**
     * Name used to register class in factory.
     */
    static get NAME()
    {
        return 'Resource';
    }

    /**
     * @override
     */
    constructor(config)
    {
        super();
        /**
         * An attributes object representing some of the resource's data.
         *
         * @property attributes
         * @type     {jf.JsonApi.Attributes}
         */
        this.attributes = jfJsonApiResourceIdentifier.create('Attributes');
        /**
         * Links of resource.
         *
         * @property links
         * @type     {jf.JsonApi.Links}
         */
        this.links = jfJsonApiResourceIdentifier.create('Links');
        /**
         * A relationships object describing relationships between
         * the resource and other JSON API resources.
         *
         * @property relationships
         * @type     {jf.JsonApi.Relationships}
         */
        this.relationships = jfJsonApiResourceIdentifier.create('Relationships');
        //---------------------------------------------------------------------
        this.setProperties(config);
    }

    /**
     * Check if `item` is an instance of `jf.dataType.Item` looking for properties `ID`
     * and `TYPE` instead of add this module as dependency.
     *
     * If not is a `jf.dataType.Item`, then check if item has `__ID` and `__TYPE` properties.
     *
     * @param {object} item Item to check.
     *
     * @return  {object} Plain attribute object.
     *
     * @private
     */
    __checkAttributes(item)
    {
        let _attributes;
        const _result = {};
        let _id       = item.constructor.ID;
        let _type     = item.constructor.TYPE;
        if (_id && _type)
        {
            _result.id         = item[_id];
            _result.type       = _type;
            _result.attributes = item.toJSON();
        }
        else
        {
            // If not, check for properties __ID and __TYPE.
            _id   = item.__ID;
            _type = item.__TYPE;
            if (_id && _type)
            {
                // Copy object for deleting properties in copy.
                _attributes = { ...item };
                delete _attributes.__ID;
                delete _attributes.__TYPE;
                _result.id         = item[_id];
                _result.type       = _type;
                _result.attributes = _attributes;
            }
            else
            {
                Object.assign(_result, item);
            }
        }

        return _result;
    }

    /**
     * @override
     */
    setProperties(values)
    {
        const _isObject = this.constructor.isObject;
        if (_isObject(values))
        {
            if (_isObject(values.attributes))
            {
                if (!values.id || !values.type)
                {
                    const _tmp = this.__checkAttributes(values.attributes);
                    if (_tmp.type)
                    {
                        values = Object.assign(_tmp, values);
                    }
                    else
                    {
                        delete values.attributes;
                    }
                }
            }
            else
            {
                values = this.__checkAttributes(values);
            }
        }
        super.setProperties(values);
    }
}

//-----------------------------------------------------------------------------
// Register class in factory to retrieve it in other classes.
//-----------------------------------------------------------------------------
jfJsonApiResourceIdentifier.register(jfJsonApiResource.NAME, jfJsonApiResource);
//-----------------------------------------------------------------------------
module.exports = jfJsonApiResource;
