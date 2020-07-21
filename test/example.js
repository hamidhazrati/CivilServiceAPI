const {describe, it} = require('mocha');
let assert = require('assert');
// const chai = require('chai');
// const sinon = require('sinon');

describe('Test if assets have been defined', function() {
    const config = require('../assets/config.json');
    it('cityLongLat is defined', function() {
        assert(config.cityLongLat.length === 2);
    });
    it('allUsersUrl is defined', function() {
        assert(typeof config.allUsersUrl === 'string');
    });
    it('londonUsersUrl is defined', function() {
        assert(typeof config.londonUsersUrl === 'string');
    });
});

describe('Test lib/util defined', function() {
    const util = require('../lib/util');
    it('util.getData  is defined', function() {
        assert(typeof util.getData=='function');
    });
    it('util.getDistanceBetweenLonLat  is defined', function() {
        assert(typeof util.getDistanceBetweenLonLat=='function');
    });
});


describe('Test locate.js', function() {
    const locate = require('../api/routes/locate');

    it('check locate.filterByDistance  is defined', function() {
        assert(typeof locate.filterByDistance==='function');
    });
    it('check locate.handleResponse  is defined', function() {
        assert(typeof locate.handleResponse==='function');
    });
});

