import * as et from "elementtree";

export interface IndexerType {
    name    : string;
    summary : string;
    stats   : { text: string, html: string, xml: et.Element };
}
