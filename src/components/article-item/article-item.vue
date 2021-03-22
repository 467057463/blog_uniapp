<template lang="pug">
  .article-item
    .article-header
      cmd-avatar.avatar(:size='20' src="/static/avatar.jpg")
      span.user-name {{article.author.username}}
    
    .article-body
      image.artilce-image(:src="imgUrl" v-if="imgUrl")
      .article-title {{article.title}}
      .content {{article.describe}}
    
    .meta-info
      span 
        span.iconfont.fi-info
        | {{article.comments.length}}
      span
        span.iconfont.fi-view 
        | {{article.meta.view}}
      span
        span.iconfont.fi-like 
        | {{article.meta.like}}

</template>

<script>
import exart01 from '@/images/exart_01.jpg';
import exart02 from '@/images/exart_02.jpg';
import exart03 from '@/images/exart_03.jpg';
import exart04 from '@/images/exart_04.jpg';
import exart05 from '@/images/exart_05.jpg';
const images = [exart01, exart02, exart03, exart04, exart05]

export default {
  name: 'article-item',
  
  props: {
    article: {
      type: Object
    },
    index: Number
  },

  computed: {
    imgUrl(){
      if(this.index < images.length){
        return images[this.index]
      }
    }
  }
}
</script>

<style lang="scss">
.article-item{
  border-bottom: 1px solid #eee;
  .iconfont, .avatar{
    margin-right: 5px;
  }
  .article-header{
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    .ant-avatar{
      margin-right: 5px;
    }
    .user-name{
      color: #808080;
    }
  }
  .article-body{
    padding: 0 20px;
    &::after{
      content: "";
      display: table;
      clear: both;
    }
    .artilce-image{
      float: right;
      width: 70px;
      height: 70px;
      margin-left: 10px;
      border-radius: 3px;
      overflow: hidden;
    }
    .article-title{
      font-size: 16px;
      font-weight: bolder;
      color: #000;
      // line-height: 1;
      // margin-bottom: 8px;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
    }
    .content{
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
      margin-bottom: 0;
      color: #808080;
      margin-top: 5px;
    }  
  }
  .meta-info{
    padding: 0 20px;
    height: 40px;
    display: flex;
    align-items: center;
    color: #808080;
    span + span{
      margin-left: 10px;
    }
    .anticon{
      margin-right: 8px;
    }
  }
}

</style>