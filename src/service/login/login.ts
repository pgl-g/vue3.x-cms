import pglRequest from '../index'
import { IAccount, IDataType, ILoginResult } from './types'

enum LoginApi {
  accountLogin = '/login',
  loginUserInfo = '/users/',
  userMenus = '/role/' // 用法获取 role/1/menu
}

export function accountLoginRequest(account: IAccount) {
  return pglRequest.post<IDataType<ILoginResult>>({
    url: LoginApi.accountLogin,
    data: account
  })
}

export function requestuserInfoRequest(id: number) {
  return pglRequest.get<IDataType>({
    url: LoginApi.loginUserInfo + id
  })
}

export function requestroleMenu(id: number) {
  return pglRequest.get<IDataType>({
    url: LoginApi.userMenus + id + '/menu'
  })
}
