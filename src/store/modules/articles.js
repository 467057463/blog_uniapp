import { getArticleList } from '@/common/request/articles';

export default {
  namespaced: true,
  state: {
    data: [],
    count: 0,
    page: 0,
    quantity: 10
  },

  mutations: {
    setData(state, data){
      state.data = state.data.concat(data.list);
      state.count = Number(data.count);
      state.page = Number(data.page);
      state.quantity = Number(data.quantity);
    },
  },

  getters: {
    hasMore(state){
      return state.count > state.page * state.quantity;
    }
  },

  actions: {
    async fetchData({commit, state}, page){
      const res = await getArticleList(state.page + 1);
      commit('setData', res.data)
      return res;
    }    
  }
}