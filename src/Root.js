const jfJsonApiBase      = require('./Base');
const jfJsonApiErrors    = require('./Errors');
const jfJsonApiLinks     = require('./Links');
const jfJsonApiJsonApi   = require('./JsonApi');
const jfJsonApiMeta      = require('./Meta');
const jfJsonApiResource  = require('./Resource');
const jfJsonApiResources = require('./Resources');
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
module.exports = class Root extends jfJsonApiBase
{
    /**
     * Returns `Content-Type` header to use with JSON API.
     *
     * @property ContentType
     * @type     {string}
     */
    static get ContentType()
    {
        return 'application/vnd.api+json';
    }

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
        this.data = null;
        /**
         * Array of error objects.
         *
         * @type {jf.JsonApi.Error[]}
         */
        this.errors = new jfJsonApiErrors();
        /**
         * An array of resource objects that are related to the primary data and/or each other.
         *
         * @type {jf.JsonApi.Resource[]}
         */
        this.included = new jfJsonApiResources();
        /**
         * An object describing the server’s implementation.
         *
         * @type {jf.JsonApi.Links}
         */
        this.links = new jfJsonApiLinks();
        /**
         * An object describing the server’s implementation.
         *
         * @type {jf.JsonApi.JsonApi}
         */
        this.jsonapi = new jfJsonApiJsonApi();
        /**
         * The document's metadata.
         *
         * @type {jf.JsonApi.Meta}
         */
        this.meta = new jfJsonApiMeta();
        //------------------------------------------------------------------------------
        this.setProperties(config);
    }

    /**
     * Add an item to response data.
     *
     * @param {object} data Item to add to data section.
     */
    addData(data)
    {
        let _current = this.data;
        if (_current instanceof jfJsonApiResources)
        {
            _current.add(data);
        }
        else
        {
            this.setProperties({ data });
        }
    }

    /**
     * Add data to include section.
     *
     * @param {object} item Item to add to include section.
     *
     * @protected
     * @NOTE: Called from jf.Object.
     */
    _parseData(item)
    {
        if (Array.isArray(item))
        {
            if (this.data instanceof jfJsonApiResources)
            {
                this.data.setProperties(item);
            }
            else
            {
                this.data = new jfJsonApiResources(item);
            }
        }
        else
        {
            this.data = new jfJsonApiResource(item);
        }
    }

    /**
     * Parse items and add them to include section.
     *
     * @param {array|object} items Items to add to include section.
     *
     * @protected
     * @NOTE: Called from jf.Object.
     */
    _parseIncluded(items)
    {
        if (Array.isArray(items))
        {
            this.included.setProperties(items);
        }
        else
        {
            this.included.add(items);
        }
    }

    /**
     * Return instance value as needed in user application.
     *
     * @return {object} Value of instance.
     */
    toApp()
    {
        const _app     = {
            data   : this.included.groupBy('type'),
            errors : this.errors.groupBy('code')
        };
        let _data      = this.data;
        const _appData = _app.data;
        if (_data instanceof jfJsonApiResource)
        {
            const _type = _data.type;
            if (_type in _appData)
            {
                _appData[_type].push(_data);
            }
            else
            {
                _appData[_type] = [_data];
            }
        }
        else if (_data instanceof jfJsonApiResources)
        {
            Object.assign(_appData, _data.groupBy('type'));
        }
        Object.keys(_appData)
            .forEach(type => _appData[type] = _appData[type].map(item => item.toJSON().attributes));

        return _app;
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
     * Return instance value as needed in server application.
     *
     * @return {object} Value of instance.
     */
    toServer()
    {
        return {
            data : this.toJSON().data
        };
    }
};
