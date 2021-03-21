<template lang="pug">
  .article-show(v-if="!isLoading")
    uni-title(type='h1' :title="data.title")
    .menu-btn(@click="switchMenu")
      span.iconfont.fi-menu
    .author
      cmd-avatar.avatar(
        :size='36' 
        src="/static/avatar.jpg"
      )
      .info
        .author-name {{data.author.username}}
        .meta-info
          span 
            span.iconfont.fi-info
            | {{data.createdAt}}
          span
            span.iconfont.fi-view 
            | {{data.meta.view}}
          
    .markdown-body
      rich-text(
        :nodes="content"
      )
      //- MDParserHighlight(resource="### hello world")

    .meta
      .meta-data
        span
          span.iconfont.fi-like 
          | {{data.meta.like}}

    uni-drawer(
      :visible="menuVisible"
    )
      .test
        b test

</template>

<script>
import { mapState, mapActions } from 'vuex';
// import MDParserHighlight from '../../components/cmder-MDParserHighlight/index.vue';

export default {
  // components: {
  //   MDParserHighlight
  // },

  data() {
    return {
      isLoading: false,
      menuVisible: false
    }
  },

  computed: {
    ...mapState('article', ['data']),

    content(){
      if(this.data.contentHtml){
        return this.data.contentHtml
          .replace(/<([a-z0-9]+\b)>/g, "<$1 class='m_$1'>")
          .replace(/<(h[1-6])\b/g, "<$1 class='m_$1' ")
      }
    }
  },

  methods: {
    ...mapActions('article', ['fetchData']),

    switchMenu(){
      this.menuVisible = true;
    }
  },

  async onLoad(options) {
    this.isLoading = true;
    uni.showLoading({
      title: '加载中'
    });
    const res = await this.fetchData(options.id)
    uni.setNavigationBarTitle({
  　　title: res.data.title
    })
    this.isLoading = false;
    uni.hideLoading();
  },

}
</script>

<style lang="scss">

.article-show{
  padding: 15px;

  .menu-btn{
    position: fixed;
    z-index: 2;
    top: 65px;
    right: 0px;
    width: 40px;
    height: 30px;
    background: #eee;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    .fi-menu{
      font-size: 18px;
    }
  }

  .author{
    display: flex;
    align-items: center;
    margin: 20px 0 0;
    .info{
      margin-left: 10px;
      .author-name{
        font-size: 16px;
        font-weight: 400;
        color: #000;
        padding-bottom: 3px;
      }
      .meta-info{
        margin-left: 4px;
        color: #8A8F9B;
        & > span{
          margin-right: 10px;
        }
        span.iconfont{
          margin-right: 5px;
        }
      }
      
    }
  }

  .meta{
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #8A8F9B;

    span.iconfont{
      margin-right: 5px;
    }
  }

  .content{
    font-size: 18px;
    white-space: break-spaces;
  }
}
</style>