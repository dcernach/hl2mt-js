declare module "elementtree" {
    export interface ElementTree {
        //constructor(xml: Element);

        /**
         * Gets the root element for this tree.
         * @returns An element instance.
         */
        getroot(): Element

        /**
         * Loads an external XML document into this element tree.
         * @param source A proper XML string.
         * @returns The document root Element. @see Element
         */
        parse(source: string): Element;

        /**
         * Creates a tree iterator for the root element. The iterator loops over all elements in this tree, in
         * document order.
         * @param tag What tags (element) to look for (default is to return all elements)
         * @param cb Called for each tag matched.
         */
        iter(tag: string, cb: (elm: Element) => void);


        /**
         * Finds the first toplevel element with given tag. Same as getroot().find(path).
         * @param path What element to look for.
         * @returns The first matching element, or None if no element was found.
         * @example et.find('./entry/contact-info')
         */
        find(path: string): Element;

        /**
         * Finds all toplevel elements with the given tag. Same as getroot().findall(path).
         * @param path What element to look for.
         * @returns An array containing all matching elements, in document order.
         * @example ET.findall('./entry/details')
         */
        findall(path: string): Element[];

        /**
         * Finds the element text for the first toplevel element with given tag. Same as getroot().findtext(path).
         * @param path What toplevel element to look for.
         * @param defvalue What to return if the element was not found.
         * @returns The text content of the first matching element, or the default value no element was found. Note that if the element has is found, but has no text content, this method returns an empty string.
         */
        findtext(path: string, defvalue?: string): string;

        /**
         * Generates a string representation of an XML element, including all subelements. element 
         * is an Element instance.
         */
        tostring(el: Element, options?: any)
    }

    export interface Element {
        _id: number;
        _children: Element[];
        /**
         * A XML tag. This is a string identifying what kind of data this element represents (the element type,
         * in other words).
         */
        tag: string;
        /**
         * (Attribute) Element attribute dictionary. Where possible, use get(), set(), keys(), and items() to access
         * element attributes.
         */
        attrib: { [key: string]: string };
        /**
         * (Attribute) Text before first subelement. This is either a string or the value None, if there was no text.
         */
        text: string;
        /**
         * (Attribute) Text after this element’s end tag, but before the next sibling element’s start tag. This is
         * either a string or the value None, if there was no text.
         */
        tail: string;

        //constructor(tag: string, attrs: {[key: string]: any});

        /**
         * Generates a string representation of an XML element, including all subelements.
         * @returns An string representation of the current Element.
         */
        tostring(): string;

        /**
         * Returns all subelements. The elements are returned in document order.
         * @returns A list of subelements.
         */
        getchildren(): Element[];

        /**
         * Finds the first toplevel element with given tag. Same as getroot().find(path).
         * @param path What element to look for.
         * @returns The first matching element, or None if no element was found.
         * @example et.find('./entry/contact-info')
         */
        find(path: string): Element;

        /**
         * Finds all toplevel elements with the given tag. Same as getroot().findall(path).
         * @param path What element to look for.
         * @returns An array containing all matching elements, in document order.
         * @example ET.findall('./entry/details')
         */
        findall(path: string, defvalue?: any): Element[];

        /**
         * Finds the element text for the first toplevel element with given tag. Same as getroot().findtext(path).
         * @param path What toplevel element to look for.
         * @param defvalue What to return if the element was not found.
         * @returns The text content of the first matching element, or the default value no element was found. Note that if the element has is found, but has no text content, this method returns an empty string.
         */
        findtext(path: string, defvalue?: string): string;

        /**
         * Resets an element. This function removes all subelements, clears all attributes, and sets the text and
         * tail attributes to None.
         */
        clear(): void;

        /**
         * Gets an element attribute.
         * @param attr What attribute to look for.
         * @param defvalue What to return if the attribute was not found.
         * @returns The attribute value, or the default value, if the attribute was not found.
         */
        get(attr: string, defvalue?: string): string;

        /**
         * Sets an element attribute.
         * @param attr What attribute to set.
         * @param value The attribute value.
         */
        set(attr: string, value: string);

        /**
         * Gets a dictionary of attribute names and values. The names are returned in an arbitrary order
         * (just like for an ordinary Object.keys JS dictionary).
         */
        keys(): { [key: string]: any };

        /**
         * Executes an iterator like function. The iterator loops over this element and all subelements,
         * in document order, and executes the callback function for each elements with a matching tag.
         * @param tag What tags to look for (default is to return all elements).
         * @param cb An itertor like callback containing all the matching elements.
         */
        iter(tag: string, cb: (elm: Element) => void);

        itertext(cb: (text: string) => void);

        remove(el: Element): boolean;
    }

    /**
     * Generates a string representation of an XML element, including all subelements. element 
     * is an Element instance.
     */
    export function tostring(el: Element, options?: any);

    export function XML(data: string): Element;

    export function parse(xml: string): ElementTree;
}