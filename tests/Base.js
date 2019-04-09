const jfObject      = require('@jf/object');
const jfJsonApiBase = require('../src/Base');
const jfTestsUnit   = require('@jf/tests/src/type/Unit');
/**
 * Pruebas unitarias de la clase `jf.JsonApi.Base`.
 */
module.exports = class jfJsonApiBaseTest extends jfTestsUnit
{
    /**
     * @override
     */
    static get title()
    {
        return 'jf.JsonApi.Base';
    }

    /**
     * Comprueba la definición de la clase.
     */
    testDefinition()
    {
        this._testDefinition(
            jfJsonApiBase,
            null,
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
        this._testInheritance(jfJsonApiBase, jfObject);
    }

    /**
     * Pruebas del método `constructor`.
     */
    testConstructor()
    {
        let _args;
        const _Class = class extends jfJsonApiBase
        {
            setProperties(...args)
            {
                _args = args;
            }
        };
        this.constructor.getAllTypes().forEach(
            value =>
            {
                new _Class(value);
                this._assert('', _args, [value]);
            }
        );
    }

    /**
     * Pruebas del método `hasValue`.
     */
    testHasValue()
    {
        const _sut = new jfJsonApiBase();
        this.constructor.getAllTypes()
            .filter(value => typeof value !== 'boolean')
            .filter(value => typeof value !== 'number')
            .filter(value => typeof value !== 'string' || value === '')
            .filter(value => !value || Object.keys(value).length === 0)
            .forEach(value => this.assertFalse(_sut.hasValue(value)));
    }

    /**
     * Pruebas del método `keepKeys`.
     */
    testKeepKeys()
    {
        const _value = Math.random();
        const _data = {
            a : Math.random(),
            b : Math.random(),
            c : _value,
            d : Math.random(),
            e : Math.random()
        };
        const _sut = new jfJsonApiBase();
        _sut.data = _data;
        _sut.keepKeys('data', ['c']);
        this._assert('', _sut.data, { c : _value });
    }

    /**
     * Pruebas del método `setProperties`.
     */
    testSetProperties()
    {
        const _sut = this.sut;
    }

    /**
     * Pruebas del método `toJSON`.
     */
    testToJSON()
    {
        const _sut = this.sut;
    }
};
