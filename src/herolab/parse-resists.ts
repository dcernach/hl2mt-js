import { Element } from 'elementtree';
import * as hl from './types';

export class ParseResists {
    public resists: hl.ResistanceType[] = [];

    public constructor(protected xml: Element) {
    }

    public parse() {
        this.xml.find('damagereduction').iter('special', (item) => {
            this.resists.push({
                name: item.get('name'),
                description: item.find('description').text
            })
        })

        this.xml.find('immunities').iter('special', (item) => {
            this.resists.push({
                name: item.get('name'),
                description: item.find('description').text
            })
        })

        this.xml.find('resistances').iter('special', (item) => {
            this.resists.push({
                name: item.get('name'),
                description: item.find('description').text
            })
        })

        this.xml.find('weaknesses').iter('special', (item) => {
            this.resists.push({
                name: item.get('name'),
                description: item.find('description').text
            })
        })
    }
}


