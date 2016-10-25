export interface ItemType {
    name        : string;
    quantity    : number;
    weight      : string;
    cost        : string;
    description : string;
}

export interface ItemMagicType extends ItemType {
    slot?   : string;
    powers?  : { name: string, bonus: number, description: string }[];
}

export type ItemTrackedType = {
    name : string,
    used : number,
    left : number
}