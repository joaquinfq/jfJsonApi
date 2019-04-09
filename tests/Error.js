const jfJsonApiError    = require('../src/Error');
const jfJsonApiTestBase = require('./_Base');
/**
 * Pruebas unitarias de la clase `jf.JsonApi.Error`.
 */
module.exports = class jfJsonApiErrorTest extends jfJsonApiTestBase
{
    /**
     * @override
     */
    static get title()
    {
        return 'jf.JsonApi.Error';
    }

    constructor()
    {
        super();
        this.Class = jfJsonApiError;
    }

    /**
     * @override
     */
    getDefaults()
    {
        return {
            allowEmptyValues : false,
            code             : '',
            detail           : '',
            id               : '',
            links            : {},
            meta             : {},
            title            : '',
            source           : {},
            status           : ''
        };
    }

    /**
     * @override
     */
    testToJson()
    {
        const _random = Math.random();
        const _sut    = new jfJsonApiError();
        _sut.links    = {
            about : _random,
            a     : _random * 2,
            b     : _random * 3,
            href  : _random * 4
        };
        _sut.source   = {
            a         : _random,
            b         : _random * 2,
            parameter : _random * 3,
            pointer   : _random * 4,
            q         : _random * 5
        };
        this._assert(
            '',
            _sut.toJSON(),
            {
                links  : {
                    about : _random
                },
                source : {
                    parameter : _random * 3,
                    pointer   : _random * 4
                }
            }
        );
    }
};
