export type Food = {
    name: string,
    img : string,
    type: string,
    cost: string,
    id : string,
}

export type Menu = {
    date: string,
    breakfast: Food,
    lunch: Food,
    dinner: Food
}

export type MenuOrder = {
    menu : Menu[],
    userId : string,
    timeStart: string
}