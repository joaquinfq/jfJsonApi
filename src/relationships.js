const CollectionBase = require('./collection-base');
const Relationship   = require('./relationship');
/**
 * The value of the relationships key MUST be an object (a `relationships object`).
 * Members of the relationships object (`relationships`) represent references from
 * the resource object in which it’s defined to other resource objects.
 *
 * Relationships may be to-one or to-many.
 *
 * @namespace jf.JsonApi
 * @class     jf.JsonApi.Relations
 * @extends   jf.JsonApi.CollectionBase
 */
module.exports = class Relations extends CollectionBase {
    /**
     * @override
     */
    constructor(config)
    {
        super();
        this.itemClass = Relationship;
        this.assign(config);
    }
};
