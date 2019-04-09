const jfJsonApiCollectionBase = require('../src/CollectionBase');
const jfJsonApiResource       = require('../src/Resource');
const jfJsonApiResources      = require('../src/Resources');
const jfTestsUnit             = require('@jf/tests/src/type/Unit');
/**
 * Pruebas unitarias de la clase `jf.JsonApi.Resources`.
 */
module.exports = class jfJsonApiResourcesTest extends jfTestsUnit
{
    /**
     * @override
     */
    static get title()
    {
        return 'jf.JsonApi.Resources';
    }

    /**
     * Comprueba la definición de la clase.
     */
    testDefinition()
    {
        this._testDefinition(
            jfJsonApiResources,
            {
                ITEM : jfJsonApiResource
            },
            {
                allowEmptyValues : false
            }
        );
    }

    /**
     * Comprueba la herencia de la clase.
     */
    testInheritance()
    {
        this._testInheritance(jfJsonApiResources, jfJsonApiCollectionBase);
    }

    /**
     * Pruebas del método `add`.
     */
    testAdd()
    {
        const _item = {
            id   : Math.random(),
            type : Math.random()
        };
        const _sut  = new jfJsonApiResources(
            [
                _item
            ]
        );
        this.assertTrue(_sut.items[0] instanceof jfJsonApiResource);
        this._assert('', _sut.toJSON(), [ _item ]);
    }
};
