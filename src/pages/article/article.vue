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
      mp-html(
        ref="article"
        :content="content"
        use-anchor
      )

    .meta
      .meta-data
        span
          span.iconfont.fi-like 
          | {{data.meta.like}}

    uni-drawer(
      ref="showRight"
      mode="right"
      :width="260"
    ).drawer-box
      scroll-view.scroll-view-box(scroll-y="true")        
        .title 文章标题
        m-menu.menu(
          :menu="data.menu"
          @scrollTo="goTo"
          :active="active"
        )


</template>

<script>
import mpHtml from 'mp-html/dist/uni-app/components/mp-html/mp-html'
import { mapState, mapActions } from 'vuex';

let observer = null;
export default {
  components: {
    mpHtml
  },
  data() {
    return {
      isLoading: false,
      menuVisible: false,
      active: '',
      observer: null
    }
  },

  computed: {
    ...mapState('article', ['data']),

    content(){
      if(this.data.contentHtml){
        return this.data.contentHtml
          .replace(/<([a-z0-9]+\b)>/g, "<$1 class='m_$1'>")
          .replace(/<(h[1-6])\b/g, "<$1 class='m_$1 header'")
      }
    },

    headers(){
      if(this.data.menu){
        const res = [];
        (function walk(menu){
          menu.forEach(item => {
            res.push(item.data.id)
            if(item.children && item.children.length){
              walk(item.children)
            }
          });
        })(this.data.menu)
        return res;
      }
      return []
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
      var ctx = this.$refs.article;  
      ctx.navigateTo(selector).then(() => {
        console.log('跳转成功')
      }).catch(err => {
        console.log('跳转失败：', err)
      })
    },

    observerHeader(){
      this.observer = uni.createIntersectionObserver(this);
      this.headers.forEach(item => {
        this.observer
        .relativeToViewport({
          bottom: -480
        })
        .observe(`#${item}`, (res) => {
          console.log(res)
          if(res.intersectionRatio > 0){
            this.active = res.id
          }
        })
      })      
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
    setTimeout(() => {
      this.observerHeader()
    }, 300)
  },

  onUnload(){
    this.observer.disconnect()
  }
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

  .drawer-box{
    display: flex;
    flex-direction: column;
  }
  .title{
    position: relative;
    padding: 16px 0;
    border-radius: 2px 2px 0 0;
    font-weight: bolder;
    margin-bottom: 10px;
    border-bottom: 1px solid #f0f0f0;
  }
  .scroll-view-box{
    height: 100vh;
    padding: 0 15px 10px;
  }
}
</style>