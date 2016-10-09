import * as assert from "assert";
import * as md5 from "../src/core/md5";

let x = 1 + 2;

xdescribe('Array', function () {

    xdescribe('#indexOf()', function () {

        xit('should return -1 when the value is not present', function () {
            assert.equal(-1, [1, 2, 3].indexOf(4));
        });

    });

});