const jfJsonApiMeta     = require('../src/Meta');
const jfJsonApiTestBase = require('./_Base');
/**
 * Pruebas unitarias de la clase `jf.JsonApi.Meta`.
 */
module.exports = class jfJsonApiMetaTest extends jfJsonApiTestBase
{
    /**
     * @override
     */
    static get title()
    {
        return 'jf.JsonApi.Meta';
    }

    constructor()
    {
        super();
        this.Class = jfJsonApiMeta;
    }

    getDefaults()
    {
        return {
            allowEmptyValues : true
        };
    }

    /**
     * Pruebas del método `setProperties`.
     */
    testSetProperties()
    {
        const _data1 = {
            a : 1,
            b : 2
        };
        const _data2 = {
            c : 3,
            d : 4
        };
        const _Class = this.Class;
        const _sut   = new _Class(_data1);
        this._assert('', _sut.toJSON(), _data1);
        _sut.setProperties(_data2);
        this._assert('', _sut.toJSON(), { ..._data1, ..._data2 });
    }
};
