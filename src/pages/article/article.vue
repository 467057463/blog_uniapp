<template lang="pug">
  .article-show(v-if="!isLoading")
    uni-title(type='h1' :title="data.title")
    .menu-btn(@click="showDrawer")
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

    .meta
      .meta-data
        span
          span.iconfont.fi-like 
          | {{data.meta.like}}

    uni-drawer(
      ref="showRight"
      mode="right"
      :width="280"
    )
      .title 文章标题
      scroll-view.scroll-view-box(scroll-y="true")        
        m-menu(
          :menu="data.menu"
          @scrollTo="goTo"
        )
        //- view(v-for="item in data.menu" :key="item.data.id")
        //-   | {{ item.value }}

</template>

<script>
import { mapState, mapActions } from 'vuex';


export default {

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
          .replace(/id/g, 'class')
          .replace(/<(h[1-6])\b/g, "<$1 class='m_$1' ")
      }
    }
  },

  methods: {
    ...mapActions('article', ['fetchData']),

    showDrawer() {
      this.$refs.showRight.open();
    },
    closeDrawer() {
      this.$refs.showRight.close();
    },

    goTo(selector){
      uni.createSelectorQuery().in(this).select(`.map-构造函数`).boundingClientRect().exec((res) => {
        console.log(res, this.pageTop)
        uni.pageScrollTo({
          scrollTop: res[0].top,
          duration: 300
        });
      })
    }, 
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
    // setTimeout(() =>{
    //   this.goTo()
    // }, 300)
  },

}
</script>

<style lang="scss">

.article-show{
  padding: 15px;

  .menu-btn{
    position: fixed;
    z-index: 2;
    top: 60px;
    right: 0px;
    width: 40px;
    height: 40px;
    background: #eee;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    .fi-menu{
      font-size: 20px;
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

  .title{
    position: relative;
    padding: 16px 15px;
    border-bottom: 1px solid #f0f0f0;
    border-radius: 2px 2px 0 0;
  }
  .scroll-view-box{
    height: 100vh;
    padding: 15px;
  }
}
</style>