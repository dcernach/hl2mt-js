import * as util from "util";
import { expect } from 'chai';
import { __testdir } from '../__config';
import { ElementTree, Element } from 'elementtree';
import * as hl from '../../src/herolab';

describe('Herolab XML export parsing', function () {
    let char: Element;

    before('Loading "red_dragon_adult.xml" file', function (done) {
        let file = `${__testdir}/data/red_dragon_adult.xml`;

        hl.parse(file, function (err, _tree_) {
            if (err) return done(err);
            let root = _tree_.getroot();
            char = root.find('public/character'); // First one only
            return done();
        })
    })


    it('Should parse the "red_dragon_adult.xml" FEATS', function () {
        let parser = new hl.ParseFeat(char);
        parser.parse();
        expect(parser.feats).to.have.lengthOf(10);
        expect(parser.feats[0].name).to.be.equal('Cleave');
        expect(parser.feats[1].name).to.be.equal('Greater Vital Strike');

    })

    it('Should parse the "red_dragon_adult.xml" RESISTANCES', function () {
        let parser = new hl.ParseResist(char);
        parser.parse();
        expect(parser.resists).to.have.lengthOf(5);
        expect(parser.resists[0].name).to.be.equal('Damage Reduction (5/magic)');
        expect(parser.resists[1].name).to.be.equal('Immunity to Fire');
    })

    it('Should parse the "red_dragon_adult.xml" LANGUAGES', function () {
        let parser = new hl.ParseLanguage(char);
        parser.parse();
        expect(parser.languages).to.have.lengthOf(4);
        expect(parser.languages[0].name).to.be.equal('Common');
        expect(parser.languages[1].name).to.be.equal('Draconic');
    })
})
//console.log(util.inspect(parse.feats, false, null));