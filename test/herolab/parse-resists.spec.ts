import * as util from "util";
import { expect } from 'chai';
import { __testdir } from '../__config';
import { ElementTree, Element } from 'elementtree';
import * as hl from '../../src/herolab';

describe('Herolab XML export parsing (RESISTS)', function () {
    let _bythos_: Element;

    before('Loading "bestiary_bythos_aeon.xml" file', function (done) {
        let file = `${__testdir}/data/bestiary_bythos_aeon.xml`;

        hl.parse(file, function (err, tree) {
            if (err) return done(err);
            let root = tree.getroot();
            _bythos_ = root.find('public/character'); // First one only
            return done();
        })
    })


    it('Should parse "Bythos Aeon" RESISTANCES', function (done) {
        let parser = new hl.ParseResists(_bythos_);
        parser.parse();

        expect(parser.all).to.have.lengthOf(6);
        expect(parser.immunities.toString()).to.be.equal('cold, critical hits, poison')
        expect(parser.resistances.toString()).to.be.equal('electricity 10, fire 10, spells 27')

        done();

        // console.log(JSON.stringify(parser.immunities));
        // console.log(JSON.stringify(parser.resistances));
    })
})