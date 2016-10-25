import { Element } from 'elementtree';
import * as hl from './types';

export class ParseFeats {
    public feats: hl.FeatType[] = [];

    public constructor(protected xml: Element) {
    }

    public parse() {
        this.xml.find('feats').iter('feat', (item) => {
            this.feats.push({
                name: item.get('name'),
                description: item.find('description').text
            })
        })
    }
}
