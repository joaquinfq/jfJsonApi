const jfJsonApiLink     = require('../src/Link');
const jfJsonApiMeta     = require('../src/Meta');
const jfJsonApiTestBase = require('./_Base');
/**
 * Pruebas unitarias de la clase `jf.JsonApi.Link`.
 */
module.exports = class jfJsonApiLinkTest extends jfJsonApiTestBase
{
    /**
     * @override
     */
    static get title()
    {
        return 'jf.JsonApi.Link';
    }

    constructor()
    {
        super();
        this.Class = jfJsonApiLink;
    }

    getDefaults()
    {
        return {
            allowEmptyValues : false,
            href             : '',
            meta             : new jfJsonApiMeta()
        };
    }

    /**
     * @override
     */
    testSetProperties()
    {
        super.testSetProperties(
            {
                href : 'http://jg.gl/related',
                meta : {
                    a : Math.random()
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
            href : _random,
            meta : {
                self    : _random * 2,
                related : _random * 3
            }
        };
        let _sut      = new jfJsonApiLink(_data);
        this._assert('', _sut.toJSON(), _data);
        //------------------------------------------------------------------------------
        _sut = new jfJsonApiLink(
            {
                href : _random
            }
        );
        this._assert('', _sut.toJSON(), _random);
        //------------------------------------------------------------------------------
        delete _data.href;
        _sut  = new jfJsonApiLink(_data);
        this.assertUndefined(_sut.toJSON());
        //------------------------------------------------------------------------------
        this.assertUndefined(new jfJsonApiLink().toJSON());
    }
};
