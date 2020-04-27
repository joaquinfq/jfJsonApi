const jfJsonApiAttributes             = require('../src/Attributes');
const jfJsonApiLinks                  = require('../src/Links');
const jfJsonApiRelationships          = require('../src/Relationships');
const jfJsonApiResource               = require('../src/Resource');
const jfJsonApiResourceIdentifier     = require('../src/ResourceIdentifier');
const jfJsonApiResourceIdentifierTest = require('./ResourceIdentifier');
/**
 * Pruebas unitarias de la clase `jf.JsonApi.Resource`.
 */
module.exports = class ResourceTest extends jfJsonApiResourceIdentifierTest
{
    /**
     * @override
     */
    static get title()
    {
        return 'jf.JsonApi.Resource';
    }

    /**
     * @override
     */
    constructor()
    {
        super();
        this.Class = jfJsonApiResource;
    }

    /**
     * @override
     */
    getDefaults()
    {
        return Object.assign(
            super.getDefaults(),
            {
                attributes    : new jfJsonApiAttributes(),
                links         : new jfJsonApiLinks(),
                relationships : new jfJsonApiRelationships()
            }
        );
    }

    /**
     * Comprueba la herencia de la clase.
     */
    testInheritance()
    {
        this._testInheritance(jfJsonApiResource, jfJsonApiResourceIdentifier);
    }

    testSetPropertiesDataTypeModel()
    {
        const _Class = class
        {
            static get ID()
            {
                return 'modelId';
            }
            static get TYPE()
            {
                return 'integer';
            }

            toJSON()
            {
                return Object.assign({}, this);
            }
        };
        const _instance = new _Class();
        Object.assign(
            _instance,
            {
                modelId : Math.random(),
                name    : 'ModelName'
            }
        );
        this._assert(
            '',
            new jfJsonApiResource(_instance).toJSON(),
            {
                id         : _instance.modelId,
                type       : _Class.TYPE,
                attributes : {
                    modelId : _instance.modelId,
                    name    : _instance.name
                }
            }
        );
        this._assert(
            '',
            new jfJsonApiResource({ attributes: _instance }).toJSON(),
            {
                id         : _instance.modelId,
                type       : _Class.TYPE,
                attributes : {
                    modelId : _instance.modelId,
                    name    : _instance.name
                }
            }
        );
    }

    testSetPropertiesObjectModel()
    {
        const _data = {
            __ID    : 'modelId',
            __TYPE  : 'string',
            modelId : Math.random(),
            name    : 'ModelName'
        };
        this._assert(
            '',
            new jfJsonApiResource(_data).toJSON(),
            {
                id         : _data.modelId,
                type       : _data.__TYPE,
                attributes : {
                    modelId : _data.modelId,
                    name    : _data.name
                }
            }
        );
        _data.__ID = 'abcde';
        this._assert(
            '',
            new jfJsonApiResource(_data).toJSON(),
            {
                type       : _data.__TYPE,
                attributes : {
                    modelId : _data.modelId,
                    name    : _data.name
                }
            }
        );
        // Si la clave TYPE no existe, no se asignan los valores.
        _data.__ID = 'modelId';
        delete _data.__TYPE;
        this._assert('', new jfJsonApiResource({ attributes : _data }).toJSON(), {});
    }
};
