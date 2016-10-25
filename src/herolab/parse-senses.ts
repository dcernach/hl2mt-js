import { Element } from 'elementtree';
import * as hl from './types';


export class ParseSenses {
    public senses: hl.SenseType[] = [];
    public vision: string;
    
    public constructor(protected xml: Element) {
    }

    public parse() {
        this.xml.find('senses').iter('special', sense => {
            let item: hl.SenseType = {
                name        : sense.get('name'),
                shortName   : sense.get('shortname'),
                description : sense.find('description').text,
                source      : sense.get('sourcetext')
            }
            this.senses.push(item);
        })
        this.parseVision();
    }

    private parseVision() {
        let senses = this.senses;
        let lowLightVision : string;
        let darkVision     : string; 
        this.vision = 'Normal';

        for (let i = 0; i < this.senses.length; i++) {
            if(/Low.?Light.?Vision/i.test(senses[i].shortName)) {
                lowLightVision = 'LowLightVision';
            }
            if (/Dark.?vision \(?\d+/i.test(senses[i].shortName)) {
                let re = /Dark.?vision \(?(\d+)/i.exec(senses[i].shortName);
                darkVision = `DarkVision${re[1]}`;
            }
            else if (/Dark.?vision/i.test(senses[i].shortName)) {
                darkVision = `DarkVision60`;
            }
        }

        if(lowLightVision && darkVision) {
            this.vision = `${lowLightVision} and ${darkVision}`;
        } 
        else if(lowLightVision) {
            this.vision = `${lowLightVision}`;
        } 
        else if(darkVision) {
            this.vision = `${darkVision}`;
        }
    }
}
