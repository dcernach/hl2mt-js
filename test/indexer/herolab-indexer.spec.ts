import { expect } from 'chai';
import { __testdir } from '../__config';
import { HerolabIndexer } from '../../src/indexer/herolab-indexer';

import * as util from "util";
import * as scan from '../../src/scanner';


describe.only('HeroLab Indexer: Testing file scanner', function () {
    let _path_: string;

    before('Preparing test data', function (done) {
        _path_ = `${__testdir}/data/portfolios/old_monastery`;
        done();
    })

    it('Should print ".por entries" correctly', function () {
        let indexer = new HerolabIndexer(_path_);

        return indexer.index().then(zipEntries => {
            console.log(zipEntries[0].getData().toString('utf8'));
        });
    })
})