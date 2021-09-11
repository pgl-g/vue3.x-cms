import { Module } from 'vuex'
import { ILoginState } from './types'
import { IRootState } from '../types'
import { IAccount } from '../../service/login/types'
import {
  accountLoginRequest,
  requestuserInfoRequest,
  requestroleMenu
} from '../../service/login/login'
import localCache from '@/unit/cache'
import router from '@/router'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: '',
      userMenus: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeMenusInfo(state, menus: any) {
      state.userMenus = menus
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      // TODO:下面判断逻辑有点问题
      // 1. 实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      localCache.setCache('token', token)
      commit('changeToken', token)
      // 2. 请求用户信息
      const userInfoResult = await requestuserInfoRequest(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 3. 请求用户菜单
      const userMenuResult = await requestroleMenu(userInfo.role.id)
      const userMenus = userMenuResult.data
      commit('changeMenusInfo', userMenus)
      localCache.setCache('userMenus', userMenus)
      // 4. 跳到首页
      router.push('/main')
    }
    // phoneLoginAction({ commit }, payload: any) {
    //   console.log('执行phone', payload)
    // }
  }
}

export default loginModule
