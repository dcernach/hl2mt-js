import * as xmldoc from 'xmldoc';
import { acType, hpType, saveType, savingsType, weaknessType } from './types';

export class ParseDefense {
    public ac: acType;
    public hp: hpType;
    public savings: savingsType;
    public weakness: weaknessType[] = [];


    constructor(private doc: xmldoc.XmlDocument) {
        this.parse();
    }

    private parse() {
        this.parseAC();
        this.parseHP();
        this.parseSaves();
        this.parseWeakness()
        delete this.doc;
    }


    private parseAC() {
        let node = this.get('armorclass');
        this.ac = {
            total: parseInt(node.attr['ac']),
            touch: parseInt(node.attr['touch']),
            flatfooted: parseInt(node.attr['flatfooted']),
            from: {
                armor: parseInt(node.attr['fromarmor'] || '0'),
                shield: parseInt(node.attr['fromshield'] || '0'),
                dex: parseInt(node.attr['fromdexterity'] || '0'),
                wis: parseInt(node.attr['fromwisdom'] || '0'),
                cha: parseInt(node.attr['fromcharisma'] || '0'),
                size: parseInt(node.attr['fromsize'] || '0'),
                natural: parseInt(node.attr['fromnatural'] || '0'),
                deflect: parseInt(node.attr['fromdeflect'] || '0'),
                dodge: parseInt(node.attr['fromdodge'] || '0'),
                misc: parseInt(node.attr['frommisc'] || '0')
            }
        }
    }


    private parseHP() {
        let node = this.get('health');
        this.hp = {
            hitdice: node.attr['hitdice'],
            hitpoints: parseInt(node.attr['hitpoints']),
            current: parseInt(node.attr['currenthp']),
            damage: {
                lethal: parseInt(node.attr['damage']),
                nonlethal: parseInt(node.attr['nonlethal']),
            }
        }
    }


    public parseSaves() {
        let node = this.get('saves');
        this.savings = <any>{};

        node.eachChild(el => {
            let save: saveType = {
                abbr: el.attr['abbr'] || 'Other',
                name: el.attr['name'] || '',
                save: parseInt(el.attr['save'] || '0'),
                base: parseInt(el.attr['base'] || '0'),
                from: {
                    attr: parseInt(el.attr['fromattr'] || '0'),
                    resist: parseInt(el.attr['fromresist'] || '0'),
                    misc: parseInt(el.attr['frommisc'] || '0')
                },
                situational: {
                    text: el.firstChild.attr['text'],
                    modifiers: []
                }
            }

            el.firstChild.eachChild(el => {
                let item = {
                    text: el.attr['text'] || "",
                    source: el.attr['source'] || ""
                }
                save.situational.modifiers.push(item);
            })

            if (save.abbr.toLowerCase() == 'fort') {
                this.savings.fort = save;
            }
            else if (save.abbr.toLowerCase() == 'ref') {
                this.savings.ref = save;
            }
            else if (save.abbr.toLowerCase() == 'will') {
                this.savings.will = save;
            }
            else if (el.name === 'allsaves') {
                this.savings.all = save;
            }
        })
    }


    public parseWeakness() {
        let node = this.get('weaknesses');
        node.eachChild(el => {
            let w = {
                name: el.attr['name'],
                type: el.attr['type'],
                desc: el.firstChild.val
            }
            this.weakness.push(w);
        })
    }


    private get(path: string) {
        return this.doc.descendantWithPath(`public.character.${path}`);
    }
}