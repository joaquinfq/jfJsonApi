const jfJsonApiBase = require('../src/Base');
const jfTestsUnit   = require('@jf/tests/src/type/Unit');
/**
 * Clase base para las pruebas unitarias.
 */
module.exports = class jfJsonApiTestBase extends jfTestsUnit
{
    /**
     * @override
     */
    constructor()
    {
        super();
        this.Class = null;
    }

    /**
     * Devuelve los valores por defecto que tiene la clase.
     *
     * @return {object}
     */
    getDefaults()
    {
        return {
            allowEmptyValues : false
        };
    }

    /**
     * Pruebas del método `constructor`.
     */
    testConstructor()
    {
        const _defaults = this.getDefaults();
        delete _defaults.allowEmptyValues;
        this._assert('', Object.assign({}, new this.Class()), _defaults);
    }

    /**
     * Comprueba la definición de la clase.
     */
    testDefinition()
    {
        this._testDefinition(this.Class, null, this.getDefaults());
    }

    /**
     * Comprueba la herencia de la clase.
     */
    testInheritance()
    {
        this._testInheritance(this.Class, jfJsonApiBase);
    }

    /**
     * Pruebas del método `setProperties`.
     */
    testSetProperties(expected = {})
    {
        delete expected.allowEmptyValues;
        const _Class = this.Class;
        const _sut   = new _Class(expected);
        this._assert('', _sut.toJSON(), expected);
    }

    /**
     * Pruebas del método `setProperties` con valores vacíos.
     */
    stestSetPropertiesEmpty()
    {
        const _Class    = this.Class;
        const _expected = this.getDefaults();
        delete _expected.allowEmptyValues;
        this._assert('', new _Class(), _expected);
        this.constructor.getAllTypes()
            .filter(value => !jfJsonApiBase.isObject(value))
            .forEach(value => this._assert('', Object.assign({}, new _Class(value)), _expected));
    }
};
