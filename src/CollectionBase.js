const jfJsonApiBase = require('./Base');

/**
 * Base class for collections.
 *
 * @namespace jf.JsonApi
 * @class     jf.JsonApi.CollectionBase
 * @extends   jf.JsonApi.Base
 */
class jfJsonApiCollectionBase extends jfJsonApiBase
{
    /**
     * Class reference of each item in collection.
     *
     * @property ITEM
     * @type     {jf.JsonApi.Base}
     */
    static get ITEM()
    {
        throw new Error('Abstract property');
    }
    
    /**
     * Name used to register class in factory.
     */
    static get NAME()
    {
        return 'CollectionBase';
    }
    
    /**
     * @override
     */
    constructor(config)
    {
        super();
        /**
         * Collection items.
         *
         * @property items
         * @type     {jf.JsonApi.Base[]}
         */
        this.items = [];
        //---------------------------------------------------------------------
        this.setProperties(config);
    }
    
    /**
     * Add item to collection.
     *
     * @param {object} config Config to use for building item instance.
     */
    add(config)
    {
        if (config && typeof config === 'object')
        {
            this.items.push(new this.constructor.ITEM(config));
        }
    }
    
    /**
     * Group all item using property value as key.
     *
     * @param {string} property Property to use for getting group keys.
     * 
     * @return {object[]} Items grouped by value of property.
     */
    groupBy(property = 'id')
    {
        const _groups = {};
        if (property && typeof property === 'string')
        {
            this.items.forEach(
                item =>
                {
                    if (property in item)
                    {
                        const _value = item[property];
                        if (_value in _groups)
                        {
                            _groups[_value].push(item);
                        }
                        else
                        {
                            _groups[_value] = [item];
                        }
                    }
                }
            );
        }
        
        return _groups;
    }
    
    /**
     * Parse values and add them to collection.
     *
     * @NOTE      Called from `jf.Object`
     * 
     * @param {object[]} values Values to analyze.
     * 
     * @protected
     */
    _parseItems(values)
    {
        if (Array.isArray(values))
        {
            this.setProperties(values);
        }
    }
    
    /**
     * @override
     */
    setProperties(values)
    {
        if (Array.isArray(values))
        {
            values
                .filter(Boolean)
                .forEach(this.add, this);
        }
        else
        {
            super.setProperties(values);
        }
    }
    
    /**
     * @override
     */
    toJSON()
    {
        const _data = super.toJSON();
        
        return this.hasValue(_data.items)
            ? _data.items
            : undefined;
    }
}

//-----------------------------------------------------------------------------
// Register class in factory to retrieve it in other classes.
//-----------------------------------------------------------------------------
jfJsonApiBase.register(jfJsonApiCollectionBase.NAME, jfJsonApiCollectionBase);
//-----------------------------------------------------------------------------
module.exports = jfJsonApiCollectionBase;