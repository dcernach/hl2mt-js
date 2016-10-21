import { Element } from 'elementtree';
import * as hl from './types';

export class ParseLanguages {
    public languages: hl.ResistanceType[] = [];

    public constructor(protected xml: Element) {
    }

    public parse() {
        this.xml.find('languages').iter('language', (item) => {
            this.languages.push({
                name: item.get('name'),
                description: 'no description given'
            })
        })
    }
}


