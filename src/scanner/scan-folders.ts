import * as fs from 'fs';
import * as Promise from 'bluebird';
import * as path from 'path';


export class ScanFolders {
    public constructor() {
    }

    public scan(dir: string) {
        let promise = new Promise<string[]>((resolve, reject) => {
            ScanFolders.dive(dir, (err, list) => {
                if (err) return reject(err);
                return resolve(list)
            })
        })

        return promise;
    }

    public static dive(dir: string, cb: (err: Error, list: string[]) => void) {
        let list: string[] = [];
        let deep = 1;

        walk(dir);

        function walk(walkDir: string) {

            fs.readdir(walkDir, (err, files) => {
                if (err) return cb(err, null);

                for (let i = 0; i < files.length; i++) {
                    let filePath = path.join(walkDir, files[i]);
                    let stat = fs.statSync(filePath)

                    if (stat && stat.isFile()) {
                        list.push(filePath);
                    }

                    if (stat && stat.isDirectory()) {
                        deep = deep + 1;
                        walk(filePath);
                    }
                }

                deep = deep - 1;

                if (deep == 0) {
                    return cb(null, list);
                }
            })
        }
    }
}


