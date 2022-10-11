import api from '@api';
import { createStore } from 'vuex';

const store = createStore({
    state: {
        token: null,
        userLogin: 'unknown'
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setUserLogin(state, login) {
            state.userLogin = login;
        }
    },
    actions: {
        async getUser({ commit }) {
            try {
                const response = await api.get('/user');
                const { result } = response.data;
                result ? commit('setUserLogin', result.login) :
                    commit('setUserLogin', 'unknown');
                return response.data;
            }
            catch (err) {
                console.log('==> user get fail ' + err);
                return null;
            }
        },
        async login({ commit }, data) {
            try {
                const response = await api.post('/user', data);
                const { token } = response.data;
                if (token) {
                    commit('setToken', token);
                    window.localStorage.setItem('tokenAuth', token);
                }
                return response.data;
            }
            catch (err) {
                console.log('==> user login fail ' + err);
                return null;
            }
        }
    },
    getters: {
        userLogin_getter: state => state.userLogin,
    }
})

export default store;
