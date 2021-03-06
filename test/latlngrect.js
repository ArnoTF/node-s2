var test = require('tap').test,
    s2 = require('../');

test('S2LatLngRect', function(t) {

    var ll = new s2.S2LatLngRect(new s2.S2LatLng(10, 20));
    t.ok(ll, 'generates latlng object');
    t.ok(ll.center(), '.center');
    t.equal(ll.area(), 0, '.area');
    t.ok(ll.size() instanceof s2.S2LatLng, '.size');
    t.ok(ll.getCapBound() instanceof s2.S2Cap, '.getCapBound');
    t.ok(ll.getVertex(0), '.getVertex');
    t.equal(ll.contains(new s2.S2LatLng(50, 50)), false, '.contains');
    t.equal(ll.isValid(), true, '.isValid');
    t.equal(ll.isEmpty(), false, '.isEmpty');
    t.equal(ll.isPoint(), true, '.isPoint');

    for(var x in ll){
        console.log(x)
    }
    console.log('\n\n')

    t.throws(function() {
        new s2.S2LatLngRect(1);
    });

    var ll2 = new s2.S2LatLngRect(new s2.S2LatLng(10, 20), new s2.S2LatLng(20, 30));
    t.ok(ll2, 'generates latlng object from (latlng, latlng)');
    t.deepEqual(ll2.toGeoJSON(), {
      "type" : "Polygon", // != undefined
      "coordinates" : [[[[20,10],[29.999999999999996,10],[29.999999999999996,20],[20,20],[20,10]]]] // != undefined
    }, '.toGeoJSON');

    t.test('union & intersection', function(t) {
        var a = new s2.S2LatLngRect(new s2.S2LatLng(10, 20), new s2.S2LatLng(20, 30));
        var b = new s2.S2LatLngRect(new s2.S2LatLng(10, 20), new s2.S2LatLng(20, 50));
        var c = a.union(b);
        t.ok(c.approxEquals(b));
        var d = a.intersection(b);
        t.end();
    });

    t.end();
});
