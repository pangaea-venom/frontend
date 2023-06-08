import BigNumber from 'bignumber.js'

export function numberWithCommas(x: number) {
    return x.toLocaleString()
}

export const toNano = (x: number) => {
    return new BigNumber(x).shiftedBy(9).toString()
}

export const fromNano = (x: string) => {
    return new BigNumber(x).shiftedBy(-9).toNumber()
}

export const toDate = (timestamp: string) => {
    return new Date(Number(timestamp) * 1000)
}

export const toDateString = (timestamp: string) => {
    return toDate(timestamp).toLocaleDateString()
}
