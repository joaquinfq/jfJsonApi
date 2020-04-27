const jfJsonApiBase = require('./Base');
const jfJsonApiLink = require('./Link');

/**
 * Where specified, a links member can be used to represent links.
 *
 * The value of each `links` member MUST be an object (a `link object`).
 *
 * A links object containing at least one of the following:
 *
 * - related: A related resource link.
 * - self:    A link for the relationship itself (a `relationship link`).
 *            This link allows the client to directly manipulate the relationship.
 *            For example, removing an author through an article's relationship URL would disconnect
 *            the person from the article without deleting the people resource itself.
 *            When fetched successfully, this link returns the linkage for the related resources as
 *            its primary data.
 *
 * @namespace jf.JsonApi
 * @class     jf.JsonApi.Links
 * @extends   jf.JsonApi.Base
 */
class jfJsonApiLinks extends jfJsonApiBase
{
    /**
     * @override
     */
    constructor(config)
    {
        super();
        /**
         * The first page of data (only in pagination links of a collection).
         *
         * @property first
         * @type     {string}
         */
        this.first = '';
        /**
         * The last page of data (only in pagination links of a collection).
         *
         * @property last
         * @type     {string}
         */
        this.last = '';
        /**
         * The next page of data (only in pagination links of a collection).
         *
         * @property next
         * @type     {string}
         */
        this.next = '';
        /**
         * The previous page of data (only in pagination links of a collection).
         *
         * @property prev
         * @type     {string}
         */
        this.prev = '';
        /**
         * Provides access to resource objects linked in a relationship.
         * When fetched, the related resource object(s) are returned as
         * the response's primary data.
         *
         * @property related
         * @type     {string}
         */
        this.related = '';
        /**
         * Identifies the resource represented by the resource object.
         *
         * @property self
         * @type     {string}
         */
        this.self = '';
        //---------------------------------------------------------------------
        this.setProperties(config);
    }

    /**
     * @override
     */
    setProperties(values)
    {
        const _isObject = this.constructor.isObject;
        if (_isObject(values))
        {
            const _values = {};
            Object.keys(values).forEach(
                key =>
                {
                    const _value = values[key];
                    _values[key] = _isObject(_value)
                        ? new jfJsonApiLink(_value)
                        : _value;
                }
            );
            super.setProperties(_values);
        }
    }
}

module.exports = jfJsonApiLinks;
