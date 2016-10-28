import { ScanFiles } from './scan-files';
import * as Promise from 'bluebird';

export class ScanPortfolios {
    public files: string[]
    private scanner: ScanFiles;

    public constructor() {
        this.scanner = new ScanFiles();
    }

    public scan(path: string) {
        let promise = this.scanner.scan(path, { pattern: /.por$/i }).then(files => {
            this.files = files;
            return files;
        })
        return promise;
    }
}

