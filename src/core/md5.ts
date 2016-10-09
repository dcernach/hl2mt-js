import * as crypto from "crypto";
import * as fs from "fs";

export function hashFile(file: string | Buffer, cb: (err: Error, data: string | Buffer) => void) {
    const hash = crypto.createHash('md5');
    hash.setEncoding('hex');

    let fd = fs.createReadStream(file)
    fd.pipe(hash);

    fd.on('end', () => {
        hash.end();
        if (cb) return cb(null, hash.read())
    });

    fd.on('error', (err: Error) => {
        if (cb) return cb(err, null);
    });
    return;
}

export function hashString(str: string | Buffer, cb: (err: Error, hash: string | Buffer) => void) {
    const hash = crypto.createHash('md5');

    hash.setEncoding('hex');
    hash.write(str);
    hash.end();

    if(cb) return cb(null, hash.read());
    return;
}
