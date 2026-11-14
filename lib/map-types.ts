export type MapLayerId = 'no-go' | 'terrain' | 'parking'

export type MapAction = {
  type: 'zoom-in' | 'zoom-out' | 'locate'
  id: number
}
