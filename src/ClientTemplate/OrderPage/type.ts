export type Package = {
    name: string
    img: string,
    cost: number,
    type: string,
}

export type Order = {
    timeDelivery: string,
    payMethod: string,
    alleryNote : string,
    addressNote: string,
    package?: Package,
    duration: string
    timeStart?: Date,
}