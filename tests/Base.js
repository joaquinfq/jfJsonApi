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
        // Si data está vacío, no hace nada.
        _sut.data = {};
        _sut.keepKeys('data', ['c']);
        this._assert('', _sut.data, {});
        // Si data no es un objeto, no hace nada.
        this.constructor.getAllTypes()
            .filter(value => value && typeof value !== 'object')
            .forEach(
                value => {
                    _sut.data = value;
                    _sut.keepKeys('data', ['a','b','c','d','e']);
                    this._assert('', _sut.data, value);
                }
            );
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
        let _aev   = true;
        const _Sut = class extends jfJsonApiBase
        {
            get allowEmptyValues()
            {
                return _aev;
            }
        };
        const _sut = new _Sut();
        const _values = this.constructor.getAllTypes().filter(v => v !== undefined && typeof v !== 'function');
        let _expected = {};
        _values.forEach(
            (value, index) => {
                const _key      = String.fromCharCode(65 + index);
                _sut[_key]      = value;
                _expected[_key] = value;
            }
        );
        this._assert('', _sut.toJSON(), _expected);
        _aev      = false;
        _expected = {};
        _values.forEach(
            (value, index) => {
                if (value !== undefined && value !== '' && value !== null && (!Array.isArray(value) || value.length > 0) && (!jfJsonApiBase.isObject(value) || Object.keys(value).length > 0))
                {
                    const _key      = String.fromCharCode(65 + index);
                    _expected[_key] = value;
                }
            }
        );
        this._assert('', _sut.toJSON(), _expected);
    }
};
