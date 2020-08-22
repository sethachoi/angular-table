export type SortType = {
  key: string
  direction: 'asc' | 'desc'
}

export type ColType = {
  key: string
  label: string
  flex?: number
  type: 'number' | 'string'
}