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
     * Check if `item` is an instance of jf.dataType.Item looking for
     * properties returning strings instead of add this module as dependency.
     *
     * If not is a jf.dataType item, then check if item has __ID && __TYPE properties.
     *
     * @param {object} item Item to check.
     *
     * @return {object}
     *
     * @private
     */
    __checkAttributes(item)
    {
        let _attributes;
        let _id   = item.constructor.ID;
        let _type = item.constructor.TYPE;
        if (_id && _type)
        {
            _attributes = item.toJSON();
            _id         = _attributes[_id];
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
            }
        }
        return {
            id         : _id,
            type       : _type,
            attributes : _attributes
        };
    }

    /**
     * @override
     */
    setProperties(values)
    {
        const _isObject = this.constructor.isObject;
        if (_isObject(values) && !_isObject(values.attributes))
        {
            values = this.__checkAttributes(values);
        }
        super.setProperties(values);
    }
};
