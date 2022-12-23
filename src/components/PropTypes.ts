export interface User {
  id?: string,
  timestamp?: Date,
  diff: Array<Name>
}

interface Name {
  field?: string,
  oldValue: string,
  newValue: string
}