const jfJsonApiBase               = require('./Base');
const jfJsonApiResourceIdentifier = require('./ResourceIdentifier');
const jfJsonApiLinks              = require('./Links');
const jfJsonApiMeta               = require('./Meta');
/**
 * Represent references from the resource object in which it’s defined to
 * other resource objects.
 *
 * @namespace jf.JsonApi
 * @class     jf.JsonApi.Relationship
 * @extends   jf.JsonApi.Base
 */
module.exports = class Relationship extends jfJsonApiBase
{
    /**
     * @override
     */
    constructor(config)
    {
        super();
        /**
         * Allows a client to link together all of the included
         * resource objects without having to GET any URLs via links.
         *
         * @type {jf.JsonApi.ResourceIdentifier}
         */
        this.data = new jfJsonApiResourceIdentifier();
        /**
         * A links object containing at least one of the following:
         * - self:    A link for the relationship itself (a `relationship link`).
         *            This link allows the client to directly manipulate the relationship.
         *            For example, removing an author through an article’s relationship
         *            URL would disconnect the person from the article without deleting
         *            the people resource itself.
         *            When fetched successfully, this link returns the linkage for the
         *            related resources as its primary data.
         * - related: A related resource link.
         *
         * @type {jf.JsonApi.Links}
         */
        this.links = new jfJsonApiLinks();
        /**
         * Meta object containing non-standard meta-information about the relationship.
         *
         * @type {jf.JsonApi.Meta}
         */
        this.meta = new jfJsonApiMeta();
        //---------------------------------------------------------------------
        this.setProperties(config);
    }

    /**
     * @override
     */
    toJSON()
    {
        const _data  = super.toJSON();
        const _links = _data.links;
        // A links object containing at least one of the following: self, related
        if (_links && !_links.self && !_links.related)
        {
            _data.link = null;
        }

        return this.hasValue(_data.meta) || this.hasValue(_data.data) || this.hasValue(_data.links)
            ? _data
            : undefined;
    }
};
