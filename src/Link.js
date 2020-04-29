//-----------------------------------------------------------------------------
// Require classes to register them in factory
//-----------------------------------------------------------------------------
require('./Meta');
//-----------------------------------------------------------------------------
const jfJsonApiBase = require('./Base');

/**
 * Each member of a links object is a `link`. A link MUST be represented as either:
 * 
 * - A string containing the link's URL.
 * - An object (`link object`) which can contain the following members:
 *   - href: A string containing the link's URL.
 *   - meta: A meta object containing non-standard meta-information about the link.
 *
 * @namespace jf.JsonApi
 * @class     jf.JsonApi.Link
 * @extends   jf.JsonApi.Base
 */
class jfJsonApiLink extends jfJsonApiBase
{
    /**
     * Name used to register class in factory.
     */
    static get NAME()
    {
        return 'Link';
    }
    
    /**
     * @override
     */
    constructor(config)
    {
        super();
        /**
         * String containing the link's URL.
         *
         * @property href
         * @type     {string}
         */
        this.href = '';
        /**
         * Meta object containing non-standard meta-information about the link.
         *
         * @property meta
         * @type     {jf.JsonApi.Meta}
         */
        this.meta = jfJsonApiBase.create('Meta');
        //---------------------------------------------------------------------
        this.setProperties(config);
    }
    
    /**
     * @override
     */
    toJSON()
    {
        let _data;
        const _hasHref = this.hasValue(this.href);
        if (_hasHref)
        {
            _data = this.hasValue(this.meta)
                ? super.toJSON()
                : this.href;
        }
        
        return _data;
    }
}

//-----------------------------------------------------------------------------
// Register class in factory to retrieve it in other classes.
//-----------------------------------------------------------------------------
jfJsonApiBase.register(jfJsonApiLink.NAME, jfJsonApiLink);
//-----------------------------------------------------------------------------
module.exports = jfJsonApiLink;