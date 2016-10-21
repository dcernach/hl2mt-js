import { Element } from 'elementtree';
import * as hl from './types';


export class ParseSkills {
    public skills: hl.SkillType[] = [];

    public constructor(protected xml: Element) {
    }

    public parse() {
        this.xml.find('skills').iter('skill', skill => {
            let item: hl.SkillType = {
                name        : skill.get('name'),
                value       : parseInt(skill.get('value') || '0'),
                attrName    : skill.get('attrname'),
                attrBonus   : parseInt(skill.get('attrbonus') || '0'),
                ranks       : parseInt(skill.get('ranks') || '0'),
                armorCheck  : skill.get('armorcheck') === 'yes',
                classSkill  : skill.get('classskill') === 'yes',
                description : skill.find('description').text,
                situational : skill.find('situationalmodifiers').get('text')
                //TODO: Should I add miscBonus (calculated)
            }

            this.skills.push(item)
        })
    }
}