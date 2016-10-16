declare module "xmldoc" {
    /**
     * The primary exported class is XmlDocument, which you'll use to consume your 
     * XML text. XmlDocument contains a hierarchy of XmlElement instances 
     * representing the XML structure.
     */
    export class XmlDocument {
        constructor(xml: string);
        /**
         * The node name, like "tat" for <tat>. XML "namespaces" are ignored by the 
         * underlying sax-js parser, so you'll simply get "office:body"
         * for <office:body>.
         */
        name: string;
        /**
         * An object dict containing attribute properties, like bookNode.attr.title 
         * for <book title="...">.
         */
        attr: { [property: string]: string };
        /**
         * The string "value" of the node, if any, like "world" for 
         * <hello>world</hello>.
         */
        val: string;
        /**
         * An array of XmlElement children of the node.
         */
        children: XmlDocument[]
        /**
         * Pretty much what it sounds like; null if no first children
         */
        firstChild: XmlElement;
        /**
         * Ppretty much what it sounds like; null if no last children
         */
        lastChild: any;
        /**
         * information about the element's original line in the XML string.
         */
        line: number;
        /**
         * information about the element's original column in the XML string.
         */
        column: number;
        /**
         * information about the element's original position in the XML string.
         */
        position: number;
        /**
         * information about the element's original startTagPosition in the XML string.
         */
        startTagPosition: number;

        /**
         * Similar to underscore's each method, it will call (child, index, array) for each 
         * child of the given node.
         */
        //eachChild(cb: { child: XmlElement, index?: number | string, array?: XmlElement[] }): XmlElement[]
        //eachChild(cb: { child: XmlElement, index?: number | string, array?: XmlElement[] }): XmlElement[]
        eachChild(cb: (value: XmlElement, index: number, array: XmlElement[]) => void): XmlElement[];
        /**
         * Pass it the name of a child node and it will search for and return the first one found, 
         * or `undefined`.
         */
        childNamed(name: string): XmlElement
        /**
         *Like childNamed but returns all matching children in an `array`, or `[]`. 
         */
        childrenNamed(name: string): XmlElement[]
        /**
         * Searches for the first child with the given attribute value. You can omit value to just 
         * find the first node with the given attribute defined at all.
         */
        childWithAttribute(name: string, value: string): string
        /**
         * Searches for a specific "path" using dot notation.
         * @example
         *`books.xml` 
         * <book>
         *   <author>
         *     <name isProper="true">George R. R. Martin</name>
         *     ...
         *   </author>
         *   ...
         * </book>
         * If you just want the <name> node and you have the XmlElement for the <book> node, you 
         * can say:
         * var nameNode = bookNode.descendantWithPath("author.name"); // return <name> node
         */
        descendantWithPath(path: string): XmlElement
        /**
         * Just like descendantWithPath, but goes deeper and extracts the val of the node.
         * @example
         * var authorName = bookNode.valueWithPath("author.name"); // return "George R. R. Martin"
         * 
         * You can also use the @ character to request the value of a particular attribute instead:
         *   var authorIsProper = bookNode.valueWithPath("author.name@isProper"); // return "true"
         * 
         * @remarks This is not XPath! It's just a thing I made up, OK?
         */
        valueWithPath(path): string
        /**
         * This is just an override of the standard JavaScript method, it will give you a string 
         * representation of your XML document or element. Note that this is for debugging only! 
         * It is not guaranteed to always output valid XML.
         * 
         * The default implementation of `toString()`, that is, the one you get when you just 
         * `console.log("Doc: " + myDoc)` will pretty-print the XML with linebreaks and indents. 
         * You can pass a couple options to control the output.
         */
        toString(options: {
            /** strips indents and linebreaks*/ 
            compressed?: boolean,
            /** trims long strings for easier debugging*/ 
            trimmed?: boolean,
            /** prevents whitespace being removed from around element values */ 
            preserveWhitespace?: boolean
        }): string;
    }

    export class XmlElement extends XmlDocument {
        new(xml: string): XmlElement;
    }
}