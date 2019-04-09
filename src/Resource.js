const jfJsonApiAttributes         = require('./Attributes');
const jfJsonApiLinks              = require('./Links');
const jfJsonApiRelationships      = require('./Relationships');
const jfJsonApiResourceIdentifier = require('./ResourceIdentifier');
/**
 * The document’s `primary data` is a representation of the resource
 * or collection of resources targeted by a request.
 *
 * Every resource object MUST contain an id member and a type member.
 * The values of the id and type members MUST be strings.
 *
 * Within a given API, each resource object’s type and id pair MUST
 * identify a single, unique resource. (The set of URIs controlled by a
 * server, or multiple servers acting as one, constitute an API.)
 *
 * The type member is used to describe resource objects that share
 * common attributes and relationships.
 *
 * The values of type members MUST adhere to the same constraints as member names.
 *
 *
 * @namespace jf.JsonApi
 * @class     jf.JsonApi.Resource
 * @extends   jf.JsonApi.ResourceIdentifier
 */
module.exports = class jfJsonApiResource extends jfJsonApiResourceIdentifier
{
    /**
     * @override
     */
    constructor(config)
    {
        super();
        /**
         * An attributes object representing some of the resource’s data.
         *
         * @type {jf.JsonApi.Attributes}
         */
        this.attributes = new jfJsonApiAttributes();
        /**
         * Type of resource
         *
         * @type {jf.JsonApi.Links}
         */
        this.links = new jfJsonApiLinks();
        /**
         * A relationships object describing relationships between
         * the resource and other JSON API resources.
         *
         * @type {jf.JsonApi.Relationships}
         */
        this.relationships = new jfJsonApiRelationships();
        //---------------------------------------------------------------------
        this.setProperties(config);
    }

    /**
     * @override
     */
    setProperties(values)
    {
        const _isObject = this.constructor.isObject;
        if (_isObject(values) && _isObject(values.attributes))
        {
            let _attributes = values.attributes;
            // Check if `values` is an instance of jf.dataType.Item looking for
            // properties returning strings instead of add this module as dependency.
            let _id   = _attributes.constructor.ID;
            let _type = _attributes.constructor.TYPE;
            if (_id && _type)
            {
                _attributes = _attributes.toJSON();
            }
            else
            {
                // If not, check for properties __ID and __TYPE.
                _id   = _attributes.__ID;
                _type = _attributes.__TYPE;
                if (_id && _type)
                {
                    // Copy object for deleting properties in copy.
                    _attributes = { ..._attributes };
                    delete _attributes.__ID;
                    delete _attributes.__TYPE;
                }
            }
            if (_id && _type)
            {
                values.attributes = _attributes;
                values.id         = _attributes[_id] || null;
                values.type       = _type;
            }
            else
            {
                delete values.attributes;
            }
        }
        super.setProperties(values);
    }
};
