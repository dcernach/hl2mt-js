import * as util from "util";
import { expect } from 'chai';
import { __testdir } from '../__config';

import * as scan from '../../src/scanner';
import * as Promise from 'bluebird';


describe.only('Testing Folder Scanner', function () {
    let _path_: string;


    before('Preparing test data', function (done) {
        _path_ = `${__testdir}/data/portfolios`;
        done();
    })



    it.only('Should scan "portfolio" directory correctly', function () {
        // ->   /\.por$/i.test(filePath)
        var folder = new scan.ScanFolders();
        let result = folder.scan(_path_);

        return result.then(files => {
            expect(files).to.has.lengthOf(62)
        })
    })
})