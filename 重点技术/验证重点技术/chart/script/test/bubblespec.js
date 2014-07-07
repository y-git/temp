var bubbleSort = require('./bubbleSort'); //引入bubbleSort.js

describe('basic tests', function(){
    it('test sample', function(){
        expect(bubbleSort.bubbleSort([42,75,84,63,13])).toEqual([13,42,63,75,84]);
    });
});