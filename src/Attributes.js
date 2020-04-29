const jfJsonApiMeta = require('./Meta');

/**
 * The value of the attributes key MUST be an object (an `attributes object`).
 * Members of the attributes object (`attributes`) represent information about the resource object in which it's defined.
 * 
 * Attributes may contain any valid JSON value.
 * 
 * Complex data structures involving JSON objects and arrays are allowed as attribute values.
 * However, any object that constitutes or is contained in an attribute MUST NOT contain a
 * `relationships` or `links` member, as those members are reserved by this specification for future use.
 * 
 * Although has-one foreign keys (e.g. author_id) are often stored internally alongside other
 * information to be represented in a resource object, these keys SHOULD NOT appear as attributes.
 *
 * @namespace jf.JsonApi
 * @class     jf.JsonApi.Attributes
 * @extends   jf.JsonApi.Meta
 */
class jfJsonApiAttributes extends jfJsonApiMeta
{
}

module.exports = jfJsonApiAttributes;