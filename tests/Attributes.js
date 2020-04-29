const jfJsonApiAttributes = require('../src/Attributes');
const jfJsonApiMeta       = require('../src/Meta');
const jfJsonApiMetaTests  = require('./Meta');
/**
 * Pruebas unitarias de la clase `jf.JsonApi.Attributes`.
 */
module.exports = class jfJsonApiAttributesTest extends jfJsonApiMetaTests
{
    /**
     * @override
     */
    static get title()
    {
        return 'jf.JsonApi.Attributes';
    }

    constructor()
    {
        super();
        this.Class = jfJsonApiAttributes;
    }

    /**
     * Comprueba la definición de la clase.
     */
    testDefinition()
    {
        this._testDefinition(
            jfJsonApiAttributes,
            {
                NAME : 'Attributes'
            },
            {
                allowEmptyValues : true
            }
        );
    }

    /**
     * Comprueba la herencia de la clase.
     */
    testInheritance()
    {
        this._testInheritance(jfJsonApiAttributes, jfJsonApiMeta);
    }
};
