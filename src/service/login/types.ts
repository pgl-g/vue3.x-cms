export interface IAccount {
  account: string
  password: number
}

export interface ILoginResult {
  id: number
  token: string
  name: string
}

export interface IUserInfo<T = any> {
  code: number
  data: T
}

export interface IDataType<T = any> {
  code: number
  data: T
}
