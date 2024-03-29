export const state = () => ({
  token: '',
  isRunning: false,
  filename: '',
  filelist: [],
  requireInstall: false
})

export const actions = {
  // nuxtServerInit({ commit }, { req, app, setInterval }) {
  //   setInterval(async () => {
  //     try {
  //       const response = await app.$axios.post('/api/check')
  //       if (response.status === 405) {
  //         commit('setInstallStatus', true)
  //         return
  //       }
  //       commit('setStatus', response.body)
  //     } catch (error) {}
  //   }, 5000)
  // }
}

export const mutations = {
  setToken(state, token) {
    state.token = token
  },

  setStatus(state, status) {
    state.isRunning = status.isRunning
    state.filename = status.filename
    state.filelist = status.list
  },

  setInstallStatus(state, status) {
    state.requireInstall = status
  }
}
