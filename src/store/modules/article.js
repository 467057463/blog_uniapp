import { getArticle } from '@/common/request/articles';

export default{
  namespaced: true,
  state: {
    data: {}
  },

  mutations: {
    setData(state, data){
      state.data = data;
    },
  },

  actions: {
    async fetchData({commit}, id){
      const res = await getArticle(id);
      commit('setData', res.data)
      return res;
    }    
  }
}
