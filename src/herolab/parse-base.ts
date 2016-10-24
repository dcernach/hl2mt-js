import { Element } from 'elementtree';
import * as hl from './types';


export class ParseBase {
    public character    : hl.BaseHeadType;
    public perception   : hl.BasePerceptionType;
    public initiative   : number;
    public armorClass   : hl.BaseArmorClass;
    public hitPoints    : hl.BaseHitPointsType;
    public movement     : hl.BaseMovementType[];
    public attacks      : hl.BaseAttackType; 
    public money        : hl.BaseMoneyType;


    public constructor(protected xml: Element) {
    }


    public parse() {
        this.parseHead();
        this.parsePerception();
        this.parseInitiative();
        this.parseArmorClass();
        this.parseHitPoints();
        this.parseMovement();
        this.parseAttacks();
        this.parseMoney();
    }
    

    private parseHead() {
        this.character = {
            role     : this.xml.get('role'),
            name     : this.xml.get('name'),
            align    : this.xml.find('alignment').get('name'),
            player   : this.xml.get('player'),
            level    : this.xml.find('classes').get('summaryabbr'),
            deity    : this.xml.find('deity').get('name') || '-',
            race     : this.xml.find('race').get('racetext'),
            // -- Size -->
            size     : this.xml.find('size').get('name') || 'medium',
            space    : this.xml.find('size').find('space').get('text'),
            reach    : this.xml.find('size').find('reach').get('text'),
            // <-- Size --
            cr: this.xml.find('challengerating').get('text'),
            xp: this.xml.find('xpaward').get('text').replace(/,/, '.')
        }
        
        // TODO: Should I parse all NPC Information
        let npc = this.xml.find('npc')
        if(npc) {
            this.character.description = npc.find('description').text; 
        }

        // Creature Type
        let types: string[];
        this.xml.find('types').iter('type', type => {
            types = types || [];
            types.push(type.get('name'))
        });

        // Creature SubTypes
        let subTypes: string[];
        this.xml.find('subtypes').iter('subtype', type => {
            subTypes = subTypes || [];
            subTypes.push(type.get('name'));
        });

        this.character.type = `${types.join(', ')} (${subTypes.join(', ')})`.toLowerCase();

        // Personal Information
        let personal = this.xml.find('personal');
        this.character.personal = {
            gender      : personal.get('gender')                    || '-' ,
            age         : personal.get('age')                       || '-',
            height      : personal.find('charheight').get('text')   || '-',
            weight      : personal.find('charweight').get('text')   || '-',
            hair        : personal.get('hair')                      || '-',
            eyes        : personal.get('eyes')                      || '-',
            skin        : personal.get('skin')                      || '-',
            description : personal.find('description').text,
            homeland    : '-'
        }
    }


    private parseInitiative() {
        this.initiative = parseInt(this.xml.find('initiative').get('total') || '0')
    }


    private parsePerception() {
        // Perception
        let skills = this.xml.find('skills').getchildren();
        let count = skills.length;

        for (let i = 0; i < count; i++) {
            let name = skills[i].get('name');
            if (/Perception/i.test(name)) {
                this.perception = {
                    value: parseInt(skills[i].get('value') || '0'),
                    situational: skills[i].find('situationalmodifiers').get('text')
                }
                break;
            }
        } 
    }


    private parseArmorClass() {
        let el = this.xml.find('armorclass');
        let armor: hl.BaseArmorClass = {
            total : parseInt(el.get('ac')         || '0'),
            touch : parseInt(el.get('touch')      || '0'),
            flat  : parseInt(el.get('flatfooted') || '0'),
            from: {
                armor   : el.get('fromarmor'),
                shield  : el.get('fromshield'),
                dex     : el.get('fromdex'),
                wis     : el.get('fromwis'),
                cha     : el.get('fromcha'),
                size    : el.get('fromsize'),
                natural : el.get('fromnatural'),
                deflect : el.get('fromdeflect'),
                dodge   : el.get('fromdodge'),
                misc    : el.get('frommisc')
            }
        }

        armor.toString = function () {
            let text = `AC ${armor.total}, touch ${armor.touch}, flat-footed ${armor.flat}`;
            let misc = [];

            for (let key in armor.from) {
                if (armor.from.hasOwnProperty(key) && armor.from[key]) {
                    misc.push(`${key} ${armor.from[key]}`);
                }
            }
            if (misc.length > 0) {
                let temp = misc.join(', ');
                text = `${text} (${temp})`;
            }

            return text;
        }

        this.armorClass = armor;
    }


    private parseHitPoints() {
        let health = this.xml.find('health');

        let hp: hl.BaseHitPointsType = {
            total     : parseInt(health.get('hitpoints') || '0'),
            hitDice   : health.get('hitdice'),
            currentHp : parseInt(health.get('currenthp') || '0')
        };

        health.iter('special', special => {
            hp.specials = hp.specials || [];
            hp.specials.push({
                name: special.get('name'),
                description: special.find('description').text
            })
        })

        hp.toString = function () {
            let text = `hp ${hp.total} (${hp.hitDice})`;
            if (hp.specials) {
                let spec = hp.specials.map(item => item.name).join(', ');
                text = `${text}; ${spec}`;
            }

            return text;
        }

        this.hitPoints = hp;
    }


    private parseMovement() {
        // TODO: Herolab XML export does not include special movement modes (Fly, Swim, Dig, etc). 
        // TODO: I will have to "parse" the .txt export in "statblocks_text" folder
        let list = [];
        let base: hl.BaseMovementType = {
            value: parseInt(this.xml.find('movement').find('speed').get('value') || '0')
        }

        list.push(base);
        if (base.value === 0) { 
            console.warn(`** ${this.character.name} ** You have to manualy enter movement speed.`)
        }

        this.movement = list;
        list.toString = function () {
            return list.map(el => `${el.name || ''} ${el.value} ft.`).join(', ').trim();
        }
    }


    private parseAttacks() {
        var atk = this.xml.find('attack');
        var man = this.xml.find('maneuvers');

        let item: hl.BaseAttackType = {
            base    : atk.get('baseattack'),
            bonuses : atk.get('attackbonus'),
            melee   : atk.get('meleeattack'),
            ranged  : atk.get('rangedattack'),
            cmb     : man.get('cmb'),
            cmd     : man.get('cmd'),
            cmdFlat : man.get('cmdflatfooted'),
        }

        item.toString = function() {
            //e.g.: Base Atk +18; CMB +25; CMD 44; CMD Flat: 39
            let text = `Base Atk: ${item.base}; CMD ${item.cmb}; CMD ${item.cmd}; CMD Flat ${item.cmdFlat}`;
            return text;
        }
        
        this.attacks = item; 
    }


    public parseMoney() {
        let el = this.xml.find('money');
        let item: hl.BaseMoneyType = {
            pp    : parseInt(el.get('pp')        || '0'),
            gp    : parseInt(el.get('gp')        || '0'),
            sp    : parseInt(el.get('sp')        || '0'),
            cp    : parseInt(el.get('cp')        || '0'),
            other : parseInt(el.get('valuables') || '0') 
        }

        this.money = item;

        item.toString = function() {
            let text = '';
            let misc = [];

            for (let key in item) {
                if (item.hasOwnProperty(key) && item[key] > 0) {
                    misc.push(`${item[key]} ${key}`);
                }
            }
            if (misc.length > 0) {
                text = misc.join(', ');
            }

            return text;
        }
    }
}