import * as AdmZip from 'adm-zip';
import * as Promise from 'bluebird';

import * as hl from '../herolab/parse'
import * as fs from '../scanner';

export class HerolabIndexer {
    public constructor(protected porFolder: string) {

    }

    public index(): Promise<AdmZip.IZipEntry[]> {
        let scanner = new fs.ScanPortfolios();

        let promise = scanner.scan(this.porFolder).then(files => {
            let entries: AdmZip.IZipEntry[] = [];

            files.forEach(file => {
                let zip = new AdmZip(file);
                let zipEntries = zip.getEntries();

                zipEntries.forEach(entry => {
                    if (/statblocks_xml/i.test(entry.entryName)) {
                        console.log(file, '->', entry.entryName);
                        entries.push(entry)
                    }
                })
            })

            return Promise.resolve(entries);
        });

        return promise;
    }
}






