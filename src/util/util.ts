export function formateNumber(num:number) {
  return num > 9999 ? `${(num/10000).toFixed(0)}万` : `${num}`
}
