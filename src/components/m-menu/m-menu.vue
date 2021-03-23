<template lang="pug">
  .m-menu
    .ul
      .li(v-for="item in menu" :key="item.data.id")
        .span(
          @click="getSelect(item.data.id)"
          :class="{active: active === item.data.id}"
        ) {{item.value}}
        m-menu(
          v-if="item.children && item.children.length > 0" 
          :menu="item.children"
          @scrollTo="getSelect"
          :active="active"
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
    },
    active: String
  },

  methods: {
    getSelect(selector){
      this.$emit('scrollTo', selector)
    }
  },


}
</script>

<style lang="scss">
.m-menu{
  font-size: 14px;
  .span{
    padding: 6px 0;
    padding-right: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
    // color: #808080;
  }
  .span.active{
    // color: red;
    font-weight: bolder;
  }
  .ul{
    padding-left: 1em;
    box-sizing: border-box;
  }
}
</style>