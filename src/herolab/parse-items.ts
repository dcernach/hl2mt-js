import { Element } from 'elementtree';
import * as hl from './types';

export class ParseItems {
    public all: hl.ItemType[];
    public gearItems: hl.ItemType[];
    public magicItems: hl.ItemMagicType[];
    public trackedItems: hl.ItemTrackedType[];


    public constructor(protected xml: Element) {
        // TODO: Should I add <trackedresources> parser?
    }


    public parse() {
        this.parseGear();
        this.parseMagicItems();
        this.parseTrackedItems();

        this.all = [].concat(this.gearItems, this.magicItems)
            .filter(n => n !== undefined);
    }


    private parseGear() {
        this.xml.find('gear').iter('item', gear => {
            this.gearItems = this.gearItems || [];

            let item = this.createItemType(gear);
            this.gearItems.push(item);
        })
    }


    private parseMagicItems() {
        this.xml.find('magicitems').iter('item', magic => {
            this.magicItems = this.magicItems || [];

            let item  = <hl.ItemMagicType>this.createItemType(magic);
            item.slot = magic.find('itemslot') ? magic.find('itemslot').text : 'None';

            // Item powers
            magic.iter('itempower', power => {
                item.powers = item.powers || [];
                item.powers.push({
                    name        : power.get('name'),
                    bonus       : parseInt(power.get('pricebonusvalue') || '0'),
                    description : power.find('description').text
                });
            })

            this.magicItems.push(item);
        })
    }


    private parseTrackedItems() {
        this.xml.find('trackedresources').iter('trackedresource', tracked => {
            this.trackedItems = this.trackedItems || [];

            let item = {
                name: tracked.get('name'),
                used: parseInt(tracked.get('used') || '0'),
                left: parseInt(tracked.get('left') || '0')
            }

            this.trackedItems.push(item);
        })
    }


    private createItemType(node: Element): hl.ItemType {
        let item = {
            name        :  node.get('name'),
            quantity    :  parseInt(node.get('quantity') || '0'),
            weight      : (node.find('weight').get('text') || '-'),
            cost        :  node.find('cost').get('text').replace(/,/, '.'),
            description :  node.find('description').text
        }
        return item;
    }
}