import { Element } from 'elementtree';
import * as hl from './types';


export class ParseSpells {
    public spellsWritten   : hl.SpellType[];
    public spellsMemorized : hl.SpellType[];
    public spellsKnown     : hl.SpellType[];


    public constructor(protected xml: Element) {
    }


    public parse() {
        this.parseSpellsWritten();
        this.parseSpellsMemorized();
        this.parseSpellsKnown();
    }


    private parseSpellsWritten() {
        this.xml.find('spellbook').iter('spell', spell => {
            this.spellsWritten = this.spellsWritten || [];
            let item = this.createSpellItem(spell);
            this.spellsWritten.push(item);
        })
    }


    private parseSpellsMemorized() {
        this.xml.find('spellsmemorized').iter('spell', spell => {
            this.spellsMemorized = this.spellsMemorized || [];
            let item = this.createSpellItem(spell);
            item.castsLeft = parseInt(spell.get('castsleft') || '0')
            this.spellsMemorized.push(item);
        });
    }


    private parseSpellsKnown() {
        this.xml.find('spellsknown').iter('spell', spell => {
            this.spellsKnown = this.spellsKnown || [];
            let item = this.createSpellItem(spell);
            this.spellsKnown.push(item);
        });
    }


    private createSpellItem(spell: Element) {
        let item: hl.SpellType = {
            name        : spell.get('name'),
            level       : parseInt(spell.get('level') || '0'),
            class       : spell.get('class'),
            castTime    : spell.get('casttime'),
            range       : spell.get('range'),
            target      : spell.get('target'),
            area        : spell.get('area'),
            effect      : spell.get('effect'),
            duration    : spell.get('duration'),
            save        : (spell.get('save') || 'None'),
            resist      : (spell.get('resist') || 'N/A'),
            dc          : parseInt(spell.get('dc') || '0'),
            casterLevel : parseInt(spell.get('casterlevel') || '0'),
            components  : spell.get('componenttext'),
            school      : spell.get('schooltext'),
            subSchool   : spell.get('subschooltext'),
            descriptor  : spell.get('descriptortext'),
            saveText    : spell.get('savetext'),
            resistText  : spell.get('resisttext'),
            description : spell.find('description').text
        }
        item.name = item.name.replace(/\s?\(x\d+\)/i, '');
        //item.save = item.save.replace(/DC\s*\d+\s*/i, '');
        return item;
    }
}