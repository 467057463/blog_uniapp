<template lang="pug">
  .home-page
    article-item(
      v-for="(item, index) in data" 
      :key="item.id" 
      :article="item"
      :index="index"
      @click.native="goTo(item.id)"
    )
    uni-load-more(:status="status" v-if="!isInit")
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  data(){
    return{
      isInit: true,
      isLoading: false,
    }
  },

  computed: {
    ...mapState('articles', ['data']),
    ...mapGetters('articles', ['hasMore']),

    status(){
      if(!this.hasMore){
        return 'nomore'
      }
      return this.isLoading ? 'loading' : 'more';
    }
  },

  methods: {
    ...mapActions('articles', ['fetchData']),

    goTo(id){
      uni.navigateTo({
        url: `/pages/article/article?id=${id}`
      })
    }
  },  

  async onLoad() {
    uni.showLoading({
      title: '加载中'
    });
    this.isInit = true;
    await this.fetchData();
    uni.hideLoading();
    this.isInit = false;
  },

  async onReachBottom(e){
    if(this.hasMore){
      this.isLoading = true;
      await this.fetchData();
      this.isLoading = false;
    }
  }
}
</script>

<style lang="scss">
.home-page {}  
</style>
