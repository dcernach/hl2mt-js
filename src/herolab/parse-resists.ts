import { Element } from 'elementtree';
import * as hl from './types';

export class ParseResists {
    public all: hl.ResistanceType[] = [];

    public damageReductions: hl.ResistanceType[] = [];
    public immunities: hl.ResistanceType[] = [];
    public resistances: hl.ResistanceType[] = [];
    public weaknesses: hl.ResistanceType[] = [];


    public constructor(protected xml: Element) {
    }


    public parse() {
        this.parseDamageReduction()
        this.parseImunities();
        this.parseResistances();
        this.parseWeaknesses();

        this.all = [].concat(this.damageReductions, this.immunities,
            this.resistances, this.weaknesses)
            .filter(n => n !== undefined);
    }


    public parseDamageReduction() {
        this.xml.find('damagereduction').iter('special', (special) => {
            let item = {
                name: special.get('name'),
                shortName: special.get('shortname'),
                description: special.find('description').text
            };
            this.damageReductions.push(item)
        })

        var list = this.damageReductions;
        this.damageReductions.toString = function () {
            return list.map(item => item.shortName).join(', ');
        }
    }


    public parseImunities() {
        this.xml.find('immunities').iter('special', (special) => {
            let item = {
                name: special.get('name'),
                shortName: special.get('shortname'),
                description: special.find('description').text
            };
            this.immunities.push(item)
        })

        let list = this.immunities;
        this.immunities.toString = function () {
            return list.map(item => item.shortName).join(', ');
        }
    }


    public parseResistances() {
        this.xml.find('resistances').iter('special', (special) => {
            let item = {
                name: special.get('name'),
                shortName: special.get('shortname'),
                description: special.find('description').text
            };

            this.resistances.push(item)
        })

        let list = this.resistances;
        this.resistances.toString = function () {
            return list.map(item => item.shortName).join(', ');
        }
    }


    public parseWeaknesses() {
        this.xml.find('weaknesses').iter('special', (special) => {
            let item = {
                name: special.get('name'),
                shortName: special.get('shortname'),
                description: special.find('description').text
            };

            this.weaknesses.push(item)
        })
        
        let list = this.weaknesses;
        this.weaknesses.toString = function () {
            return list.map(item => item.shortName).join(', ');
        }
    }
}


