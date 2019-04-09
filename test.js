const assert         = require('assert');
const jfJsonApiRoot  = require('./src/Root');
const jfJsonApiLinks = require('./src/Links');

/**
 * Comprobamos tanto Links como Link.
 */
function testLinks()
{
    const _assert = (links, expected) =>
    {
        const _value = JSON.parse(
            JSON.stringify(
                {
                    links
                }
            )
        );
        if (expected === true)
        {
            assert.equal(links.hasValue(_value), false);
        }
        else
        {
            assert.deepEqual(_value, expected);
        }
    };
    const _href   = {
        href : 'http://www.joaquinfernandez.net'
    };
    const _meta   = {
        meta : {
            test : 'testing'
        }
    };
    //------------------------------------------------------------------------------
    // Verifica que si no hay enlaces se devuelva un objeto vacío.
    //------------------------------------------------------------------------------
    let _links = new jfJsonApiLinks();
    _assert(_links, true);
    //------------------------------------------------------------------------------
    // Verifica que si se agrega solamente href se devuelva como texto.
    //------------------------------------------------------------------------------
    _links = new jfJsonApiLinks(
        {
            self : _href.href
        }
    );
    _assert(_links, { links : { self : _href.href } });
    _links = new jfJsonApiLinks(
        {
            self : _href
        }
    );
    _assert(_links, { links : { self : _href.href } });
    //------------------------------------------------------------------------------
    // Verifica que si se agrega solamente meta se devuelva un objeto vacío.
    //------------------------------------------------------------------------------
    _links = new jfJsonApiLinks(
        {
            self : _meta
        }
    );
    _assert(_links, true);
    //------------------------------------------------------------------------------
    // Verifica que se devuelvan todos los campos.
    //------------------------------------------------------------------------------
    _links = new jfJsonApiLinks(
        {
            self : Object.assign(_href, _meta)
        }
    );
    _assert(_links, { links : { self : Object.assign(_href, _meta) } });
}

// testLinks();
const config = {
    'jsonapi'  : { 'version' : '1.0' },
    'data'     : [
        {
            'type'          : 'articles',
            'id'            : '1',
            'attributes'    : {
                'title'   : 'JSON API paints my bikeshed!',
                'body'    : 'The shortest article. Ever.',
                'created' : '2015-05-22T14:56:29.000Z',
                'updated' : '2015-05-22T14:56:28.000Z'
            },
            'relationships' : {
                'author' : {
                    'data' : { 'id' : '42', 'type' : 'people' }
                }
            }
        }
    ],
    'included' : [
        {
            'type'       : 'people',
            'id'         : '42',
            'attributes' : {
                'name'   : 'John',
                'age'    : 80,
                'gender' : 'male'
            }
        }
    ],
    'links'    : {
        'self'  : 'http://example.com/articles?page[number]=3&page[size]=3',
        'first' : 'http://example.com/articles?page[number]=1&page[size]=1',
        'prev'  : 'http://example.com/articles?page[number]=2&page[size]=2',
        'next'  : 'http://example.com/articles?page[number]=4&page[size]=4',
        'last'  : 'http://example.com/articles?page[number]=13&page[size]=5'
    }/*,
    'errors'   : [
        {
            'code'   : '123',
            'source' : { 'pointer' : '/data/attributes/first-name' },
            'title'  : 'Value is too short',
            'detail' : 'First name must contain at least three characters.'
        },
        {
            'code'   : '225',
            'source' : { 'pointer' : '/data/attributes/password' },
            'title'  : 'Passwords must contain a letter, number, and punctuation character.',
            'detail' : 'The password provided is missing a punctuation character.'
        },
        {
            'code'   : '226',
            'source' : { 'pointer' : '/data/attributes/password' },
            'title'  : 'Password and password confirmation do not match.'
        }
    ]*/
};
assert.deepEqual(
    // Creamos una copia para evitar modificaciones al pasarse por referencia
    JSON.parse(JSON.stringify(config)),
    JSON.parse(JSON.stringify(new jfJsonApiRoot(config)))
);
