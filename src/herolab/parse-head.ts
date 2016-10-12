import * as xmldoc from 'xmldoc';

export class ParseHead {
    public name: string;
    public cr: string;
    public xp: string;
    public gender: string;
    public race: string;
    public class: string;
    public align: string;
    public size: { name: string, space: string, reach: string };
    public types: string[] = [];
    public subTypes: string[] = [];
    public init: string;
    public senses: { name: string, description: string }[] = [];
    public perception: string;

    constructor(private doc: xmldoc.XmlDocument) {
        this.parse();
    }

    private parse() {
        let nameNode = this.doc.descendantWithPath('public.character')
        this.name = nameNode.attr['name'];


        let crNode = this.doc.descendantWithPath('public.character.challengerating')
        this.cr = crNode.attr['text'];


        let xpNode = this.doc.descendantWithPath('public.character.xpaward');
        this.xp = xpNode.attr['text'];


        let genderNode = this.doc.descendantWithPath('public.character.personal');
        this.gender = genderNode.attr['gender'];


        let raceNode = this.doc.descendantWithPath('public.character.race')
        this.name = raceNode.attr['racetext'];


        let classesNode = this.doc.descendantWithPath('public.character.classes')
        this.class = classesNode.attr['summary'];


        let alignNode = this.doc.descendantWithPath('public.character.alignment')
        this.align = alignNode.attr['name'];


        let sizeNode = this.doc.descendantWithPath('public.character.size');
        this.size = {
            name: sizeNode.attr['name'],
            space: sizeNode.descendantWithPath('space').attr['text'],
            reach: sizeNode.descendantWithPath('reach').attr['text']
        }


        let typesNode = this.doc.descendantWithPath('public.character.types')
        typesNode.eachChild((el) => this.types.push(el.attr['name']));


        let subTypesNode = this.doc.descendantWithPath('public.character.subtypes')
        subTypesNode.eachChild((el) => this.subTypes.push(el.attr['name']));


        let initNode = this.doc.descendantWithPath('public.character.initiative')
        this.init = initNode.attr['total'];


        let sensesNode = this.doc.descendantWithPath('public.character.senses')
        sensesNode.eachChild((el) => {
            let item = { name: el.attr['shortname'], description: el.childNamed('description').val }
            this.senses.push(item)
        });


        let skillsNode = this.doc.descendantWithPath('public.character.skills');
        for (let i = 0; i < skillsNode.children.length; i++) {
            let item = skillsNode.children[i];
            if (item.attr['name'].toLowerCase() === 'perception') {
                let value = parseInt(item.attr['value']);
                this.perception = value >= 0 ? `+${item.attr['value']}` : item.attr['value'];
                break;
            }
        }

        delete this.doc;
    }
}