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
        let parser = new hl.ParseFeats(char);
        parser.parse();
        expect(parser.feats).to.have.lengthOf(10);
        expect(parser.feats[0].name).to.be.equal('Cleave');
        expect(parser.feats[1].name).to.be.equal('Greater Vital Strike');

    })


    it('Should parse the "red_dragon_adult.xml" RESISTANCES', function () {
        let parser = new hl.ParseResists(char);
        parser.parse();
        expect(parser.resists).to.have.lengthOf(5);
        expect(parser.resists[0].name).to.be.equal('Damage Reduction (5/magic)');
        expect(parser.resists[1].name).to.be.equal('Immunity to Fire');
    })


    it('Should parse the "red_dragon_adult.xml" LANGUAGES', function () {
        let parser = new hl.ParseLanguages(char);
        parser.parse();
        expect(parser.languages).to.have.lengthOf(4);
        expect(parser.languages[0].name).to.be.equal('Common');
        expect(parser.languages[1].name).to.be.equal('Draconic');
    })


    it('Should parse the "red_dragon_adult.xml" SKILLS', function () {
        let parser = new hl.ParseSkills(char);
        parser.parse();
        expect(parser.skills).to.have.lengthOf(23);

        expect(parser.skills[0]).to.include({
            name: 'Acrobatics',
            situational: 'Speed greater/less than 30 ft.: +4 to jump'
        })

        expect(parser.skills[8]).to.include({
            name: 'Fly',
            ranks: 17
        })
    })


    it('Should parse the "red_dragon_adult.xml" TRAITS', function () {
        let parser = new hl.ParseTraits(char);
        parser.parse();
        expect(parser.traits).to.have.lengthOf(2);
        expect(parser.traits[0]).to.include({
            name: 'Deathtouched (+2 vs. mind-affecting effects)',
            category: 'Bloodline'
        })
    })


    it('Should parse the "red_dragon_adult.xml" ATTRIBUTES', function () {
        let parser = new hl.ParseAttributes(char);
        parser.parse();
        
        expect(parser.attributes).to.have.lengthOf(6);
        expect(parser.attributeMap).to.have.keys('str', 'dex', 'con', 'int', 'wis', 'cha');

        expect(parser.attributes).to.deep.include.members([
            { abbr: 'Str', name: 'Strength',     score: 31, bonus: 10, situational: '' },
            { abbr: 'Dex', name: 'Dexterity',    score: 10, bonus:  0, situational: '' },
            { abbr: 'Con', name: 'Constitution', score: 23, bonus:  6, situational: '' },
            { abbr: 'Int', name: 'Intelligence', score: 16, bonus:  3, situational: '' },
            { abbr: 'Wis', name: 'Wisdom',       score: 17, bonus:  3, situational: '' },
            { abbr: 'Cha', name: 'Charisma',     score: 16, bonus:  3, situational: '' }
        ]);
    })
})
//console.log(util.inspect(parse.feats, false, null));