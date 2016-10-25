export type WeaponType = {
    name        : string,
    attack      : string,
    critical    : string,
    damage      : string,
    type        : string,
    range?      : number,
    ammo?       : number,
    cost        : string,
    weight      : string,
    situational?: string,
    description?: string 
}