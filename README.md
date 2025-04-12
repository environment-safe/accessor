@environment-safe/accessor
==========================
a simple module to add a get/set to an object that is bound to an arbitrary data object and request deep items from it (`something.someotherthing.somedeepthing`), or alternatively fetch deep items directly through a data object

Usage
-----

```js
    var access = require('@environment-safe/accessor');
    var data = { /* some data here*/ };
    var object = access.augment({}, data);
    object.get('somefield.subfield');
    object.set('toplevelfield', 'some value');
    //or
    access.get(data, 'somefield.subfield');
    access.set(data, 'toplevelfield', 'some value');

    access.getAll(data, 'someList.*.subfield');
    access.setAll(data, 'someList.*.subfield', 'some value');

```

Testing
-------

Run the es module tests to test the root modules
```bash
npm run import-test
```
to run the same test inside the browser:

```bash
npm run browser-test
```
to run the same test headless in chrome:
```bash
npm run headless-browser-test
```

to run the same test inside docker:
```bash
npm run container-test
```

Run the commonjs tests against the `/dist` commonjs source (generated with the `build-commonjs` target).
```bash
npm run require-test
```

Development
-----------
All work is done in the .mjs files and will be transpiled on commit to commonjs and tested.

If the above tests pass, then attempt a commit which will generate .d.ts files alongside the `src` files and commonjs classes in `dist`

