const jfJsonApiBase        = require('./Base');
const jfJsonApiErrorLink   = require('./ErrorLink');
const jfJsonApiErrorSource = require('./ErrorSource');

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
class jfJsonApiError extends jfJsonApiBase
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
         * @property code
         * @type     {string}
         */
        this.code = '';
        /**
         * A human-readable explanation specific to this occurrence of the problem.
         * Like `title`, this field's value can be localized.
         *
         * @property detail
         * @type     {string}
         */
        this.detail = '';
        /**
         * Unique identifier for this particular occurrence of the problem.
         *
         * @property id
         * @type     {string}
         */
        this.id = '';
        /**
         * A links object containing error references.
         *
         * @property links
         * @type     {jf.JsonApi.ErrorLink}
         */
        this.links = new jfJsonApiErrorLink();
        /**
         * A meta object containing non-standard meta-information about the error.
         *
         * @property meta
         * @type     {object}
         */
        this.meta = {};
        /**
         * An object containing references to the source of the error.
         *
         * @property source
         * @type     {jf.JsonApi.ErrorSource}
         */
        this.source = new jfJsonApiErrorSource();
        /**
         * The HTTP status code applicable to this problem, expressed as a string value.
         *
         * @property status
         * @type     {string}
         */
        this.status = '';
        /**
         * A short, human-readable summary of the problem that SHOULD NOT change from
         * occurrence to occurrence of the problem, except for purposes of localization.
         *
         * @property title
         * @type     {string}
         */
        this.title = '';
        //---------------------------------------------------------------------
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
}

module.exports = jfJsonApiError;