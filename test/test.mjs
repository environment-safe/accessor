/* global describe:false */
import { chai } from '@environment-safe/chai';
import { it } from '@open-automaton/moka';
import * as access from '../src/index.mjs';
const should = chai.should();

const testObject = {
    something : 'somevalue',
    parentthing : {
        subthing : 'subvalue',
        subparent : {
            subthing : 'subsubvalue'
        }
    }
};

const testObjectWithArray = {
    something : 'somevalue',
    parentlist : [
        {
            subthing : 'subvalue',
            subparent : {
                subthing : 'subsubvalue'
            }
        },
        {
            subthing : 'alternatevalue',
            subparent : {
                subthing : 'differentsubsubvalue'
            }
        }
    ]
};
const createAugmentedObject = function(){
    const object = {};
    const data = copy(testObject);
    access.augment(object, data);
    return object;
};
const copy = function(ob){ 
    return JSON.parse(JSON.stringify(ob));
};

describe('object-access', function(){
    describe('augments an object', function(){
        it('augmented: with attached functions', function(){
            const object = createAugmentedObject();
            should.exist(object.get);
            should.exist(object.set);
        });

        it('augmented: gets a value', function(){
            const object = createAugmentedObject();
            const value = object.get('something');
            should.exist(value);
            value.should.equal('somevalue');
        });

        it('augmented: sets a value', function(){
            const object = createAugmentedObject();
            object.set('something', 'someothervalue');
            const value = object.get('something');
            should.exist(value);
            value.should.equal('someothervalue');
        });

        it('augmented: gets a subvalue', function(){
            const object = createAugmentedObject();
            const value = object.get('parentthing.subthing');
            should.exist(value);
            value.should.equal('subvalue');
        });

        it('augmented: sets a subvalue', function(){
            const object = createAugmentedObject();
            object.set('parentthing.subthing', 'someothervalue');
            const value = object.get('parentthing.subthing');
            should.exist(value);
            value.should.equal('someothervalue');
        });

        it('augmented: gets a deep value', function(){
            const object = createAugmentedObject();
            const value = object.get('parentthing.subparent.subthing');
            should.exist(value);
            value.should.equal('subsubvalue');
        });

        it('augmented: sets a deep value', function(){
            const object = createAugmentedObject();
            object.set('parentthing.subparent.subthing', 'someothervalue');
            const value = object.get('parentthing.subparent.subthing');
            should.exist(value);
            value.should.equal('someothervalue');
        });

    });

    describe('accesses through an object', function(){
        it('gets a value', function(){
            const data = copy(testObject);
            const value = access.get(data, 'something');
            should.exist(value);
            value.should.equal('somevalue');
        });

        it('sets a value', function(){
            const data = copy(testObject);
            access.set(data, 'something', 'someothervalue');
            const value = access.get(data, 'something');
            should.exist(value);
            value.should.equal('someothervalue');
        });

        it('gets a subvalue', function(){
            const data = copy(testObject);
            const value = access.get(data, 'parentthing.subthing');
            should.exist(value);
            value.should.equal('subvalue');
        });

        it('sets a subvalue', function(){
            const data = copy(testObject);
            access.set(data, 'parentthing.subthing', 'someothervalue');
            const value = access.get(data, 'parentthing.subthing');
            should.exist(value);
            value.should.equal('someothervalue');
        });

        it('gets a deep value', function(){
            const data = copy(testObject);
            const value = access.get(data, 'parentthing.subparent.subthing');
            should.exist(value);
            value.should.equal('subsubvalue');
        });

        it('sets a deep value', function(){
            const data = copy(testObject);
            access.set(data, 'parentthing.subparent.subthing', 'someothervalue');
            const value = access.get(data, 'parentthing.subparent.subthing');
            should.exist(value);
            value.should.equal('someothervalue');
        });
    });

    describe('uses wildcard access to pull groups', function(){
        it('gets a set of subthings through an array', function(){
            const data = copy(testObjectWithArray);
            const values = access.getAll(data, 'parentlist.*.subthing');

            should.exist(values.length);
            values.length.should.equal(2);

            should.exist(values[0]);
            should.exist(values[0].value);
            values[0].value.should.equal('subvalue');
            should.exist(values[0].path);
            values[0].path.should.equal('parentlist.0.subthing');

            should.exist(values[1]);
            should.exist(values[1].value);
            values[1].value.should.equal('alternatevalue');
            should.exist(values[1].path);
            values[1].path.should.equal('parentlist.1.subthing');
        });
    });

    describe('handles nonexistence', function(){
        it('fails to set a nonexistent path', function(){
            const data = copy(testObject);
            access.set(data, 'parentthing.notathing.subnot', 'someothervalue');
        });

        it('sets a nonexistent path when prompted', function(){
            const data = copy(testObject);
            access.set(data, 'parentthing.notathing.subnot', 'someothervalue');
        });
    });
});

