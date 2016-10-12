import * as util from "util";
import { expect } from 'chai';
import { __testdir } from '../__config';

import * as parser from '../../src/herolab/parse';
import { ParseHead } from '../../src/herolab/parse-head';
import { ParseDefense } from '../../src/herolab/parse-defense';

describe('Herolab XML export parsing', function () {
    xit('Should parse the "drow_scout.xml" HEADER info', function (done) {
        let file = `${__testdir}/data/drow_scout.xml`;

        parser.parse(file, (err, doc) => {
            let parsed = new ParseHead(doc);
            done(err);
            console.log(parsed);
        })
    })

    it('Should parse the "garavel.xml" DEFENSES info', function (done) {
        let file = `${__testdir}/data/garavel.xml`;

        parser.parse(file, (err, doc) => {
            let parsed = new ParseDefense(doc);
            done(err);
            console.log(util.inspect(parsed, false, null));
        })
    })
})