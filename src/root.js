const Base     = require('./base');
const Error    = require('./error');
const Links    = require('./links');
const JsonApi  = require('./json-api');
const Meta     = require('./meta');
const Resource = require('./resource');
/**
 * A JSON object MUST be at the root of every JSON API request and
 * response containing data.
 *
 * This object defines a document’s `top level`.
 *
 * @namespace jf.JsonApi
 * @class     jf.JsonApi.Root
 * @extends   jf.JsonApi.Base
 */
module.exports = class Root extends Base {
    /**
     * @override
     */
    constructor(config)
    {
        super();
        /**
         * The document’s primary data
         *
         * @type {jf.JsonApi.Resource}
         */
        this.data = new Resource();
        /**
         * Array of error objects.
         *
         * @type {jf.JsonApi.Error[]}
         */
        this.errors = [];
        /**
         * An array of resource objects that are related to the primary data and/or each other.
         *
         * @type {jf.JsonApi.Resource[]}
         */
        this.included = [];
        /**
         * An object describing the server’s implementation.
         *
         * @type {jf.JsonApi.Links}
         */
        this.links = new Links();
        /**
         * An object describing the server’s implementation.
         *
         * @type {jf.JsonApi.JsonApi}
         */
        this.jsonapi = new JsonApi();
        /**
         * Array of error objects.
         *
         * @type {jf.JsonApi.Meta}
         */
        this.meta = new Meta();
        //------------------------------------------------------------------------------
        this.assign(config);
    }

    /**
     * Add an item to response data.
     *
     * @param {String} type     Type of item.
     * @param {Object} values   Values to add to data section.
     * @param {String} columnId Key to use as id.
     */
    addData(type, values, columnId = 'id')
    {
        const _resource = this.__buildResource(type, values, columnId);
        if (_resource)
        {
            let _current = this.data;
            if (Array.isArray(_current))
            {
                _current.push(_resource);
            }
            else if (_current.type || _current.id)
            {
                this.data = [ _current, _resource ];
            }
            else
            {
                this.data = _resource;
            }
        }
    }

    /**
     * Add data to include section.
     *
     * @param {String} type     Type of included items.
     * @param {Object} values   Values to add to include section.
     * @param {String} columnId Key of values to use as id.
     */
    addIncluded(type, values, columnId = 'id')
    {
        const _resource = this.__buildResource(type, values, columnId);
        if (_resource)
        {
            this.included.push(_resource);
        }
    }

    /**
     * @override
     */
    assign(...config)
    {
        config.forEach(
            item =>
            {
                if (item)
                {
                    this.__buildItem(item, 'data', Resource);
                    this.__buildItem(item, 'included', Resource);
                    this.__buildItem(item, 'errors', Error);
                }
            }
        );
        super.assign(...config);
    }

    /**
     * Build a resource.
     *
     * @param {String} type     Type of included items.
     * @param {Object} values   Values to add to include section.
     * @param {String} columnId Key of values to use as id.
     *
     * @return {null|jf.JsonApi.Resource} Resource built or null.
     *
     * @private
     */
    __buildResource(type, values, columnId = 'id')
    {
        const _id = values[columnId];
        return _id
            ? new Resource(
                {
                    id         : _id,
                    type       : type,
                    attributes : values
                }
            )
            : null;
    }

    /**
     * Build items from configuration.
     *
     * @param {Object}   config Configuration with items.
     * @param {String}   key    Key of configuration to use.
     * @param {Function} Class  Reference to class to build.
     *
     * @private
     */
    __buildItem(config, key, Class)
    {
        const _items = config[key];
        if (_items)
        {
            if (Array.isArray(_items))
            {
                _items.forEach((config, index) => _items[index] = new Class(config))
            }
            else if (typeof _items === 'object' && !(_items instanceof Class))
            {
                config[key] = new Class(_items);
            }
        }
    }

    /**
     * @override
     */
    toJSON()
    {
        const _data = super.toJSON();
        if (_data.errors)
        {
            // The members data and errors MUST NOT coexist in the same document.
            delete _data.data;
            delete _data.included;
        }
        else if (!_data.data)
        {
            // If current data is an empty collection, set an empty array.
            if (Array.isArray(this.data))
            {
                _data.data = [];
            }
            else
            {
                if (_data.included)
                {
                    // If a document does not contain a top-level `data` key,
                    // the `included` member MUST NOT be present either.
                    delete _data.included;
                }
                if (!_data.meta)
                {
                    _data.data = null;
                }
            }
        }
        return _data;
    }

    /**
     * Returns `Content-Type` header to use with JSON API.
     *
     * @return {String}
     */
    static getContentType()
    {
        return 'application/vnd.api+json';
    }
};
