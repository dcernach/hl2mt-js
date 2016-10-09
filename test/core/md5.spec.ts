import { expect } from "chai";
import {__testdir} from "../__config";
import * as md5 from "../../src/core/md5";

describe('MD5 hash', function () {
    it('Should calculate MD5 File (gnoll.png) Hash correctly', function (done) {
        let expected = 'd7652a171a9fa0f05e44b8eb1c06bdec';
        let file = `${__testdir}/data/gnoll.png`

        md5.hashFile(file, function (err, hash) {
            if (err) done(err);

            expect(hash).to.be.equal(expected);
            done();
        })
    });

    it('Should calculate MD5 String Hash correctly', function (done) {
        let expected = '9e107d9d372bb6826bd81d3542a419d6';
        let str = `The quick brown fox jumps over the lazy dog`;
        md5.hashString(str, function (err, hash) {
            if (err) done(err);
            
            expect(hash).to.be.equal(expected);
            done();
        })
    });
});