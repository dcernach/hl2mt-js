import * as util from "util";
import { expect } from 'chai';
import { __testdir } from '../__config';
import { ElementTree, Element } from 'elementtree';
import * as hl from '../../src/herolab';

describe('Herolab XML export parsing (SPELLBOOK, SPELLS MEMORIZED and SPELLS KNOWN)', function () {
    let ezren: Element;
    let seoni: Element;

    before('Loading "iconic_lv12_ezren.xml" file', function (done) {
        let file = `${__testdir}/data/iconic_lv12_ezren.xml`;

        hl.parse(file, function (err, _tree_) {
            if (err) return done(err);
            let root = _tree_.getroot();
            ezren = root.find('public/character'); // First one only
            return done();
        })
    })


    before('Loading "iconic_lv12_seoni.xml" file', function (done) {
        let file = `${__testdir}/data/iconic_lv12_seoni.xml`;

        hl.parse(file, function (err, _tree_) {
            if (err) return done(err);
            let root = _tree_.getroot();
            seoni = root.find('public/character'); // First one only
            return done();
        })
    })


    describe('Parsing the "iconic_lv12_ezren.xml" Spells', function () {
        it('Should parse EZREN Spells Written', function () {
            let parser = new hl.ParseSpells(ezren);
            parser.parse();
            // TODO: Too lazy to write a proper test case here
        });


        it('Should parse EZREN Spells Memorized', function () {
            let parser = new hl.ParseSpells(ezren);
            parser.parse();
            // TODO: Too lazy to write a proper test case here
        });
    });


    describe('Parsing the "iconic_lv12_seoni.xml" Spells', function () {
        it('Should parse SEONI Spells Known', function () {
            let parser = new hl.ParseSpells(seoni);
            parser.parse();
            // TODO: Too lazy to write a proper test case here
        });
    });
})