import { Element } from 'elementtree';
import * as hl from './types';


export class ParseManeuvers {
    public base: hl.ManeuverType;
    public maneuvers: hl.ManeuverType[] = [];

    public constructor(protected xml: Element) {
    }

    public parse() {
        let tree = this.xml.find('maneuvers');
        this.base = {
            name        : 'Base',
            cmb         :  parseInt(tree.get('cmb') || '0'),
            cmd         :  parseInt(tree.get('cmd') || '0'),
            cmdFlat     :  parseInt(tree.get('cmdflatfooted') || '0'),
            situational :  tree.find('situationalmodifiers').get('text')
        }

        tree.iter('maneuvertype', maneuver => {
            let item: hl.ManeuverType = {
                name        : maneuver.get('name'),
                cmb         : parseInt(tree.get('cmb') || '0'),
                cmd         : parseInt(tree.get('cmd') || '0'),
                bonus       : parseInt(maneuver.get('bonus') || '0'),
                situational : maneuver.find('situationalmodifiers').text
            }

            this.maneuvers.push(item);
        });
    }
}