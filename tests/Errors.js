const jfJsonApiCollectionBase = require('../src/CollectionBase');
const jfJsonApiError          = require('../src/Error');
const jfJsonApiErrors         = require('../src/Errors');
const jfTestsUnit             = require('@jf/tests/src/type/Unit');
/**
 * Pruebas unitarias de la clase `jf.JsonApi.Errors`.
 */
module.exports = class jfJsonApiErrorsTest extends jfTestsUnit
{
    /**
     * @override
     */
    static get title()
    {
        return 'jf.JsonApi.Errors';
    }

    /**
     * Comprueba la definición de la clase.
     */
    testDefinition()
    {
        this._testDefinition(
            jfJsonApiErrors,
            {
                ITEM : jfJsonApiError
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
        this._testInheritance(jfJsonApiErrors, jfJsonApiCollectionBase);
    }

    /**
     * Pruebas del método `add`.
     */
    testAdd()
    {
        const _item = {
            id    : Math.random(),
            code  : Math.random(),
            title : Math.random()
        };
        const _sut  = new jfJsonApiErrors(
            [
                _item
            ]
        );
        this.assertTrue(_sut.items[0] instanceof jfJsonApiError);
        this._assert('', _sut.toJSON(), [_item]);
    }
};
