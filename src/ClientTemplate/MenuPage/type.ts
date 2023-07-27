export type Food = {
    name: string,
    img : string,
    type: string,
    cost: number,
    _id? : string,
}

export type Menu = {
    date: string,
    breakfast: Food,
    lunch: Food,
    dinner: Food,
}

export type MenuOrder = {
    menu : Menu[],
    userId : any,
    timeStart: string,
    timeOrder: string,
    _id?: string
}