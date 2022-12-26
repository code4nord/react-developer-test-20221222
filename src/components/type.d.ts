interface User {
  id: number,
  timestamp: number,
  diff: Array<diff>
}

interface diff {
  name: string,
  oldValue: string,
  newValue: string
}

type UserState = {
  users: User[]
}

type UserAction = {
  type: string,
  user: User
}

type DispatchType = (args: UserAction) => UserAction