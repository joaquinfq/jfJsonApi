const Attributes         = require('./attributes');
const Links              = require('./links');
const Relationships      = require('./relationships');
const ResourceIdentifier = require('./resource-identifier');
/**
 * The document’s `primary data` is a representation of the resource
 * or collection of resources targeted by a request.
 *
 * @namespace jf.JsonApi
 * @class     jf.JsonApi.Resource
 * @extends   jf.JsonApi.ResourceIdentifier
 */
module.exports = class Resource extends ResourceIdentifier {
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
        this.attributes = new Attributes();
        /**
         * Type of resource
         *
         * @type {jf.JsonApi.Links}
         */
        this.links = new Links();
        /**
         * A relationships object describing relationships between
         * the resource and other JSON API resources.
         *
         * @type {jf.JsonApi.Relationships}
         */
        this.relationships = new Relationships();
        //---------------------------------------------------------------------
        this.assign(config);
    }
};
