export type Package = {
    name: string
    img: string,
    cost: number,
    type: string,
    _id: string
}

export type Order = {
    breakfastDelivery: string,
    lunchDelivery: string,
    dinnerDelivery: string,
    payMethod: string,
    alleryNote : string,
    addressNote: string,
    package?: string,
    timeStart?: Date,
    userId : string
}