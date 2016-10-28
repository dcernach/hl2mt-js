export interface ScanFileOptions {
    /** whether to recurse subdirectories when reading files (defaults to true) */
    recursive?  : boolean

    /** a regex pattern to specify filenames to operate on   */
    pattern?    : RegExp,

    /** a regex pattern to specify filenames to ignore       */
    exclude?    : RegExp

    /** a regex pattern to specify directories to operate on */
    patternDir? : RegExp,

    /** a regex pattern to specify directories to ignore     */
    excludeDir? : RegExp
}
