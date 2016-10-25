import { Element } from 'elementtree';
import * as hl from './types';


export class ParseTraits {
    public traits: hl.TraitType[] = [];

    public constructor(protected xml: Element) {
    }

    public parse() {
        this.xml.find('traits').iter('trait', trait => {
            let item: hl.TraitType = {
                name: trait.get('name'),
                category: trait.get('categorytext'),
                description: trait.find('description').text
            }

            this.traits.push(item);
        });
    }
}