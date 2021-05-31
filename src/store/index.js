import Vue from 'vue'
import Vuex from 'vuex'


import getters from './getters'
import user from './modules/user.js'
// import permission from './modules/permission.js'
// import fileUpload from './modules/fileUpload.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user
    },
    username:"123",
    getters
})

export default store
