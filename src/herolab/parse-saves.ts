import { Element } from 'elementtree';
import * as hl from './types';


export class ParseSaves {
    public saves: hl.SaveType[] = []
    public saveMap: { [key: string]: hl.SaveType } = {};

    public constructor(protected xml: Element) {
    }

    public parse() {
        this.xml.find('saves').iter('save', attr => {
            let item: hl.SaveType = {
                abbr        : attr.get('abbr'),
                name        : attr.get('name'),
                save        : parseInt( attr.get('save') || '0'),
                base        : parseInt( attr.get('base') || '0'),
                fromAttr    : parseInt( attr.get('fromattr') || '0'),
                fromResist  : parseInt( attr.get('fromresist') || '0'),
                fromMisc    : parseInt( attr.get('frommisc') || '0'),
                situational : attr.find('situationalmodifiers').get('text')
            }
            this.saves.push(item);
        })

        this.xml.find('saves').iter('allsaves', attr => {
            let item: hl.SaveType = {
                abbr        : 'Other',
                name        : 'Other',
                save        : null,
                base        : null,
                fromAttr    : null,
                fromResist  : null,
                fromMisc    : null,
                situational : attr.find('situationalmodifiers').get('text')
            }
            this.saves.push(item);
        })

        this.saves.map(map => {
             return this.saveMap[map.abbr.toLowerCase()] = map;
        });
    }
}
