import { setStorageInfo, getStorageInfo, removeStorageInfo } from '@/assets/js/common.js'

const user = {
    state: {
        userInfo: "",
    },
    getters: {
        getUserInfo(state) {
            const user = JSON.parse(getStorageInfo("user"));
            state.userInfo = user ? user : "";
            return state.userInfo;
        },
    },
    mutations: {
        SET_USER: (state, user) => {
            state.userInfo = user.username;
            setStorageInfo("user", JSON.stringify(user));
        },
        REMOVE_USER: (state) => {
            state.userInfo = ""
            removeStorageInfo("user");
            console.log(getStorageInfo("user"))
        }
    },
    actions: {
        setUser({ commit, state }, user) {
            // 调用mutaions里面的方法
            commit('SET_USER', user);
        },
        removeUser({ commit, state }) {
            // 调用mutaions里面的方法
            commit('REMOVE_USER');
        }
    }
}
export default user