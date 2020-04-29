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
            {
                NAME : 'Root'
            },
            {
                allowEmptyValues : false,
                data             : new jfJsonApiResources(),
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
        let _add         = 0;
        let _parseData   = 0;
        const _root      = new jfJsonApiRoot({ data : null });
        const _resource  = new jfJsonApiResource();
        _resource.add    = () => ++_add;
        _root._parseData = () => ++_parseData;
        const _values    = this.constructor.getAllTypes();
        _values.forEach(_root.addData, _root);
        this._assert('', _add, 0);
        this._assert('', _parseData, _values.length);
        const _length = Math.ceil(Math.random() * 20) + 5;
        _root.data    = _resource;
        Array.from({ length : _length }).forEach(() => _root.addData(new jfJsonApiResource()));
        this._assert('', _add, _length);
        this._assert('', _parseData, _values.length);
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
