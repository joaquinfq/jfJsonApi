const jfJsonApiMeta               = require('../src/Meta');
const jfJsonApiResourceIdentifier = require('../src/ResourceIdentifier');
const jfJsonApiTestBase           = require('./_Base');
/**
 * Pruebas unitarias de la clase `jf.JsonApi.ResourceIdentifier`.
 */
module.exports = class jfJsonApiResourceIdentifierTest extends jfJsonApiTestBase
{
    /**
     * @override
     */
    static get title()
    {
        return 'jf.JsonApi.ResourceIdentifier';
    }

    constructor()
    {
        super();
        this.Class = jfJsonApiResourceIdentifier;
    }

    /**
     * @override
     */
    getDefaults()
    {
        return {
            allowEmptyValues : false,
            id               : null,
            meta             : new jfJsonApiMeta(),
            type             : ''
        };
    }

    /**
     * @override
     */
    testSetProperties()
    {
        super.testSetProperties(
            {
                id   : Date.now(),
                meta : {
                    a : Math.random(),
                    b : Math.random()
                },
                type : Math.random()
            }
        );
    }
};
