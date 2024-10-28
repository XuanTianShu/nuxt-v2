import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = () => ({
  userInfo: '',
  auth :'',//登录窗口
});

const mutations = {
  init(state, payload) {
    state[payload.key] = payload.data;
  },
};

// 存在异步操作使用action，直接调用mutation中的函数
const actions = {
  init(context,payload) {
    context.commit('init',payload)
  }
}

export default {
  state,
  mutations,
  actions,
};
