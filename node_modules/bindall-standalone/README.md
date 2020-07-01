bindall-standalone
==================

Allow to permanently mutate an object's method so it context `this` will always be bound to this object.

Allow to avoid the non-unbindable listeners registered via `emitter.on(foo, this.bar.bind(this));`.

## Installation
`npm install bindall-standalone --save`

Then just `var bindAll = require('bindall-standalone')`. Works with require() e.g. node.js, browserify or component(1).

## API
### `bindAll(object, *methods);`

Mutates all methods from `object`, passed as a list of strings (such as `'foo', 'bar'`) so they always will be called with the context bound to the `object`.

### `bindAll(object);`
Bind **ALL** methods available on the object.

## Usage

### Basic example

```
var bindAll = require('bindall-standalone');

var object = {
    foo: 10,
    bar: function() {
        return this.foo;
    }
};

object.bar(); // 10

var func = object.bar;
func(); // undefined

bindAll(object, 'bar');
var func = object.bar;
func(); // 10
```

### Real-world example

```
var bindAll = require('bindall-standalone');

var Foo = function() {
    bindAll(this, 'onReady');

    // mediator.on('ready', this.onReady.bind(this)); // Never going to be unbinded !
    mediator.on('ready', this.onReady); // No need for explicit 'bind' now !
};

Foo.prototype.onReady = function() {
    // mediator.off('ready', this.onReady.bind(this)); // That is sad, bro
    mediator.off('ready', this.onReady); // Properly unbinded !
};

```

## What is this
It used to be a standalone version of underscore's `_.bindAll()` function for IE9+ browsers.
But since bindAll goal is to provide a quick way to bind/unbind methods, and only that, I updated it to use a quicker, more compatible `bind` function.

See the [underscore source](http://underscorejs.org/docs/underscore.html) for reference.

Basically, it avoids this use case:

```
mediator.on('foo', this.bar.bind(this));
mediator.off('foo', this.bar.bind(this));
// will never be unbinded because this.bar.bind(this) != this.bar.bind(this)
```

## Under the hood
Since bindAll's only goal is to bind a method to its object context, the bind function can be written as:

```
function bind(func, context) {
  return function() {
    return func.apply(context, arguments);
  };
}
```

No need for the modern `bind` function, no need for a polyfill.
And it's a lot faster ! Check this [jsPerf case](http://jsperf.com/native-bind-vs-fast-bind).

## Caveats
There is one significant thing to know: by binding a method on it's object context, it creates an instance-level method.
Check this [article](http://freshbrewedcode.com/jimcowart/2013/02/12/getting-into-context-binds/) and this [fiddle](http://jsfiddle.net/ayamflow/8WKvU/) for more info.