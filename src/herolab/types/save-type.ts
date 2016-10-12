export type savingsType = {
    fort: saveType;
    ref: saveType;
    will: saveType;
    all: saveType;
}

export type saveType = {
    name: string,
    abbr: string,
    save: number,
    base: number,
    from: {
        attr: number,
        resist?: number,
        misc?: number
    }
    situational?: {
        text: string,
        modifiers: {
            text: string,
            source: string
        }[]
    }
}