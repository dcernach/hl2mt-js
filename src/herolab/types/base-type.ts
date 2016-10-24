export interface BaseHeadType {
    role        : string;
    name        : string;
    align       : string;
    player      : string;
    level       : string;
    deity       : string;
    race        : string;
    type?       : string;
    // -- Size -->
    size        : string;
    space       : string;
    reach       : string;
    // <-- Size --
    cr          : string;
    xp          : string;
    personal?   : BasePersonalType;
    description?: string;
}


export interface BasePersonalType {
    gender      : string;
    age         : string;
    height      : string;
    weight      : string;
    hair        : string;
    eyes        : string;
    skin        : string;
    homeland    : string;
    description?: string;
}


export interface BasePerceptionType {
    value: number; 
    situational: string;
}


export interface BaseArmorClass {
    total : number;
    touch : number;
    flat  : number;
    from  : {
        armor   : string,
        shield  : string,
        dex     : string,
        wis     : string,
        cha     : string,
        size    : string,
        natural : string,
        deflect : string,
        dodge   : string,
        misc    : string
    };
    toString(): string;
}


export interface BaseHitPointsType {
    total     : number;
    hitDice   : string;
    currentHp : number;
    specials? : { name: string, description: string }[]
    toString(): string
}


export interface BaseMovementType {
    value: number;
    name?: string;
    quality?: string;
}


export interface BaseAttackType {
    base        : string;
    bonuses     : string;
    melee       : string;
    ranged      : string;
    cmb         : string;
    cmd         : string,
    cmdFlat     : string;
    toString()  : string; 
}

export interface BaseMoneyType {
    pp?        : number;
    gp?        : number;
    sp?        : number;
    cp?        : number;
    other?     : number;
    toString() : string;
}