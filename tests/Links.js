const jfJsonApiLink     = require('../src/Link');
const jfJsonApiLinks    = require('../src/Links');
const jfJsonApiTestBase = require('./_Base');
/**
 * Pruebas unitarias de la clase `jf.JsonApi.Links`.
 */
module.exports = class jfJsonApiLinksTest extends jfJsonApiTestBase
{
    /**
     * @override
     */
    static get title()
    {
        return 'jf.JsonApi.Links';
    }

    constructor()
    {
        super();
        this.Class = jfJsonApiLinks;
    }

    getDefaults()
    {
        return {
            allowEmptyValues : false,
            first            : '',
            last             : '',
            next             : '',
            prev             : '',
            related          : '',
            self             : ''
        };
    }

    /**
     * Pruebas del método `setProperties`.
     */
    testSetProperties()
    {
        super.testSetProperties(
            {
                first   : Math.random(),
                last    : Math.random(),
                next    : Math.random(),
                prev    : Math.random(),
                related : Math.random(),
                self    : Math.random()
            }
        );
    }

    /**
     * Pruebas del método `setProperties` con enlaces definidos como objetos.
     */
    testSetPropertiesObject()
    {
        const _link = {
            href : Math.random(),
            meta : {
                a : Math.random()
            }
        };
        const _sut  = new jfJsonApiLinks({ related : _link });
        this.assertTrue(_sut.related instanceof jfJsonApiLink);
        this._assert('', _sut.related.toJSON(), _link);
    }
};
