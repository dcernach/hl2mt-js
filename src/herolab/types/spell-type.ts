export type SpellType = {
    name        : string,
    level       : number,
    class       : string,
    castTime    : string,
    range       : string,
    target      : string,
    area        : string,
    effect      : string,
    duration    : string,
    //
    save        : string,
    saveText    : string,
    //
    resist      : string,
    resistText  : string,
    //
    dc          : number,
    casterLevel : number,
    components  : string,
    school      : string,
    subSchool   : string,
    descriptor  : string,
    castsLeft?  : number,
    description : string
}