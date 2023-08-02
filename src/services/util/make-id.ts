import { getRandomInt } from "./get-random-int"

export const makeId = (length = 10) => {
    const possibleChart = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let id = ''

    for (var i = 0; i < length; i++) {
        id += possibleChart[getRandomInt(0, possibleChart.length)]
    }

    return id
}