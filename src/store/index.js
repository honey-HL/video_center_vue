import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const module = {
    state: {
        viId: '',
        share: '',
        video_title: ''
    },
    mutations: {
        setShare(state, value) {
            state.share = value
        },
        setViId(state, value) {
            state.viId = value
        }
    },
    actions: {
        setShare(context, value) {
            context.commit('setShare', value)
        },
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