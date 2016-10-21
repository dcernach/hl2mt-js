import { Element } from 'elementtree';
import * as hl from './types';


export class ParseAttributes {
    public attributes: hl.AttributeType[] = [];
    public attributeMap: { [key: string]: hl.AttributeType } = {};

    public constructor(protected xml: Element) {
    }

    public parse() {
        this.xml.find('attributes').iter('attribute', attr => {
            let item: hl.AttributeType = {
                abbr: attr.get('name').substr(0, 3),
                name: attr.get('name'),
                score: parseInt(attr.find('attrvalue').get('modified') || '0'),
                bonus: parseInt(attr.find('attrbonus').get('modified') || '0'),
                situational: attr.find('situationalmodifiers').get('text')
                // Should I check for Situational Modifiers
            }
            this.attributes.push(item)
        })

        this.attributes.map(v => {
            return this.attributeMap[v.abbr.toLowerCase()] = v;
        });
    }
}