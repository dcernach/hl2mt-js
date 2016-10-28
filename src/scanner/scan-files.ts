import * as fs from 'fs';
import * as Promise from 'bluebird';
import * as path from 'path';
import { ScanFileOptions } from './types/scan-options'


export class ScanFiles {

    public constructor() {
    }


    public scan(dir: string, opts?: ScanFileOptions) {
        let promise = new Promise<string[]>((resolve, reject) => {
            ScanFiles.dive(dir, opts, (err, list) => {
                if (err) return reject(err);
                return resolve(list)
            })
        })

        return promise;
    }


    public static dive(dir: string, opts: ScanFileOptions, cb: (err: Error, list: string[]) => void) {
        let list: string[] = [];
        let deep = 1;

        opts = opts || {};

        (<any>Object).assign(opts, { recursive: true });

        walk(dir);

        function walk(walkDir: string) {
            fs.readdir(walkDir, (err, files) => {
                if (err) return cb(err, null);

                for (let i = 0; i < files.length; i++) {
                    let currPath = path.join(walkDir, files[i]);
                    let fileStat = fs.statSync(currPath)

                    if (fileStat && fileStat.isFile()) {
                        ScanFiles.filterFile(currPath, opts, () => {
                            list.push(currPath);
                        })
                    }

                    if (fileStat && fileStat.isDirectory() && opts.recursive) {
                        ScanFiles.filterDir(currPath, opts, () => {
                            deep = deep + 1;
                            walk(currPath);
                        })
                    }
                }

                deep = deep - 1;

                if (deep == 0) {
                    return cb(null, list);
                }
            })
        }
    }


    private static filterFile(file: string, opts: ScanFileOptions, delegate: Function) {
        let valid = true;

        if (opts.exclude) {
            valid = !opts.exclude.test(file);
        }

        if (valid && opts.pattern) {
            valid = opts.pattern.test(file);
        }

        if (valid)
            return delegate();
    }


    private static filterDir(dir: string, opts: ScanFileOptions, delegate: Function) {
        let valid = true;

        if (opts.excludeDir) {
            valid = !opts.excludeDir.test(dir);
        }

        if (valid && opts.patternDir) {
            valid = opts.patternDir.test(dir);
        }

        if (valid)
            return delegate();
    }
}
