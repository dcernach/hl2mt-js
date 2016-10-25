import * as fs from 'fs';
import * as et from 'elementtree';

export function parse(file: string, cb: (err: Error, data: et.ElementTree) => void) {
    fs.readFile(file, 'utf8', (err, data) => {
        let tree = et.parse(data);
        if (err) cb(err, null);
        cb(null, tree);
    });
}
