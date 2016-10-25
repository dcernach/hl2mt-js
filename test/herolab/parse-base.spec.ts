import * as util from "util";
import { expect } from 'chai';
import { __testdir } from '../__config';
import { ElementTree, Element } from 'elementtree';
import * as hl from '../../src/herolab';

describe.only('Herolab XML export parsing (BASE STATS)', function () {
    let _valeros_: Element;
    let _bythos_: Element;


    before('Loading "iconic_lv12_valeros.xml" file', function (done) {
        let file = `${__testdir}/data/iconic_lv12_valeros.xml`;

        hl.parse(file, function (err, tree) {
            if (err) return done(err);
            let root = tree.getroot();
            _valeros_ = root.find('public/character'); // First one only
            return done();
        })
    })


    before('Loading "bestiary_bythos_aeon.xml" file', function (done) {
        let file = `${__testdir}/data/bestiary_bythos_aeon.xml`;

        hl.parse(file, function (err, tree) {
            if (err) return done(err);
            let root = tree.getroot();
            _bythos_ = root.find('public/character'); // First one only
            return done();
        })
    })


    it('Should parse "Bythos Aeon" HIT POINTS Information', function (done) {
        let parser = new hl.ParseBase(_bythos_);
        parser.parse();

        expect(parser.hitPoints).to.contains({ total: 207, hitDice: '18d10+108', currentHp: 207 });
        expect(parser.hitPoints.toString()).to.be.equal('hp 207 (18d10+108); Fast Healing 10 (Ex)');
        done();

        // console.log(JSON.stringify(parser.hitPoints));
        // console.log(JSON.stringify(parser.hitPoints.toString()));
    })


    it('Should parse "Bythos Aeon" ATTACKS Information', function (done) {
        let parser = new hl.ParseBase(_bythos_);
        parser.parse();

        expect(parser.attacks).to.contains({
            base: '+18', bonuses: '+17/+12/+7/+2', melee: '+23/+18/+13/+8', 
            ranged: '+21/+16/+11/+6', cmb: '+25', cmd: '44', cmdFlat: '39'
        });
        expect(parser.attacks.toString()).be.equal('Base Atk: +18; CMD +25; CMD 44; CMD Flat 39');
        done();

        // console.log(JSON.stringify(parser.attacks));
        // console.log('Literal ->', parser.attacks.toString());
    })


    it('Should parse "Valeros" CHARACTER Information', function (done) {
        let parser = new hl.ParseBase(_valeros_);
        parser.parse();

        expect(parser.character).to.contain({
            name: 'Valeros', align: 'Neutral Good', level: "Ftr 12", size: 'Medium', cr: 'CR 12',
            xp: '19.200 XP', type: 'humanoid (human)'
        })
        done();

        // console.log(JSON.stringify(parser.head));
    })


    it('Should parse "Valeros" PERCEPTION Information', function () {
        let parser = new hl.ParseBase(_valeros_);
        parser.parse();
        expect(parser.perception.value).to.be.equal(0);
    })


    it('Should parse "Valeros" INITIATIVE Information', function () {
        let parser = new hl.ParseBase(_valeros_);
        parser.parse();
        expect(parser.initiative).to.be.equal(8);
    })


    it('Should parse "Valeros" ARMOR CLASS Information', function (done) {
        let parser = new hl.ParseBase(_valeros_);
        parser.parse();

        expect(parser.armorClass).to.contains({ total: 29, touch: 17, flat: 24 })
        expect(parser.armorClass.toString()).to.be.equal(
            'AC 29, touch 17, flat-footed 24 (armor +9, shield +1, natural +2, deflect +2, dodge +1)'
        )
        done();

        // console.log(JSON.stringify(parser.armorClass));
        // console.log('Description ->', parser.armorClass.toString());
    })


    it('Should parse "Valeros" HIT POINTS Information', function (done) {
        let parser = new hl.ParseBase(_valeros_);
        parser.parse();

        expect(parser.hitPoints).to.contains({ total: 130, hitDice: '12d10+60', currentHp: 130 });
        expect(parser.hitPoints.toString()).to.be.equal('hp 130 (12d10+60)');
        done();

        // console.log(JSON.stringify(parser.hitPoints));
        // console.log(JSON.stringify(parser.hitPoints.toString()));
    })


    it('Should parse "Valeros" MOVEMENT Information', function (done) {
        let parser = new hl.ParseBase(_valeros_);
        parser.parse();

        expect(parser.movement).to.contains({ value: 30 });
        expect(parser.movement.toString()).to.be.equal('30 ft.');
        done();

        // console.log(JSON.stringify(parser.movement));
        // console.log('Literal ->', parser.movement.toString());
    })


    it('Should parse "Valeros" ATTACKS Information', function (done) {
        let parser = new hl.ParseBase(_valeros_);
        parser.parse();

        expect(parser.attacks).to.contains({
            base: '+12', bonuses: '+12/+7/+2', melee: '+17/+12/+7', ranged: '+16/+11/+6',
            cmb: '+17', cmd: '34', cmdFlat: '29'
        });
        expect(parser.attacks.toString()).be.equal('Base Atk: +12; CMD +17; CMD 34; CMD Flat 29');
        done();

        // console.log(JSON.stringify(parser.attacks));
        // console.log('Literal ->', parser.attacks.toString());
    })


    it('Should parse "Valeros" MONEY Information', function (done) {
        let parser = new hl.ParseBase(_valeros_);
        parser.parse();

        expect(parser.money).to.contains({ gp: 288 });
        expect(parser.money.toString()).to.be.equal('288 gp');
        done();

        // console.log(JSON.stringify(parser.money));
        // console.log('Literal ->', parser.money.toString());
    })
})