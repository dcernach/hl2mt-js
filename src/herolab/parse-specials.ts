import { Element } from 'elementtree';
import * as hl from './types';


export class ParseSpecials {
    public all       : hl.SpecialType[] = [];
    public attacks   : hl.SpecialType[];
    public auras     : hl.SpecialType[];
    public defenses  : hl.SpecialType[];
    public health    : hl.SpecialType[];
    public movements : hl.SpecialType[];
    public other     : hl.SpecialType[];
    public skills    : hl.SpecialType[];
    public spellLike : hl.SpecialType[];
   

    public constructor(protected xml: Element) {
    }


    public parse() {
        this.parseAttacks();
        this.parseAuras();
        this.parseDefenses();
        this.parseHealth();
        this.parseMovement();
        this.parseOther();
        this.parseSkills();
        this.parseSpellLike();

        this.all = [].concat(this.attacks, this.auras,     this.defenses, 
                             this.health,  this.movements, this.other, 
                             this.skills,  this.spellLike)
                     .filter(n => n !== undefined);
    }


    private parseAttacks() {
        this.xml.find('attack').iter('special', el => {
            this.attacks = this.attacks || [];
            let item = { type: 'Attack', name: el.get('name'), description: el.find('description').text };
            this.attacks.push(item);
        });
    }


    private parseAuras() {
        this.xml.find('auras').iter('special', el => {
            this.auras = this.auras || [];
            let item = { type: 'Aura', name: el.get('name'), description: el.find('description').text };
            this.auras.push(item);
        });
    }


    private parseDefenses() {
        this.xml.find('defensive').iter('special', el => {
            this.defenses = this.defenses || [];
            let item = { type: 'Defensive', name: el.get('name'), description: el.find('description').text };
            this.defenses.push(item);
        });
    }


    private parseHealth() {
        this.xml.find('health').iter('special', el => {
            this.health = this.health || [];
            let item = { type: 'Health', name: el.get('name'), description: el.find('description').text };
            this.health.push(item);
        });
    }


    private parseMovement() {
        this.xml.find('movement').iter('special', el => {
            this.movements = this.movements || [];
            let item = { type: 'Movement', name: el.get('name'), description: el.find('description').text };
            this.movements.push(item);
        });
    }


    private parseOther() {
        this.xml.find('otherspecials').iter('special', el => {
            this.other = this.other || [];
            let item = { type: 'Other', name: el.get('name'), description: el.find('description').text };
            this.other.push(item);
        });
    }


    private parseSkills() {
        this.xml.find('skillabilities').iter('special', el => {
            this.skills = this.skills || [];
            let item = { type: 'Skill', name: el.get('name'), description: el.find('description').text };
            this.skills.push(item);
        });
    }


    private parseSpellLike() {
        this.xml.find('spelllike').iter('special', el => {
            this.spellLike = this.spellLike || [];
            let item = { type: 'Spell-Like', name: el.get('name'), description: el.find('description').text };
            this.spellLike.push(item);
        });
    }
}