import * as util from "util";
import { expect } from 'chai';
import { __testdir } from '../__config';
import { ElementTree, Element } from 'elementtree';
import * as hl from '../../src/herolab';


describe('Herolab XML export parsing (INVENTORY)', function () {
    let amiri   : Element;
    let ezren   : Element;
    let valeros : Element;


    before('Loading "iconic_lv12_amiri.xml" file', function (done) {
        let file = `${__testdir}/data/iconic_lv12_amiri.xml`;

        hl.parse(file, function (err, _tree_) {
            if (err) return done(err);
            let root = _tree_.getroot();
            amiri = root.find('public/character'); // First one only
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


    before('Loading "iconic_lv12_valeros.xml" file', function (done) {
        let file = `${__testdir}/data/iconic_lv12_valeros.xml`;

        hl.parse(file, function (err, _tree_) {
            if (err) return done(err);
            let root = _tree_.getroot();
            valeros = root.find('public/character'); // First one only
            return done();
        })
    })


    it('Should parse VALEROS Gear', function (done) {
        // TODO: Too lazy to write a proper test case here
        let parser = new hl.ParseItems(valeros);
        parser.parse();
        done()
        // console.log(JSON.stringify(parser.gearItems))
    })


    it('Should parse AMIRI Magic Items', function (done) {
        // TODO: Too lazy to write a proper test case here
        let parser = new hl.ParseItems(amiri);
        parser.parse();
        done()
        // console.log(JSON.stringify(parser.magicItems))
    })


    it('Should parse EZREN Items', function (done) {
        // TODO: Too lazy to write a proper test case here
        let parser = new hl.ParseItems(ezren);
        parser.parse();
        done()
        // console.log(JSON.stringify(parser.all))
    })
})