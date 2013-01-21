var at = require('./build').at,
setAt = require('./build').setAt,
__should = require('should');

describe('at', function(){
    it('should be able to get and set at any arbitrary path on the object', function(){
        var o = {a:{b:1}};
        at(o, 'a.b').should.be.eql(1);
        (undefined === at(o, 'a.c.d')).should.be.eql(true);
        setAt(o, 'a.c.d.e', 'xyz');
        o.a.c.d.e.should.eql('xyz');
    });
});
