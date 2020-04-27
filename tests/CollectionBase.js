const jfJsonApiBase           = require('../src/Base');
const jfJsonApiCollectionBase = require('../src/CollectionBase');
const jfTestsUnit             = require('@jf/tests/src/type/Unit');

class TestItem
{
    constructor(config)
    {
        if (config)
        {
            Object.assign(this, config);
        }
    }
}

class TestCollection extends jfJsonApiCollectionBase
{
    static get ITEM()
    {
        return TestItem;
    }
}

const names = [ 'a', 'b', 'c' ];
const items = Array.from({ length : 10 }).map(
    (_, index) => ({
        prop1 : Math.random(),
        prop2 : Math.random(),
        prop3 : names[index % names.length]
    })
);
/**
 * Pruebas unitarias de la clase `jf.JsonApi.CollectionBase`.
 */
module.exports = class jfJsonApiCollectionBaseTest extends jfTestsUnit
{
    /**
     * @override
     */
    static get title()
    {
        return 'jf.JsonApi.CollectionBase';
    }

    /**
     * Comprueba la definición de la clase.
     */
    testDefinition()
    {
        this._testDefinition(
            jfJsonApiCollectionBase,
            null,
            {
                allowEmptyValues : false,
                items            : []
            }
        );
        this.assertException(
            () => jfJsonApiCollectionBase.ITEM,
            Error,
            'Abstract property'
        );
    }

    /**
     * Comprueba la herencia de la clase.
     */
    testInheritance()
    {
        this._testInheritance(jfJsonApiCollectionBase, jfJsonApiBase);
    }

    /**
     * Pruebas del método `add`.
     */
    testAdd()
    {
        const _sut = new TestCollection(items);
        items.forEach(
            (_, index) => this.assertTrue(_sut.items[index] instanceof TestItem)
        );
        this._assert('', _sut.toJSON(), items);
    }

    /**
     * Pruebas del método `constructor`.
     */
    testConstructor()
    {
        this.constructor.getAllTypes()
            .filter(value => !jfJsonApiBase.isObject(value))
            .forEach(value => this._assert('', Object.assign({}, new TestCollection(value)), { items : [] }));
    }

    /**
     * Pruebas del método `groupBy`.
     */
    testGroupBy()
    {
        const _sut    = new TestCollection(items);
        const _groups = {};
        const _prop   = 'prop3';
        items.forEach(
            item =>
            {
                const _key = item[_prop];
                if (_key in _groups)
                {
                    _groups[_key].push(new TestItem(item));
                }
                else
                {
                    _groups[_key] = [new TestItem(item)];
                }
            }
        );
        this._assert('', _sut.groupBy(_prop), _groups);
    }

    /**
     * Pruebas del método `groupBy` con nombres de propiedad incorrectos.
     */
    testGroupByWrongProperty()
    {
        const _values = this.constructor.getAllTypes().filter(value => !jfJsonApiBase.isObject(value));
        let _sut      = new TestCollection();
        this._assert('', _sut.groupBy(), {});
        _values.forEach(value => this._assert('', _sut.groupBy(value), {}));
        _sut = new TestCollection(items);
        _values.forEach(value => this._assert('', _sut.groupBy(value), {}));
    }

    /**
     * Pruebas del método `setProperties`.
     */
    testSetProperties()
    {
        const _sut = new TestCollection();
        _sut.setProperties(items);
        this._assert('', _sut, new TestCollection(items));
    }

    /**
     * Pruebas del método `setProperties`.
     */
    testSetPropertiesAllValues()
    {
        this.constructor.getAllTypes().forEach(
            value =>
            {
                const _sut = new TestCollection();
                _sut.setProperties(value);
                this.assertUndefined(_sut.toJSON());
            }
        );
        //------------------------------------------------------------------------------
        let _sut = new TestCollection();
        _sut.setProperties({ items });
        this._assert('', _sut.toJSON(), items);
        //------------------------------------------------------------------------------
        _sut = new TestCollection();
        _sut.setProperties({ items: items[0] });
        this.assertUndefined(_sut.toJSON());
    }

    /**
     * Pruebas del método `toJSON`.
     */
    testToJSON()
    {
        const _sut = new TestCollection();
        this.assertUndefined(_sut.toJSON());
        _sut.setProperties({ items });
        this._assert('', _sut.toJSON(), items);
    }
};
