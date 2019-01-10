import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const module = {
    state: {
        viId: '',
        video_title: ''
    },
    mutations: {
        setViId(state, value) {
            state.viId = value
        }
    },
    actions: {
        setViId(context, value) {
            context.commit('setViId', value)
        }
    },
    getters: {
        getViId: status => {
            return status.viId
        }
    }
}

const store = new Vuex.Store(module)
export default store