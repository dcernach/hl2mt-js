import * as util from "util";
import { expect } from 'chai';
import { __testdir } from '../__config';
import { ElementTree, Element } from 'elementtree';
import * as hl from '../../src/herolab';

describe('Herolab XML export parsing (WEAPONS)', function () {
    let valeros : Element;
    let ezren   : Element;


    before('Loading "iconic_lv12_valeros.xml" file', function (done) {
        let file = `${__testdir}/data/iconic_lv12_valeros.xml`;

        hl.parse(file, function (err, _tree_) {
            if (err) return done(err);
            let root = _tree_.getroot();
            valeros = root.find('public/character'); // First one only
            return done();
        })
    })


    before('Loading "iconic_lv12_ezren.xml" file', function (done) {
        let file = `${__testdir}/data/iconic_lv12_ezren.xml`;

        hl.parse(file, function (err, _tree_) {
            if (err) return done(err);
            let root = _tree_.getroot();
            ezren = root.find('public/character'); // First one only
            return done();
        })
    })


    it('Should parse VALEROS Melee Weapons', function (done) {
        // TODO: Too lazy to write a proper test case here
        let parser = new hl.ParseWeapons(valeros);
        parser.parse();
        done()
        // console.log(JSON.stringify(parser.meleeWeapons));
    })


    it('Should parse VALEROS Ranged Weapons', function (done) {
        // TODO: Too lazy to write a proper test case here
        let parser = new hl.ParseWeapons(valeros);
        parser.parse();
        done();
        // console.log(JSON.stringify(parser.rangedWeapons));
    })


    it('Should parse EZREN Melee Weapons', function (done) {
        // TODO: Too lazy to write a proper test case here
        let parser = new hl.ParseWeapons(ezren);
        parser.parse();
        done();
        // console.log(JSON.stringify(parser.meleeWeapons));
    })


    it('Should parse EZREN Ranged Weapons', function (done) {
        // TODO: Too lazy to write a proper test case here
        let parser = new hl.ParseWeapons(ezren);
        parser.parse();
        done();
        // console.log(JSON.stringify(parser.rangedWeapons));
    })
})
