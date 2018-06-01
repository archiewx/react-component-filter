declare const enum TriggerEnum {
  hover = 'hover',
  click = 'click'
}
declare const enum popupEnum {
  left = 'left',
  right = 'right',
  top = 'top',
  bottom = 'bottom',
  topLeft = 'topLeft',
  topRight = 'topRight',
  bottomLeft = 'bottomLeft',
  bottomRight = 'bottomRight'
}

declare type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

declare type FilterOptionType = {
  name: string
  value: string
}
declare type FilterType = {
  code: string
  name: string
  options: Array<FilterOptionType>
}
declare type FilterArrayType = Array<FilterType>

declare type ResultOptionType = {
  code: string
  name: string
  values: Array<FilterOptionType>
}
declare module 'rc-trigger'
