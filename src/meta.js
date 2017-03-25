const Base = require('./base');
/**
 * Where specified, a meta member can be used to include non-standard meta-information.
 *
 * The value of each meta member MUST be an object (a `meta object`).
 *
 * Any members MAY be specified within meta objects.
 *
 * @namespace jf.JsonApi
 * @class     jf.JsonApi.Meta
 * @extends   jf.JsonApi.Base
 */
module.exports = class Meta extends Base {
    /**
     * @override
     */
    allowEmptyValues()
    {
        return true;
    }
};
