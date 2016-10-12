import * as xmldoc from 'xmldoc';
import * as fs from 'fs';

export function parse(file: string, cb: (err, data) => void) {
    fs.readFile(file, 'utf8', (err, data) => {
        var doc = new xmldoc.XmlDocument(data);
        if (err) cb(err, null);
        cb(null, doc);
    });
}
