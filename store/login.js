import api from '~/api'
import {removeCookie} from 'util'

export const state = () => ({
    counter: ''
  })
  
  export const mutations = {
    SetContent (state, data) {
      state.counter = data
    }
  }

  export const actions = {
      async logOut () {
          await api.login.userLogout().then(res => {
              console.log(res, '登出成功')
              removeCookie('token')
              
          }).catch(err=> {
              console.log(err, '登出失败')
          })
      },
      clearToken () {
          console.log('在这边清除token')
        removeCookie('token')
        window.location.reload()
    },
  }


