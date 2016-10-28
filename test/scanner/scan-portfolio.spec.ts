import { expect } from 'chai';
import { __testdir } from '../__config';
import { ScanPortfolios } from '../../src/scanner/scan-portfolios';

describe('Scanner: Testing portfolio scanner', function () {
    let _path_: string;

    before('Preparing test data', function (done) {
        _path_ = `${__testdir}/data/portfolios`;
        done();
    })


    it('Should scan "portfolio" directory correctly', function () {
        var scaner = new ScanPortfolios();
        let result = scaner.scan(_path_);

        return result.then(files => {
            expect(files).to.has.lengthOf(20)
            console.log(scaner.files)
        })
    })
});