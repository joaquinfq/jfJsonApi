const jfJsonApiJsonApi  = require('../src/JsonApi');
const jfJsonApiMeta     = require('../src/Meta');
const jfJsonApiTestBase = require('./_Base');
/**
 * Pruebas unitarias de la clase `jf.JsonApi.JsonApi`.
 */
module.exports = class jfJsonApiJsonApiTest extends jfJsonApiTestBase
{
    /**
     * @override
     */
    static get title()
    {
        return 'jf.JsonApi.JsonApi';
    }

    /**
     * @override
     */
    constructor()
    {
        super();
        this.Class = jfJsonApiJsonApi;
    }

    /**
     * @override
     */
    getDefaults()
    {
        return {
            allowEmptyValues : false,
            meta             : new jfJsonApiMeta(),
            version          : '1.0'
        };
    }

    /**
     * @override
     */
    testSetProperties()
    {
        super.testSetProperties(
            {
                meta    : {
                    a : Math.random(),
                    b : Math.random()
                },
                version : Date.now()
            }
        );
    }
};
