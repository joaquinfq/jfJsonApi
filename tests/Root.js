const jfJsonApiBase      = require('../src/Base');
const jfJsonApiErrors    = require('../src/Errors');
const jfJsonApiLinks     = require('../src/Links');
const jfJsonApiJsonApi   = require('../src/JsonApi');
const jfJsonApiMeta      = require('../src/Meta');
const jfJsonApiResource  = require('../src/Resource');
const jfJsonApiResources = require('../src/Resources');
const jfJsonApiRoot      = require('../src/Root');
const jfTestsUnit        = require('@jf/tests/src/type/Unit');
/**
 * Pruebas unitarias de la clase `jf.JsonApi.Root`.
 */
module.exports = class jfJsonApiRootTest extends jfTestsUnit
{
    /**
     * @override
     */
    static get title()
    {
        return 'jf.JsonApi.Root';
    }

    /**
     * Comprueba la definición de la clase.
     */
    testDefinition()
    {
        this._testDefinition(
            jfJsonApiRoot,
            null,
            {
                allowEmptyValues : false,
                data             : new jfJsonApiResource(),
                errors           : new jfJsonApiErrors(),
                included         : new jfJsonApiResources(),
                links            : new jfJsonApiLinks(),
                jsonapi          : new jfJsonApiJsonApi(),
                meta             : new jfJsonApiMeta()
            }
        );
    }

    /**
     * Comprueba la herencia de la clase.
     */
    testInheritance()
    {
        this._testInheritance(jfJsonApiRoot, jfJsonApiBase);
    }

    /**
     * Pruebas del método `addData`.
     */
    testAddData()
    {
    }

    /**
     * Pruebas del método `constructor`.
     */
    testConstructor()
    {
    }

    /**
     * Pruebas del método `toApp`.
     */
    testToApp()
    {
    }

    /**
     * Pruebas del método `toJSON`.
     */
    testToJSON()
    {
    }

    /**
     * Pruebas del método `toServer`.
     */
    testToServer()
    {
    }
};
