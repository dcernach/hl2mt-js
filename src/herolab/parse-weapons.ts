import { Element } from 'elementtree';
import * as hl from './types';


export class ParseWeapons {
    public all: hl.WeaponType[];
    public meleeWeapons: hl.WeaponType[];
    public rangedWeapons: hl.WeaponType[];

    public constructor(protected xml: Element) {

    }


    public parse() {
        this.parseMelee()
        this.parseRanged();

        this.all = [].concat(this.meleeWeapons, this.rangedWeapons)
            .filter(n => n !== undefined);
    }


    private parseMelee() {
        this.xml.find('melee').iter('weapon', weapon => {
            this.meleeWeapons = this.meleeWeapons || [];
            let melee = this.createWeaponType(weapon);
            this.meleeWeapons.push(melee);

            let isThrown = /Thrown/i.test(weapon.get('categorytext'));
            if (isThrown) {
                let ranged = weapon.find('rangedattack');
                let thrown = this.createWeaponType(weapon);

                thrown.name   = `Thrown ${thrown.name}`;
                thrown.attack = ranged.get('attack');
                thrown.range  = parseInt(ranged.get('rangeincvalue') || '0');
                thrown.ammo   = parseInt(weapon.get('quantity') || '0');

                this.meleeWeapons.push(thrown);
            }
        })
    }


    private parseRanged() {
        this.xml.find('ranged').iter('weapon', weapon => {
            this.rangedWeapons = this.rangedWeapons || [];
            let ranged = this.createWeaponType(weapon)
            this.rangedWeapons.push(ranged);
        })
    }


    private createWeaponType(weapon: Element): hl.WeaponType {
        let item = {
            name        : weapon.get('name'),
            attack      : weapon.get('attack'),
            critical    : weapon.get('critical'),
            damage      : weapon.get('damage'),
            type        : weapon.get('type'),
            cost        : weapon.find('cost').get('text'),
            weight      : weapon.find('weight').get('text'),
            situational : weapon.find('situationalmodifiers').get('text'),
            description : weapon.find('description').text
        }
        return item;
    }
}