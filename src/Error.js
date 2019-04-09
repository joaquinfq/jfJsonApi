const jfJsonApiBase = require('./Base');
/**
 * A server MAY choose to stop processing as soon as a problem is encountered, or
 * it MAY continue processing and encounter multiple problems.
 * For instance, a server might process multiple attributes and then return
 * multiple validation problems in a single response.
 *
 * When a server encounters multiple problems for a single request, the most
 * generally applicable HTTP error code SHOULD be used in the response.
 * For instance, 400 Bad Request might be appropriate for multiple 4xx errors
 * or 500 Internal Server Error might be appropriate for multiple 5xx errors.
 *
 * @namespace jf.JsonApi
 * @class     jf.JsonApi.Error
 * @extends   jf.JsonApi.Base
 */
module.exports = class jfJsonApiError extends jfJsonApiBase
{
    /**
     * @override
     */
    constructor(config)
    {
        super();
        /**
         * An application-specific error code, expressed as a string value.
         *
         * @type {String}
         */
        this.code = '';
        /**
         * A human-readable explanation specific to this occurrence of the problem.
         * Like `title`, this field’s value can be localized.
         *
         * @type {String}
         */
        this.detail = '';
        /**
         * Unique identifier for this particular occurrence of the problem.
         *
         * @type {String}
         */
        this.id = '';
        /**
         * A links object containing the following members:
         *
         * - about: A link that leads to further details about this particular occurrence of the problem.
         *
         * @type {jf.JsonApi.Links}
         */
        this.links = {};
        /**
         * A meta object containing non-standard meta-information about the error.
         *
         * @type {Object}
         */
        this.meta = {};
        /**
         * A short, human-readable summary of the problem that SHOULD NOT change from
         * occurrence to occurrence of the problem, except for purposes of localization.
         *
         * @type {String}
         */
        this.title = '';
        /**
         * An object containing references to the source of the error,
         * optionally including any of the following members:
         *
         * - parameter: A string indicating which URI query parameter caused the error.
         * - pointer:   A JSON Pointer (RFC6901) to the associated entity in the request
         *              document [e.g. "/data" for a primary data object, or
         *              "/data/attributes/title" for a specific attribute].
         *
         * @type {Object}
         */
        this.source = {};
        /**
         * The HTTP status code applicable to this problem, expressed as a string value.
         *
         * @type {String}
         */
        this.status = '';
        //------------------------------------------------------------------------------
        this.setProperties(config);
    }

    /**
     * @override
     */
    toJSON()
    {
        this.keepKeys('links', ['about']);
        this.keepKeys('source', ['parameter', 'pointer']);

        return super.toJSON();
    }
};
