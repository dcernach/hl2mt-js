import { expect } from 'chai';
import { __testdir } from '../__config';

import * as util from "util";
import * as scan from '../../src/scanner';
import * as Promise from 'bluebird';


describe('Scanner: Testing file scanner', function () {
    let _path_: string;


    before('Preparing test data', function (done) {
        _path_ = `${__testdir}/data/portfolios`;
        done();
    })


    it('Should scan "portfolio" directory correctly', function () {
        var scaner = new scan.ScanFiles();
        let result = scaner.scan(_path_);

        return result.then(files => {
            expect(files).to.has.lengthOf(62)
        })
    })


    it('Should scan all ".por" files correctly', function () {
        var scaner = new scan.ScanFiles();
        let result = scaner.scan(_path_, { pattern: /\.por$/ });

        return result.then(files => {
            expect(files).to.has.lengthOf(20)
        })
    })


    it('Should scan kelmarane_city ".por" files correctly', function () {
        var scaner = new scan.ScanFiles();
        let result = scaner.scan(_path_, { pattern: /\.por$/i, excludeDir: /old_monastery/i });

        return result.then(files => {
            expect(files).to.has.lengthOf(9)
        })
    })


    it('Should scan kelmarane_city ".por" files, excluding "Undrella.por" and "Schir.por"', function () {
        var scaner = new scan.ScanFiles();
        let result = scaner.scan(_path_, {
            pattern: /\.por$/i,
            exclude: /undrella\.por$|schir\.por$/i,
            excludeDir: /old_monastery/i
        });

        return result.then(files => {
            expect(files).to.has.lengthOf(7)
        })
    })
})