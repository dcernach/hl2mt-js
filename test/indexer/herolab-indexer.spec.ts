import { expect } from 'chai';
import { __testdir } from '../__config';
import { HerolabIndexer } from '../../src/indexer/herolab-indexer';

import * as util from "util";
import * as scan from '../../src/scanner';


describe.only('HeroLab Indexer: Testing file scanner', function () {
    let _scandir_: string;
    let _porfile_: string;


    before('Preparing test data', function (done) {
        _scandir_ = `${__testdir}/data/portfolios/old_monastery`;
        _porfile_ = `${__testdir}/data/iconics/Seoni-and-Ezren.por`;
        done();
    })


    it.only('Should index "Seoni-and-Ezren.por" file correctly', function () {
        let indexer = new HerolabIndexer(_porfile_);
        let indexed = indexer.run();

        expect(indexed).to.have.lengthOf(3);
    })
})