import { Element } from 'elementtree';
import * as hl from './types';

export class ParseLanguages {
    public languages: hl.LanguageType[] = [];

    public constructor(protected xml: Element) {
    }

    public parse() {
        let langs = this.xml.find('languages');
        langs.iter('language', (item) => {
            this.languages.push({
                name: item.get('name'),
                description: '-'
            })
        })

        langs.iter('special', (item) => {
            this.languages.push({
                name: item.get('name'),
                description: item.find('description').text
            })
        })
        
        let list = this.languages;
        this.languages.toString = function () {
            return list.map(el => el.name).join(', ');
        }
    }
}


