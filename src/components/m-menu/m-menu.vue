<template lang="pug">
  .m-menu
    .ul
      .li(v-for="item in menu" :key="item.data.id")
        .span(@click="getSelect(item.data.id)") {{item.value}}
        m-menu(
          v-if="item.children && item.children.length > 0" 
          :menu="item.children"
        )
</template>

<script>
export default {
  name: "m-menu",

  props: {
    menu: {
      type: Array,
      default: function(){
        return []
      }
    }
  },

  methods: {
    goTo(selector){
      console.log(selector)
      const query = uni.createSelectorQuery().in(this);
      query.select('.map-构造函数').boundingClientRect().exec((res) => {
        console.log(res)
        if(res[0]){
          uni.pageScrollTo({
            scrollTop: res[0].top,
            duration: 300
          });
        }else{
          // this.$nextTick(() => {
          //   this.goTo(selector)
          // })
        }
      });
      // console.log(selector)
      // uni.pageScrollTo({
      //   // scrollTop: 0,
      //   selector: `.${selector}`,
      //   duration: 300
      // });
    },

    getSelect(){
      this.$emit('scrollTo')
    }
  },

  // onReady(){
  //   this.goTo()
  // },
}
</script>

<style lang="scss">
.m-menu{
  font-size: 14px;
  .span{
    // height: 35px;
    padding: 8px 0;
    padding-right: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
  }
  .ul{
    padding-left: 1em;
    box-sizing: border-box;
  }
}
</style>