import dayjs from 'dayjs';

export function hasEncode(str: string) {
  return str.length !== safeDecode(str).length
}

export function strIsLink(str: string) {
  return typeof str === 'string'
  // return str.includes('://')
}

export function safeDecode(str: string) {
  try {
    return decodeURIComponent(str)
  } catch {
    return str
  }
}

export function randomInRange(range: number, fixed = 0) {
  return +(Math.random() * range).toFixed(fixed)
}

export const date = {
  nearlySomeDay(days: number = 30) {
    const today = dayjs()
    return Array.from({length: 30}, (v, index) => {
      return today.subtract(index, 'day').format('YYYY-MM-DD')
    })
  }
}