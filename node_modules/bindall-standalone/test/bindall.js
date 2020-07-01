var test = require('tape');
var bindAll = require('../index.js');

test('bindAll with no argument', function (assert) {
    assert.plan(1);

    var randomFloat = {
        value: Math.random() * 100,
        getValue: function() {
            return this.value;
        }
    };

    bindAll();

    assert.pass('bindAll should not throw an error when called without parameter.');
});

test('bindAll with one argument', function (assert) {
    assert.plan(2);

    var randomFloat = {
        value: Math.random() * 100,
        getValue: function() {
            return this.value;
        }
    };

    bindAll(randomFloat, 'getValue');
    var getter = randomFloat.getValue;

    assert.equal(getter(), randomFloat.getValue(), 'getter() should be equal to randomFloat.getValue()');

    var greeter = {
        name: 'Bob',
        greet: function() {
            return 'Hello! My name is', this.name;
        }
    };

    bindAll(greeter, 'greet');
    var greet = greeter.greet;

    assert.equal(greet(), greeter.greet(), 'greet() should return the same thing as greeter.greet()');
});

test('bindAll with two arguments', function (assert) {
    assert.plan(3);

    var randomFloat = {
        value: Math.random() * 100,
        getValue: function() {
            return this.value;
        },
        setValue: function(val) {
            this.value = val;
        }
    };

    bindAll(randomFloat, 'getValue', 'setValue');
    var getter = randomFloat.getValue;
    var setter = randomFloat.setValue;

    assert.equal(getter(), randomFloat.getValue(), 'getter() should be equal to randomFloat.getValue()');

    var newValue = 120;
    setter(newValue);
    assert.equal(randomFloat.value, newValue);
    assert.equal(getter(), randomFloat.getValue(), 'setter should have update randomFloat.value to 120');
});

test('bindAll without argument (all methods)', function (assert) {
    assert.plan(3);

    var randomFloat = {
        value: Math.random() * 100,
        getValue: function() {
            return this.value;
        },
        setValue: function(val) {
            this.value = val;
        }
    };

    bindAll(randomFloat);
    var getter = randomFloat.getValue;
    var setter = randomFloat.setValue;

    assert.equal(getter(), randomFloat.getValue(), 'getter() should be equal to randomFloat.getValue()');

    var newValue = 120;
    setter(newValue);
    assert.equal(randomFloat.value, newValue);
    assert.equal(getter(), randomFloat.getValue(), 'setter should have update randomFloat.value to 120');
});