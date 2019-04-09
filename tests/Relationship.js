const jfJsonApiLinks              = require('../src/Links');
const jfJsonApiMeta               = require('../src/Meta');
const jfJsonApiRelationship       = require('../src/Relationship');
const jfJsonApiResourceIdentifier = require('../src/ResourceIdentifier');
const jfJsonApiTestBase           = require('./_Base');
/**
 * Pruebas unitarias de la clase `jf.JsonApi.Relationship`.
 */
module.exports = class RelationshipTest extends jfJsonApiTestBase
{
    /**
     * @override
     */
    static get title()
    {
        return 'jf.JsonApi.Relationship';
    }

    /**
     * @override
     */
    constructor()
    {
        super();
        this.Class = jfJsonApiRelationship;
    }

    /**
     * @override
     */
    getDefaults()
    {
        return {
            ...super.getDefaults(),
            data  : new jfJsonApiResourceIdentifier(),
            links : new jfJsonApiLinks(),
            meta  : new jfJsonApiMeta()
        };
    }

    /**
     * @override
     */
    testSetProperties()
    {
        super.testSetProperties(
            {
                links : {
                    self    : 'http://jf.gl/self',
                    related : 'http://jg.gl/related'
                }
            }
        );
    }

    /**
     * @override
     */
    testToJson()
    {
        const _random = Math.random();
        let _data     = {
            links : {
                self    : _random,
                related : _random * 2
            }
        };
        let _sut      = new jfJsonApiRelationship(_data);
        this._assert('', _sut.toJSON(), _data);
        //------------------------------------------------------------------------------
        _data = {
            links : {
                self : _random
            }
        };
        _sut  = new jfJsonApiRelationship(_data);
        this._assert('', _sut.toJSON(), _data);
        //------------------------------------------------------------------------------
        _data = {
            links : {
                related : _random
            }
        };
        _sut  = new jfJsonApiRelationship(_data);
        this._assert('', _sut.toJSON(), _data);
        //------------------------------------------------------------------------------
        _data = {
            links : {
                first : _random,
                last  : _random * 2
            }
        };
        _sut  = new jfJsonApiRelationship(_data);
        this.assertUndefined(_sut.toJSON());
    }
};
