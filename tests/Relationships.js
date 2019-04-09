const jfJsonApiRelationship  = require('../src/Relationship');
const jfJsonApiRelationships = require('../src/Relationships');
const jfJsonApiTestBase      = require('./_Base');
/**
 * Pruebas unitarias de la clase `jf.JsonApi.Relationships`.
 */
module.exports = class jfJsonApiRelationshipsTest extends jfJsonApiTestBase
{
    /**
     * @override
     */
    static get title()
    {
        return 'jf.JsonApi.Relationships';
    }

    /**
     * @override
     */
    constructor()
    {
        super();
        this.Class = jfJsonApiRelationships;
    }

    /**
     * @override
     */
    getDefaults()
    {
        return {
            allowEmptyValues : false
        };
    }

    /**
     * Pruebas del método `setProperties`.
     */
    testSetPropertiesObjects()
    {
        const _data1 = {
            data  : {
                id   : Math.random(),
                type : 'string',
                meta : {
                    d : Math.random()
                }
            },
            links : {
                self    : 'http://jf.gl',
                related : 'http://jf.gl'
            },
            meta  : {
                m : Math.random()
            }
        };
        const _sut   = new this.Class({ data : _data1 });
        this.assertTrue(_sut.data instanceof jfJsonApiRelationship);
        this._assert('', _sut.toJSON(), { data : _data1 });
    }

    /**
     * Pruebas del método `setProperties` con claves incorrectas.
     */
    testSetPropertiesObjectsWrongKeys()
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
        let _sut     = new _Class(_data1);
        this._assert('', Object.assign({}, _sut), {});
        _sut = new _Class(
            {
                data1 : _data1,
                data2 : _data2
            }
        );
        this.assertTrue(_sut.data1 instanceof jfJsonApiRelationship);
        this.assertTrue(_sut.data2 instanceof jfJsonApiRelationship);
        this._assert('', _sut.toJSON(), {});
    }
};
